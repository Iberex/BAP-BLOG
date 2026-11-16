-- Database for the "Uren" page: live work timers and logged hours.
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Then set the team password with the last line (see README).

create extension if not exists pgcrypto;

-- Who is working right now. One row per person while their timer runs.
create table if not exists timers (
  wie text primary key check (wie in ('Ibe', 'Tjorven', 'Senne')),
  sinds timestamptz not null default now(),
  wat text not null default ''
);

-- Every finished stretch of work, from the timer or added by hand afterwards.
create table if not exists sessies (
  id uuid primary key default gen_random_uuid(),
  wie text not null check (wie in ('Ibe', 'Tjorven', 'Senne')),
  van timestamptz not null,
  tot timestamptz not null check (tot > van),
  wat text not null default '',
  achteraf boolean not null default false
);

-- The team password, stored as a hash. Only the functions below can read it.
create table if not exists geheim (
  id int primary key default 1 check (id = 1),
  hash text not null
);

-- Everyone may read the hours (the blog is public); nobody may write directly.
alter table timers enable row level security;
alter table sessies enable row level security;
alter table geheim enable row level security;
drop policy if exists "iedereen leest" on timers;
create policy "iedereen leest" on timers for select using (true);
drop policy if exists "iedereen leest" on sessies;
create policy "iedereen leest" on sessies for select using (true);

-- Changes go through these functions, which check the team password first.
create or replace function wachtwoord_ok(pw text) returns boolean
language sql security definer set search_path = public, extensions as $$
  select exists (select 1 from geheim where hash = crypt(pw, hash));
$$;

create or replace function controleer(pw text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not wachtwoord_ok(pw) then
    raise exception 'Fout wachtwoord';
  end if;
end;
$$;

create or replace function start_timer(pw text, persoon text, waaraan text)
returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform controleer(pw);
  insert into timers (wie, wat) values (persoon, coalesce(waaraan, ''))
  on conflict (wie) do update set wat = excluded.wat;
end;
$$;

create or replace function stop_timer(pw text, persoon text)
returns void
language plpgsql security definer set search_path = public, extensions as $$
declare
  t timers;
begin
  perform controleer(pw);
  delete from timers where wie = persoon returning * into t;
  -- Stretches shorter than a minute are not worth saving.
  if t.wie is not null and now() - t.sinds >= interval '1 minute' then
    insert into sessies (wie, van, tot, wat) values (t.wie, t.sinds, now(), t.wat);
  end if;
end;
$$;

create or replace function sessie_toevoegen(
  pw text, persoon text, begin_tijd timestamptz, eind_tijd timestamptz, waaraan text
) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform controleer(pw);
  insert into sessies (wie, van, tot, wat, achteraf)
  values (persoon, begin_tijd, eind_tijd, coalesce(waaraan, ''), true);
end;
$$;

create or replace function sessie_verwijderen(pw text, sessie uuid)
returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform controleer(pw);
  delete from sessies where id = sessie;
end;
$$;

-- Visitors (the "anon" role) may call these functions, but not read the password table.
revoke all on geheim from anon, authenticated;
grant execute on function
  wachtwoord_ok(text),
  start_timer(text, text, text),
  stop_timer(text, text),
  sessie_toevoegen(text, text, timestamptz, timestamptz, text),
  sessie_verwijderen(text, uuid)
to anon, authenticated;
revoke execute on function controleer(text) from anon, authenticated, public;

-- Live updates: the page hears about every change straight away.
do $$
begin
  alter publication supabase_realtime add table timers, sessies;
exception when duplicate_object then null;
end;
$$;

-- Team password: replace KIES-EEN-WACHTWOORD, then run only this line.
-- insert into geheim (hash) values (crypt('KIES-EEN-WACHTWOORD', gen_salt('bf')))
--   on conflict (id) do update set hash = excluded.hash;
