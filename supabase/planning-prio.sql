-- Priority for planning tasks: 1 to 3 stars, 3 is the most important.
-- Empty (null) = no priority. Safe to run more than once.
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

alter table planning add column if not exists prio smallint check (prio between 1 and 3);

-- Same function as in planning.sql, now also saving "prio".
create or replace function planning_bewaar(code text, rij jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from planning_code p where p.code = planning_bewaar.code) then
    raise exception 'code klopt niet';
  end if;
  if rij ? 'id' then
    update planning set
      taak = coalesce(rij->>'taak', taak),
      soort = coalesce(rij->>'soort', soort),
      pijler = coalesce(rij->>'pijler', pijler),
      wie = case when rij ? 'wie' then array(select jsonb_array_elements_text(rij->'wie')) else wie end,
      van = coalesce((rij->>'van')::date, van),
      tot = coalesce((rij->>'tot')::date, tot),
      status = coalesce(rij->>'status', status),
      notitie = coalesce(rij->>'notitie', notitie),
      post = case when rij ? 'post' then nullif(rij->>'post', '') else post end,
      prio = case when rij ? 'prio' then nullif(rij->>'prio', '')::smallint else prio end
    where id = (rij->>'id')::uuid;
  else
    insert into planning (taak, soort, pijler, wie, van, tot, status, notitie, post, prio) values (
      rij->>'taak',
      coalesce(rij->>'soort', 'Taak'),
      coalesce(rij->>'pijler', 'Algemeen'),
      coalesce(array(select jsonb_array_elements_text(rij->'wie')), '{}'),
      (rij->>'van')::date,
      coalesce((rij->>'tot')::date, (rij->>'van')::date),
      coalesce(rij->>'status', 'Te doen'),
      coalesce(rij->>'notitie', ''),
      nullif(rij->>'post', ''),
      nullif(rij->>'prio', '')::smallint
    );
  end if;
end;
$$;

-- New task (24/11): the blog and the planning, for Ibe, top priority.
insert into planning (taak, soort, pijler, wie, van, tot, status, prio)
select 'Blog en planning fixen', 'Taak', 'Algemeen', '{Ibe}', '2026-11-24', '2026-11-25', 'Te doen', 3
where not exists (select 1 from planning where taak = 'Blog en planning fixen');
