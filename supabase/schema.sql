-- Run this in Supabase: SQL Editor > New query.
-- This is the shared production database for Raynexis content and inquiries.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

create table if not exists public.settings (
  id integer primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  price text not null,
  icon text not null default 'sparkles',
  published boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  collection text not null check (collection in ('projects', 'testimonials', 'team', 'pages')),
  title text not null,
  description text not null,
  published boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text not null,
  email text not null,
  service text,
  fleet text,
  budget text,
  timeline text,
  message text not null,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Won')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.services enable row level security;
alter table public.content_items enable row level security;
alter table public.inquiries enable row level security;

-- Visitors can read published content and send inquiries. Only authenticated admins can manage data.
create policy "published services are public" on public.services for select using (published or public.is_admin());
create policy "admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "published content is public" on public.content_items for select using (published or public.is_admin());
create policy "admins manage content" on public.content_items for all using (public.is_admin()) with check (public.is_admin());
create policy "settings are public" on public.settings for select using (true);
create policy "admins manage settings" on public.settings for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read profiles" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "public can submit inquiries" on public.inquiries for insert with check (true);
create policy "admins manage inquiries" on public.inquiries for all using (public.is_admin()) with check (public.is_admin());

-- After creating the first Auth user in the Supabase dashboard, run this once.
-- Replace the email with your real admin email address.
-- insert into public.profiles (id, full_name, role)
-- select id, 'Raynexis Admin', 'admin' from auth.users where email = 'YOUR-ADMIN-EMAIL@example.com';
