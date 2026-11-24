-- 24/11: a task can link to a blog post. Run once in Supabase: SQL Editor -> New query -> paste -> Run.

alter table planning add column if not exists post text;

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
      post = case when rij ? 'post' then nullif(rij->>'post', '') else post end
    where id = (rij->>'id')::uuid;
  else
    insert into planning (taak, soort, pijler, wie, van, tot, status, notitie, post) values (
      rij->>'taak',
      coalesce(rij->>'soort', 'Taak'),
      coalesce(rij->>'pijler', 'Algemeen'),
      coalesce(array(select jsonb_array_elements_text(rij->'wie')), '{}'),
      (rij->>'van')::date,
      coalesce((rij->>'tot')::date, (rij->>'van')::date),
      coalesce(rij->>'status', 'Te doen'),
      coalesce(rij->>'notitie', ''),
      nullif(rij->>'post', '')
    );
  end if;
end;
$$;

-- Tasks of today (24/11), linked to their blog posts.
insert into planning (taak, soort, pijler, wie, van, tot, status, notitie, post) values
  ('Blog en planning professioneler', 'Taak', 'Algemeen', '{Ibe}', '2026-11-24', '2026-11-24', 'Klaar',
   'Na coachmoment 3: planning, uren en blog in één site',
   '/BAP-BLOG/posts/posts/2026-11-24-nieuw-tijdperk-planning-en-projectmanagement/'),
  ('Blogpost coachmoment 3', 'Taak', 'Algemeen', '{Senne}', '2026-11-24', '2026-11-24', 'Te doen',
   'Notities van Jynse uitschrijven',
   '/BAP-BLOG/posts/posts/2026-11-24-coachmoment-3-jynse/');
