import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',').map(value => value.trim()).filter(Boolean);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const attempts = new Map();

// Content records include optional optimized previews as data URLs. Keep the
// request ceiling high enough for an admin upload while still avoiding an
// unbounded JSON endpoint.
app.use(express.json({ limit: '8mb' }));
app.set('trust proxy', 1);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin === 'https://raynexis.netlify.app' || /^https?:\/\/localhost(?::\d+)?$/.test(origin) || /^https?:\/\/127\.0\.0\.1(?::\d+)?$/.test(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by CORS.'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

function auth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Sign in required.' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); return next(); }
  catch { return res.status(401).json({ error: 'Your session has expired. Please sign in again.' }); }
}
function cleanState(value) {
  const state = value && typeof value === 'object' ? value : {};
  return {
    settings: state.settings && typeof state.settings === 'object' ? state.settings : {},
    services: Array.isArray(state.services) ? state.services : [],
    projects: Array.isArray(state.projects) ? state.projects : [],
    testimonials: Array.isArray(state.testimonials) ? state.testimonials : [],
    team: Array.isArray(state.team) ? state.team : [],
    pages: Array.isArray(state.pages) ? state.pages : [],
    media: Array.isArray(state.media) ? state.media : [],
    activity: Array.isArray(state.activity) ? state.activity : []
  };
}
function publicState(state) {
  const filtered = cleanState(state);
  ['services', 'projects', 'testimonials', 'team', 'pages'].forEach(key => {
    filtered[key] = filtered[key].filter(item => item.published);
  });
  filtered.media = [];
  filtered.activity = [];
  return filtered;
}
async function getState() {
  const result = await pool.query('select data from app_state where id = 1');
  return cleanState(result.rows[0]?.data);
}
async function saveState(data) {
  await pool.query('insert into app_state (id, data, updated_at) values (1, $1, now()) on conflict (id) do update set data = excluded.data, updated_at = now()', [cleanState(data)]);
}
async function initialise() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be at least 32 characters.');
  await pool.query(`
    create extension if not exists pgcrypto;
    create table if not exists app_state (
      id smallint primary key check (id = 1), data jsonb not null, updated_at timestamptz not null default now()
    );
    create table if not exists admin_users (
      id uuid primary key default gen_random_uuid(), email text unique not null, password_hash text not null,
      full_name text not null default 'Raynexis Admin', created_at timestamptz not null default now()
    );
    create table if not exists inquiries (
      id uuid primary key default gen_random_uuid(), name text not null, company text, phone text not null, email text not null,
      service text, fleet text, budget text, timeline text, message text not null,
      status text not null default 'New' check (status in ('New', 'Contacted', 'Won')),
      created_at timestamptz not null default now()
    );
    create table if not exists media_assets (
      id uuid primary key default gen_random_uuid(),
      filename text not null,
      mime_type text not null,
      data_url text not null,
      alt_text text not null default '',
      caption text not null default '',
      folder text not null default 'Unsorted',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
    create table if not exists page_sections (
      id uuid primary key default gen_random_uuid(),
      page_slug text not null,
      section_type text not null,
      label text not null,
      position integer not null default 0,
      visible boolean not null default true,
      data jsonb not null default '{}'::jsonb,
      updated_at timestamptz not null default now(),
      unique (page_slug, id)
    );
    create table if not exists activity_log (
      id uuid primary key default gen_random_uuid(),
      action text not null,
      detail text not null default '',
      created_at timestamptz not null default now()
    );
  `);
  const stateExists = await pool.query('select 1 from app_state where id = 1');
  if (!stateExists.rowCount) {
    const seed = JSON.parse(await fs.readFile(path.join(currentDir, 'seed-data.json'), 'utf8'));
    await saveState(seed);
  } else {
    // Backfill the richer editor fields for installations created by the
    // earlier localStorage prototype without overwriting custom copy.
    const seed = JSON.parse(await fs.readFile(path.join(currentDir, 'seed-data.json'), 'utf8'));
    const current = await getState();
    const mergeCollection = key => (current[key] || []).map(item => ({ ...(seed[key] || []).find(seedItem => seedItem.id === item.id), ...item }));
    const migrated = {
      ...seed,
      ...current,
      settings: { ...(seed.settings || {}), ...(current.settings || {}) },
      services: mergeCollection('services'),
      projects: mergeCollection('projects'),
      testimonials: mergeCollection('testimonials'),
      team: mergeCollection('team'),
      pages: (current.pages || []).map(item => ({ ...(seed.pages || []).find(seedItem => seedItem.id === item.id), ...item }))
    };
    await saveState(migrated);
  }
  if (process.env.ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD) {
    const email = process.env.ADMIN_EMAIL.toLowerCase();
    const existing = await pool.query('select id from admin_users where email = $1', [email]);
    if (!existing.rowCount) {
      const hash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 12);
      await pool.query('insert into admin_users (email, password_hash) values ($1, $2)', [email, hash]);
      console.log(`Initial administrator created for ${email}`);
    }
  }
}

app.get('/health', async (_req, res) => {
  try { await pool.query('select 1'); res.json({ ok: true }); }
  catch { res.status(503).json({ ok: false }); }
});
app.get('/api/public/bootstrap', async (_req, res, next) => {
  try { res.json(publicState(await getState())); } catch (error) { next(error); }
});
app.post('/api/inquiries', async (req, res, next) => {
  try {
    const ip = req.ip || 'unknown'; const now = Date.now(); const log = attempts.get(ip) || [];
    const recent = log.filter(time => now - time < 15 * 60 * 1000);
    if (recent.length >= 8) return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    attempts.set(ip, [...recent, now]);
    const { name, company, phone, email, service, fleet, budget, timeline, message } = req.body || {};
    if (![name, phone, email, message].every(value => typeof value === 'string' && value.trim())) return res.status(400).json({ error: 'Please complete the required fields.' });
    const result = await pool.query(
      'insert into inquiries (name, company, phone, email, service, fleet, budget, timeline, message) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id, status, created_at',
      [name.trim(), company?.trim() || null, phone.trim(), email.trim().toLowerCase(), service?.trim() || null, fleet?.trim() || null, budget?.trim() || null, timeline?.trim() || null, message.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
});
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase(); const password = String(req.body?.password || '');
    const result = await pool.query('select id, email, password_hash, full_name from admin_users where email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: 'Incorrect email or password.' });
    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, user: { email: user.email, fullName: user.full_name } });
  } catch (error) { next(error); }
});
app.get('/api/auth/me', auth, async (req, res) => res.json({ user: { email: req.user.email } }));
app.get('/api/admin/bootstrap', auth, async (_req, res, next) => {
  try {
    const inquiries = await pool.query('select id, name, company, phone, email, service, fleet, budget, timeline, message, status, created_at as created from inquiries order by created_at desc');
    const media = await pool.query('select id, filename, mime_type as "mimeType", data_url as "dataUrl", alt_text as "altText", caption, folder, created_at as created, updated_at as updated from media_assets order by created_at desc');
    const activity = await pool.query('select id, action, detail, created_at as created from activity_log order by created_at desc limit 20');
    res.json({ ...(await getState()), inquiries: inquiries.rows, media: media.rows, activity: activity.rows });
  } catch (error) { next(error); }
});
app.put('/api/admin/state', auth, async (req, res, next) => {
  try {
    await saveState(req.body);
    const action = String(req.body?.__activity?.action || 'Content updated').slice(0, 120);
    const detail = String(req.body?.__activity?.detail || '').slice(0, 240);
    await pool.query('insert into activity_log (action, detail) values ($1, $2)', [action, detail]);
    res.json({ ok: true });
  } catch (error) { next(error); }
});
app.post('/api/admin/media', auth, async (req, res, next) => {
  try {
    const { filename, mimeType, dataUrl, altText = '', caption = '', folder = 'Unsorted' } = req.body || {};
    if (!filename || !mimeType || !String(dataUrl || '').startsWith('data:image/')) return res.status(400).json({ error: 'Please upload a valid image.' });
    if (String(dataUrl).length > 7_500_000) return res.status(413).json({ error: 'That image is too large. Please use an image under 5 MB.' });
    const result = await pool.query('insert into media_assets (filename, mime_type, data_url, alt_text, caption, folder) values ($1,$2,$3,$4,$5,$6) returning id, filename, mime_type as "mimeType", data_url as "dataUrl", alt_text as "altText", caption, folder, created_at as created, updated_at as updated', [String(filename).slice(0, 180), mimeType, dataUrl, String(altText).slice(0, 125), String(caption).slice(0, 250), String(folder).slice(0, 80)]);
    await pool.query('insert into activity_log (action, detail) values ($1, $2)', ['New media uploaded', result.rows[0].filename]);
    res.status(201).json(result.rows[0]);
  } catch (error) { next(error); }
});
app.patch('/api/admin/media/:id', auth, async (req, res, next) => {
  try {
    const { altText = '', caption = '', folder = 'Unsorted' } = req.body || {};
    const result = await pool.query('update media_assets set alt_text=$1, caption=$2, folder=$3, updated_at=now() where id=$4 returning id, filename, mime_type as "mimeType", data_url as "dataUrl", alt_text as "altText", caption, folder, created_at as created, updated_at as updated', [String(altText).slice(0, 125), String(caption).slice(0, 250), String(folder).slice(0, 80), req.params.id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Media asset not found.' });
    res.json(result.rows[0]);
  } catch (error) { next(error); }
});
app.delete('/api/admin/media/:id', auth, async (req, res, next) => {
  try { const result = await pool.query('delete from media_assets where id=$1 returning id', [req.params.id]); if (!result.rowCount) return res.status(404).json({ error: 'Media asset not found.' }); res.json({ ok: true }); }
  catch (error) { next(error); }
});
app.patch('/api/admin/inquiries/:id', auth, async (req, res, next) => {
  try {
    const status = req.body?.status;
    if (!['New', 'Contacted', 'Won'].includes(status)) return res.status(400).json({ error: 'Invalid inquiry status.' });
    const result = await pool.query('update inquiries set status = $1 where id = $2 returning id, status', [status, req.params.id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json(result.rows[0]);
  } catch (error) { next(error); }
});
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'The server could not complete that request.' });
});

initialise()
  .then(() => app.listen(port, '0.0.0.0', () => {
    console.log(`Raynexis API listening on ${port}`);
    console.log(`PORT environment: ${process.env.PORT}`);
  }))
  .catch(error => {
    console.error('Database initialisation failed', error);
    process.exit(1);
  });
