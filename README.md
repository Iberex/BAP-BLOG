# BAP-procesblog

Procesblog van onze bachelorproef (Devine 2026–2027, Jeugdfilmfestival Antwerpen – XL-Medialab 2027).

**Live:** https://iberex.github.io/BAP-BLOG/

Gebouwd op het [AstroPaper](https://github.com/satnaing/astro-paper)-thema via de [Pages CMS-template](https://github.com/pagescms/astro-blog-template).

## Iets toevoegen

1. Klik op de blog op **+ nieuwe post** (of onderaan op **Beheer**) en log in met GitHub.
2. Kies het soort post, vul in: **titel**, **wie**, **pijler** en je **tekst**. De datum staat al op vandaag.
3. Klik _Save_. Na ±1 minuut staat het online.

**Planning:** klik op **+ planning bewerken** op de planningpagina.

### Dagboek-kopjes

Wat deed ik vandaag? · Wat heb ik geleerd? · Problemen en hoe opgelost · AI-gebruik vandaag · Volgende stap

## Uren

Iedereen houdt zijn uren bij in zijn **eigen Toggl Track**, in het project **BAP**. Start en stop je timer gewoon in Toggl (app, website of extensie). De pagina **uren** op de blog toont live wie aan het werk is, met de uren per dag en per persoon.

Hoe het werkt: Toggl stuurt elke wijziging via een webhook naar de functie `toggl` in Supabase (`supabase/functions/toggl/index.ts`). Die controleert de handtekening en zet de uren in de tabellen `timers` en `sessies`. Alleen tijd in het project BAP telt mee.

### Een teamlid koppelen (eenmalig, per persoon)

1. Maak in je Toggl een project **BAP** aan en noteer het project-id (staat in de link van het project).
2. Kies een lange geheime sleutel en zet die in Supabase (SQL Editor):
   ```sql
   insert into toggl_bronnen (wie, geheim, project_id) values ('Tjorven', 'GEHEIME-SLEUTEL', 123456789)
     on conflict (wie) do update set geheim = excluded.geheim, project_id = excluded.project_id;
   ```
3. Maak in Toggl een webhook aan (gratis: 1 webhook, 3 events) met
   - URL: `https://gbzabbenzkzbodcmcawv.supabase.co/functions/v1/toggl?wie=Tjorven`
   - events: `time_entry` created, updated en deleted
   - secret: dezelfde geheime sleutel als in stap 2.

   De functie valideert de webhook automatisch.

### Database opnieuw opzetten

`supabase/uren.sql` bevat de tabellen. De functie zet je online via **Edge Functions → Deploy a new function** (naam `toggl`, plak `supabase/functions/toggl/index.ts`) en zet daarna **Verify JWT** uit.

## Lokaal (optioneel)

```bash
npm install
npm run dev   # http://localhost:4321/BAP-BLOG/
```
