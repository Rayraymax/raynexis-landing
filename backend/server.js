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

app.use(express.json({ limit: '1mb' }));
app.set('trust proxy', 1);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
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
    pages: Array.isArray(state.pages) ? state.pages : []
  };
}
function publicState(state) {
  const filtered = cleanState(state);
  ['services', 'projects', 'testimonials', 'team', 'pages'].forEach(key => {
    filtered[key] = filtered[key].filter(item => item.published);
  });
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
  `);
  const stateExists = await pool.query('select 1 from app_state where id = 1');
  if (!stateExists.rowCount) {
    const seed = JSON.parse(await fs.readFile(path.join(currentDir, 'seed-data.json'), 'utf8'));
    await saveState(seed);
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
    res.json({ ...(await getState()), inquiries: inquiries.rows });
  } catch (error) { next(error); }
});
app.put('/api/admin/state', auth, async (req, res, next) => {
  try { await saveState(req.body); res.json({ ok: true }); } catch (error) { next(error); }
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

initialise().then(() => app.listen(port, '0.0.0.0', () => console.log(`Raynexis API listening on ${port}`)))
  .catch(error => { console.error('Database initialisation failed', error); process.exit(1); });
