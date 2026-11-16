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

Op de pagina **uren** start en stopt iedereen zijn eigen timer. Iedereen ziet live wie aan het werk is, en de uren per dag en per persoon tellen vanzelf op. Timer vergeten? Voeg je uren achteraf toe op dezelfde pagina.

Ontgrendelen gebeurt met één teamwachtwoord. Zonder wachtwoord kan je alleen kijken.

### Eenmalig instellen (Supabase)

1. Maak een gratis account en een nieuw project op [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, plak de inhoud van `supabase/uren.sql` en klik **Run**.
3. Kies een teamwachtwoord. Haal in de laatste regel van het script de `--` weg, vervang `KIES-EEN-WACHTWOORD` en voer alleen die regel uit.
4. Ga naar **Project Settings → API** en kopieer de **Project URL** en de **publishable key** (of `anon` key) naar `SUPABASE` in `src/config.ts`.
5. Push naar `main`. Na de build werkt de pagina.

Wachtwoord veranderen: voer stap 3 opnieuw uit.

## Lokaal (optioneel)

```bash
npm install
npm run dev   # http://localhost:4321/BAP-BLOG/
```
