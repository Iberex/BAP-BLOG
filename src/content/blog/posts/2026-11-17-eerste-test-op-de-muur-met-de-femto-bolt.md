---
title: "Eerste test op de muur met de Femto Bolt"
author: Ibe
soort:
  - experiment
  - playtest
pijler:
  - DEV
  - UX
samenvatting: >-
  De Femto Bolt werkt niet op een Mac, maar met een laptop van school konden we
  hem eindelijk testen op campus: beamer op een toren van bakken, camera op
  een statief en de game op een grote muur. Het werkt, maar de camera staat
  op de verkeerde plek.
inhoud:
  - _template: tekst
    tekst: >-
      In Krabbels speel je met je lichaam: de camera ziet je armen, en die
      worden bruggen en hellingen op de muur. Daarvoor gebruiken we de Femto
      Bolt, een dieptecamera. Tot nu toe testte ik hem alleen thuis op mijn
      pc. Vrijdag 13/11 testten we hem voor het eerst op campus, op een echte
      muur en op ware grootte.
  - _template: beeld
    src: /BAP-BLOG/beelden/campustest/01-opstelling-campus.jpg
  - _template: tussentitel
    titel: "Probleem: de Femto Bolt werkt niet op een Mac"
  - _template: tekst
    tekst: >-
      De software die het skelet herkent, werkt alleen op Windows met een
      NVIDIA-videokaart. Wij werken allemaal op een Mac, en mijn pc thuis kan
      ik niet zomaar meenemen naar school of naar de jury (zie ook
      [Femto Bolt of MediaPipe?](/BAP-BLOG/posts/experiment/2026-11-11-femto-bolt-of-mediapipe/)).


      De oplossing kwam van school: we kregen een Windows-laptop ter
      beschikking. Die stond nog op fabrieksinstellingen, dus ik heb alles
      stap voor stap opgezet: de drivers van de camera, de software voor het
      skelet en onze demo. Daarna draaide de Femto Bolt ook op campus.
  - _template: beeld
    src: /BAP-BLOG/beelden/campustest/00-femto-bolt.png
  - _template: tussentitel
    titel: De opstelling op campus
  - _template: tekst
    tekst: >-
      Veel materiaal hadden we niet, dus we bouwden met wat er lag. De beamer
      staat bovenop een toren van plastic bakken, de Femto Bolt op een statief
      ernaast, en de laptop op een paar bakken ernaast. De beamer projecteert
      de game op een grote witte wand.


      Door de opstelling stond het beeld in spiegelbeeld, en bewoog het
      silhouet de verkeerde kant op. Daarom spiegelden we alleen het silhouet
      en de beweging, en niet de hele pagina, zodat menu's en tekst gewoon
      leesbaar bleven.
  - _template: video
    link: https://player.mux.com/jxiK631ozSorp1qE8pJK029kPpqcjINac01NPaA02cS01aI
  - _template: video
    link: https://player.mux.com/kM02Ah7kUeIxDxbHSYQ027s1Xr3KeklmcCpF34pv8UTYI
  - _template: tussentitel
    titel: "Probleem: de camera staat achter je"
  - _template: tekst
    tekst: >-
      De test werkte, maar we zagen meteen wat er beter moet. De camera staat
      nu bij de beamer, dus achter de speler. Daardoor:


      - **Worden sommige bewegingen niet goed herkend.** Van achteren ziet de
      camera niet alles wat je armen doen.

      - **Staat niet iedereen in beeld.** Wie iets opzij staat of achter
      iemand anders staat, valt weg.


      De camera stond daar niet uit keuze. Zowel de kabel van de camera naar
      de laptop als de kabel van de laptop naar de beamer was te kort, dus
      alles moest dicht bij elkaar staan.


      De camera moet vóór de speler komen, boven het scherm, en niet bij de
      beamer. Dat lossen we op met een langere HDMI-kabel van de laptop naar
      de beamer. Dan kan de laptop vooraan staan, bij de muur waarop de beamer
      schijnt, en kan de korte camerakabel van daar naar de camera boven het
      scherm. Die langere kabel hadden we op dat moment niet.
  - _template: tussentitel
    titel: Wat nu?
  - _template: tekst
    tekst: >-
      We testen opnieuw met de camera boven het scherm. Daarnaast moeten we
      een duidelijke omkadering maken: een afgebakende zone op de vloer waar
      kinderen moeten staan, zodat de camera altijd iedereen ziet die meespeelt.
  - _template: tussentitel
    titel: Gebruik van AI
  - _template: tekst
    tekst: >-
      De demo had ik thuis al klaar, die was zo goed als plug-and-play. Maar op
      de laptop stond niets: geen npm, geen Git, geen login voor GitHub. Alles
      apart uitzoeken en downloaden zou lang duren, dus maakte ik met Claude
      een md-bestand met alles wat erop moest, stap voor stap.
pubDatetime: 2026-11-17T17:00:00+01:00
draft: false
---
