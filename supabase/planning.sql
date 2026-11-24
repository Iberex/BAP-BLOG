-- Database for the "Planning" page. Everyone can read the planning (the blog is public).
-- Changing it only works through the two functions below, with your own code.
-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Before running: fill in a code per person (bottom of this file).

create table if not exists planning (
  id uuid primary key default gen_random_uuid(),
  taak text not null,
  soort text not null default 'Taak' check (soort in ('Taak', 'Overleg', 'Deadline')),
  pijler text not null default 'Algemeen' check (pijler in ('Design', 'UX', 'Development', 'Algemeen')),
  wie text[] not null default '{}',
  van date not null,
  tot date not null,
  status text not null default 'Te doen' check (status in ('Te doen', 'Bezig', 'Klaar')),
  notitie text not null default '',
  post text,
  check (tot >= van)
);
-- Link to the blog post about a task (added later, safe to run again).
alter table planning add column if not exists post text;

-- One code per team member. Nobody can read this table from the browser.
create table if not exists planning_code (
  wie text primary key check (wie in ('Ibe', 'Tjorven', 'Senne')),
  code text not null unique
);

alter table planning enable row level security;
alter table planning_code enable row level security;
drop policy if exists "iedereen leest" on planning;
create policy "iedereen leest" on planning for select using (true);
revoke all on planning_code from anon, authenticated;

-- Add or change a task. Without "id" in the row it is a new task.
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

create or replace function planning_verwijder(code text, id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from planning_code p where p.code = planning_verwijder.code) then
    raise exception 'code klopt niet';
  end if;
  delete from planning where planning.id = planning_verwijder.id;
end;
$$;

revoke all on function planning_bewaar(text, jsonb), planning_verwijder(text, uuid) from public;
grant execute on function planning_bewaar(text, jsonb), planning_verwijder(text, uuid) to anon, authenticated;

-- Live updates: everyone sees a change straight away.
do $$
begin
  alter publication supabase_realtime add table planning;
exception when duplicate_object then null;
end;
$$;

-- A code per person. Change the codes before running.
insert into planning_code (wie, code) values
  ('Ibe', 'CODE-IBE'), ('Tjorven', 'CODE-TJORVEN'), ('Senne', 'CODE-SENNE')
  on conflict (wie) do update set code = excluded.code;

-- Start planning (only the first time, when the table is still empty).
insert into planning (taak, soort, pijler, wie, van, tot, status, notitie)
select taak, soort, pijler, wie::text[], van::date, tot::date, status, notitie from (values
  ('Overleg Laura 28/10', 'Overleg', 'Algemeen', '{}', '2026-10-28', '2026-10-28', 'Klaar', ''),
  ('Contract ondertekenen en indienen', 'Deadline', 'Algemeen', '{}', '2026-10-30', '2026-10-30', 'Klaar', ''),
  ('Pitchdeck + video naar Laura', 'Deadline', 'Algemeen', '{}', '2026-11-01', '2026-11-01', 'Klaar', 'concept.pdf + pitchdeck.mp4'),
  ('Overleg Laura 04/11', 'Overleg', 'Algemeen', '{}', '2026-11-04', '2026-11-04', 'Klaar', ''),
  ('Feedbackmoment leerkrachten 10/11', 'Overleg', 'Algemeen', '{}', '2026-11-10', '2026-11-10', 'Klaar', ''),
  ('Overleg Laura 10/11', 'Overleg', 'Algemeen', '{}', '2026-11-10', '2026-11-10', 'Klaar', 'Notities in Figma, pagina 5'),
  ('Start opbouw constructie', 'Taak', 'Development', '{Senne}', '2026-11-10', '2026-11-13', 'Bezig', ''),
  ('Testmoment 1 voorbereiden', 'Taak', 'UX', '{Senne}', '2026-11-10', '2026-11-15', 'Klaar', 'Voorbereiden van testmoment 1 op Chiro Hemo Opstal.'),
  ('Puntje uittekenen (stijl, houdingen)', 'Taak', 'Design', '{}', '2026-11-11', '2026-11-17', 'Bezig', 'Krabbel tekent het kind zelf. Houdingen, emoties en storyboard staan als wireframe in Figma'),
  ('Tech-test: gebaren herkennen met webcam (MediaPipe)', 'Taak', 'Development', '{Ibe}', '2026-11-11', '2026-11-15', 'Klaar', 'Lukt: brug, helling, ladder, springen, bukken, ook met 2 personen (testdemo)'),
  ('Tech-test: tekening van iPad naar de muur sturen', 'Taak', 'Development', '{Ibe}', '2026-11-11', '2026-11-15', 'Bezig', 'Bv. web-app + websockets op een laptop'),
  ('iPad-schermen uitwerken zonder tekst', 'Taak', 'Design', '{}', '2026-11-12', '2026-11-17', 'Te doen', '''KLIK OP MIJ'' vervangen door een symbool'),
  ('Techstack kiezen', 'Taak', 'Development', '{}', '2026-11-13', '2026-11-16', 'Klaar', 'Browser: MediaPipe + canvas, gekozen na de tech-test'),
  ('Testdag met kinderen 15/11', 'Taak', 'UX', '{}', '2026-11-15', '2026-11-15', 'Klaar', 'Opnames uitgeschreven, invulbladen en resultaten in Figma (Testing)'),
  ('Analyse testdag uitwerken', 'Taak', 'UX', '{}', '2026-11-16', '2026-11-19', 'Bezig', 'Resultatenbord in Figma, wat we in de demo veranderden. Grootste probleem: opzij gaan (8 van de 13 groepjes)'),
  ('Demo: aanpassingen uit de test', 'Taak', 'Development', '{}', '2026-11-16', '2026-11-19', 'Bezig', 'Klaar: vaste plek met voetjes, pictogrammen met de rig-poses. Nog: ladderhint'),
  ('Game: Krabbel loopt, valt in een gat, armen opzij maakt een brug', 'Taak', 'Development', '{}', '2026-11-16', '2026-11-22', 'Klaar', 'In de testdemo'),
  ('Opstelling: schema, handleiding en materiaallijst', 'Taak', 'Development', '{}', '2026-11-16', '2026-11-19', 'Bezig', 'Materiaallijst in de production sheet van JEF'),
  ('Project pitch: demo of video van de gebaren', 'Taak', 'Development', '{}', '2026-11-16', '2026-11-18', 'Bezig', 'Testdemo werkt (vaste plek, bewegende pictogrammen). Nog: tekenen op de iPad en eindscherm'),
  ('Project pitch: inhoud uitschrijven', 'Taak', 'Algemeen', '{}', '2026-11-16', '2026-11-17', 'Te doen', 'Criteria: voor- en nadelen, waar staan we, klantfeedback, iets unieks, volgende stappen, twijfels'),
  ('Stijlrichting: 2 à 3 opties met stijlborden', 'Taak', 'Design', '{}', '2026-11-16', '2026-11-19', 'Bezig', 'Kleuren, letter, Puntje, elementen, UI. Laura laten kiezen'),
  ('UX: alle schermen, verhaal en pictogrammen', 'Taak', 'UX', '{Senne}', '2026-11-16', '2026-11-19', 'Bezig', 'Verhaaltekst, wireframes Puntje, storyboard en pictogrammen (met rig) staan in Figma'),
  ('iPad-app: tekenen en versturen', 'Taak', 'Development', '{}', '2026-11-16', '2026-11-19', 'Te doen', 'Met de vinger, geen pen. Voor de pitch een eenvoudige versie (tekenen, oogjes, klaar)'),
  ('Level 1 ontwerpen', 'Taak', 'Design', '{}', '2026-11-17', '2026-11-22', 'Te doen', ''),
  ('Overleg Laura 17/11', 'Overleg', 'Algemeen', '{}', '2026-11-17', '2026-11-17', 'Te doen', ''),
  ('Project pitch: slides maken', 'Taak', 'Design', '{}', '2026-11-17', '2026-11-18', 'Te doen', ''),
  ('Demo: start- en eindscherm', 'Taak', 'Development', '{}', '2026-11-18', '2026-11-19', 'Te doen', 'Eindscherm met tijd of score, Krabbel juicht, nog eens'),
  ('Game: getekende Krabbel laten bewegen (lopen, wiebelen)', 'Taak', 'Development', '{}', '2026-11-18', '2026-11-25', 'Te doen', ''),
  ('Project pitch klaar en geoefend', 'Deadline', 'Algemeen', '{}', '2026-11-18', '2026-11-18', 'Te doen', '2 dagen speling voor de deadline'),
  ('Testplan maken voor het testmoment', 'Taak', 'UX', '{}', '2026-11-19', '2026-11-24', 'Te doen', 'Wat willen we weten? Vragen, observatielijst, wat meten we'),
  ('Project pitch indienen', 'Deadline', 'Algemeen', '{}', '2026-11-20', '2026-11-20', 'Te doen', 'BAP_13_JEF_projectpitch.zip met presentation.pdf, voor 22u'),
  ('Game: Puntje doet het eerst voor (leren zonder woorden)', 'Taak', 'Development', '{}', '2026-11-23', '2026-11-28', 'Te doen', 'Probleem, Puntje probeert, jouw beurt, hulp, beloning'),
  ('Game: helling en ladder', 'Taak', 'Development', '{}', '2026-11-23', '2026-11-27', 'Klaar', 'In de testdemo, samen met springen en bukken'),
  ('Puntje animaties v1', 'Taak', 'Design', '{}', '2026-11-23', '2026-11-28', 'Te doen', ''),
  ('Testopstelling op campus voorbereiden', 'Taak', 'Development', '{}', '2026-11-25', '2026-12-01', 'Te doen', 'Beamer, camera, iPad, iets als muur. Waar staan we?'),
  ('Testmoment op campus + indienen', 'Deadline', 'UX', '{}', '2026-12-03', '2026-12-03', 'Te doen', 'Hele voormiddag aanwezig. Indienen voor 22u. Exacte testdag nog checken'),
  ('Test met kinderen (JEF)', 'Taak', 'UX', '{}', '2026-12-04', '2026-12-04', 'Te doen', 'Nog bevestigen met Laura. Ook testen: welk einde werkt'),
  ('MVP klaar (feature freeze)', 'Deadline', 'Development', '{}', '2026-12-11', '2026-12-11', 'Te doen', 'Daarna enkel nog bugs. 5 dagen speling'),
  ('Zips, readme, pdf en bronbestand klaar', 'Deadline', 'Algemeen', '{}', '2026-12-15', '2026-12-15', 'Te doen', '1 dag speling'),
  ('Jury indienen', 'Deadline', 'Algemeen', '{}', '2026-12-16', '2026-12-16', 'Te doen', 'Readme + XD/DESIGN/DEVELOPMENT-zips + PRESENTATION.pdf en bron, voor 22u'),
  ('Opstelling neerzetten op campus', 'Taak', 'Development', '{}', '2026-12-16', '2026-12-16', 'Te doen', 'Atelier 2, Atelier 3, achteraan Atelier 1 of Passerelle 1, vanaf 16/12'),
  ('Jury', 'Deadline', 'Algemeen', '{}', '2026-12-17', '2026-12-17', 'Te doen', 'Datum en slot nog niet bekend. 20 min op voorhand aanwezig'),
  ('Alle bronbestanden naar JEF sturen', 'Deadline', 'Algemeen', '{}', '2026-12-18', '2026-12-18', 'Te doen', 'Voor 22u. Met Laura afspreken hoe (WeTransfer?)')
) as t(taak, soort, pijler, wie, van, tot, status, notitie)
where not exists (select 1 from planning);
