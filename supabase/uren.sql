-- Database for the "Uren" page. Everyone times their work in their own Toggl Track
-- (project "BAP"). Toggl sends every change to the edge function "toggl"
-- (supabase/functions/toggl/index.ts), which writes it into these tables.
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run. See README.

-- Who is working right now: one row per running Toggl timer.
create table if not exists timers (
  wie text primary key check (wie in ('Ibe', 'Tjorven', 'Senne')),
  sinds timestamptz not null default now(),
  wat text not null default '',
  toggl_id bigint unique
);

-- Every finished stretch of work.
create table if not exists sessies (
  id uuid primary key default gen_random_uuid(),
  wie text not null check (wie in ('Ibe', 'Tjorven', 'Senne')),
  van timestamptz not null,
  tot timestamptz not null check (tot > van),
  wat text not null default '',
  achteraf boolean not null default false,
  toggl_id bigint unique
);

-- Per person: the secret of their Toggl webhook and the id of their Toggl project "BAP".
-- Only the edge function can read this table (it uses the service role).
create table if not exists toggl_bronnen (
  wie text primary key check (wie in ('Ibe', 'Tjorven', 'Senne')),
  geheim text not null,
  project_id bigint
);

-- Everyone may read the hours (the blog is public); nobody may write from the browser.
alter table timers enable row level security;
alter table sessies enable row level security;
alter table toggl_bronnen enable row level security;
drop policy if exists "iedereen leest" on timers;
create policy "iedereen leest" on timers for select using (true);
drop policy if exists "iedereen leest" on sessies;
create policy "iedereen leest" on sessies for select using (true);
revoke all on toggl_bronnen from anon, authenticated;

-- Live updates: the page hears about every change straight away.
do $$
begin
  alter publication supabase_realtime add table timers, sessies;
exception when duplicate_object then null;
end;
$$;

-- Add a person (after creating their webhook in Toggl, see README):
-- insert into toggl_bronnen (wie, geheim, project_id) values ('Ibe', 'WEBHOOK-SECRET', 123456789)
--   on conflict (wie) do update set geheim = excluded.geheim, project_id = excluded.project_id;
