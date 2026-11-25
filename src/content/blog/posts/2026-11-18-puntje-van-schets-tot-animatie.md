---
title: "Mascotte: schets en animaties"
author: Ibe
soort:
  - experiment
pijler:
  - DESIGN
  - DEV
samenvatting: >-
  Onze mascotte Puntje, een levend potlood dat het kind helpt. Van een blad
  vol schetsen naar een vector in Illustrator, een rig in After Effects en 19
  animaties die in een Phaser-demo spelen.
inhoud:
  - _template: tekst
    tekst: >-
      In Krabbels tekent het kind zelf een mannetje, de Krabbel. Maar iemand
      moet het kind ook uitleggen wat het moet doen, zonder tekst. Daarvoor
      hebben we een mascotte nodig: **Puntje**, een levend potlood. Puntje
      wijst, wenkt, juicht en helpt. In deze post laat ik zien hoe Puntje van
      een schets op papier een figuurtje werd dat in onze game kan bewegen.
  - _template: video
    link: https://player.mux.com/weV1BmI8rlagN7gHYNpN1jIteOcqePBaO1CqhAC8tfo
  - _template: tussentitel
    titel: "Stap 1: zoeken naar het juiste potlood"
  - _template: tekst
    tekst: >-
      Eerst verkende ik een paar richtingen: geel lijf, zwart bandje en een
      roze gom. De meeste voorstellen waren te glad of te schattig. Het
      schattige figuurtje is de Krabbel van het kind. Puntje is eerder een
      vriendelijke begeleider en mag dus wat volwassener ogen.
  - _template: tekst
    tekst: >-
      Daarom ben ik zelf gaan schetsen in
      Procreate. Op één blad tekende ik verschillende potloden naast elkaar en
      maakte ik keuzes:


      - **Eén groot oog** voelde te vreemd. Twee ogen met wenkbrauwen geven
      meer uitdrukking.

      - **Grote ronde ogen** waren te schattig ("to cute" op de schets).
      Halfgesloten ogen met een scheve glimlach maken hem relaxter en ouder.

      - **Een hap uit de gom** geeft hem karakter. Het is een potlood dat al
      wat meegemaakt heeft.

      - **Een wijzende arm.** Een potlood lijkt al op een pijl, dus wijzen
      past perfect bij een helper.
  - _template: beeld
    src: /BAP-BLOG/beelden/puntje/01-schetsen-potlood.png
    bijschrift: "Mijn schetsblad: van de eerste schets (linksboven) naar de leunende Puntje met een hap uit zijn gom (rechtsonder)"
  - _template: tussentitel
    titel: "Stap 2: van schets naar vector"
  - _template: tekst
    tekst: >-
      De laatste schets van de onderste rij werd de basis. Die werd een vector
      in Illustrator. De eindversie heeft vlakke kleuren: drie tinten geel voor de zijkanten van het
      potlood, een grijs bandje en een roze gom met de hap erin.


      Om hem later te kunnen animeren, moest elk onderdeel op een eigen laag
      staan: lijf, gom, bandje, punt, elke arm, elk oog, de wenkbrauwen en de
      mond. Zo kan je in After Effects elk deel apart laten bewegen.
  - _template: beeld
    src: /BAP-BLOG/beelden/puntje/02-puntje-vector.png
  - _template: tussentitel
    titel: "Stap 3: animeren in After Effects"
  - _template: tekst
    tekst: >-
      Senne had in zijn UX-demo al uitgewerkt welke bewegingen Puntje nodig
      heeft: rust, zwaaien, wijzen, juichen, springen, buigen en nog meer. Die
      lijst gebruikte ik als basis. Elke animatie werd een eigen compositie in
      After Effects, 19 in totaal. Onderweg veranderde er veel:


      - **Beentjes weg.** Met beentjes zag hij er niet natuurlijk uit. Nu
      zweeft hij.

      - **Ogen helemaal open.** De halfgesloten ogen van de schets werkten
      niet in elke animatie. Hij knippert nu rustig (0,3 seconden in plaats
      van 0,13).

      - **Armen achter het lijf**, met een vuistje en een duim in plaats van
      een los vingertje.

      - **Wijzen naar links en naar rechts.** Puntje kantelt tot zijn punt
      naar het doel wijst, en zijn arm wijst mee.

      - **Geen extra lijntjes.** Snelheidslijnen bij springen en golfjes bij
      tikken maakten het onrustig. Die zijn eruit.


      Halverwege werd het project een rommeltje van losse keyframes. Daarom
      heb ik de rig opnieuw opgebouwd, zoals een animator het zou doen: één controller om hem te verplaatsen, één voor het
      lijf, één voor het gezicht, een joystick waar de pupillen naar kijken en
      armen die vanzelf buigen als je de hand versleept. Daarna ging aanpassen
      veel sneller.
  - _template: galerij
    beelden:
      - src: /BAP-BLOG/beelden/puntje/anim-zwaaien.gif
      - src: /BAP-BLOG/beelden/puntje/anim-wenken.gif
      - src: /BAP-BLOG/beelden/puntje/anim-wijzen-rechts.gif
      - src: /BAP-BLOG/beelden/puntje/anim-wijzen-links.gif
      - src: /BAP-BLOG/beelden/puntje/anim-springen.gif
      - src: /BAP-BLOG/beelden/puntje/anim-gom-stukje-kwijt.gif
  - _template: tussentitel
    titel: "Stap 4: Puntje in de game"
  - _template: tekst
    tekst: >-
      Onze game maken we in Phaser. Ik twijfelde eerst over Lottie, maar de
      rig gebruikt expressions in After Effects (de armen die vanzelf buigen,
      de ogen die volgen), en die neemt Lottie niet goed over. Daarom render
      ik elke animatie als een reeks PNG's met een transparante achtergrond.
      Wat je in After Effects ziet, is dan exact wat je in de game krijgt.


      In een testdemo heeft elke animatie een eigen knop. Alle 19 animaties
      staan op hetzelfde ankerpunt, dus als Puntje van
      animatie wisselt, verspringt hij niet. Eenmalige animaties, zoals
      springen, gaan daarna vanzelf terug naar rust. De demo staat online:
      [iberex.github.io/puntje-demo](https://iberex.github.io/puntje-demo/).
  - _template: tussentitel
    titel: Wat nu?
  - _template: tekst
    tekst: >-
      Puntje moet nog in de echte game komen, naast de Krabbels van de
      kinderen. Later wil ik dat de camera bepaalt welke animatie speelt,
      bijvoorbeeld dat Puntje wijst naar waar het kind een brug moet maken. Ook
      de grootte van de beelden moet nog omlaag, want al die PNG's zijn veel om te laden.
  - _template: tussentitel
    titel: Wat neem ik mee?
  - _template: tekst
    tekst: >-
      Op papier zag ik sneller wat ik wilde dan met voorbeeldbeelden. Elk
      onderdeel op een eigen laag zetten kostte tijd, maar zonder dat kon ik
      niet animeren. En sinds de rig met controllers werkt, pas ik een
      animatie veel sneller aan.
  - _template: tussentitel
    titel: Gebruik van AI
  - _template: tekst
    tekst: >-
      Ik probeerde eerst om Claude scripts te laten schrijven die de animaties
      in After Effects opbouwen, maar dat werkte niet efficiënt. Daarna liet
      ik Claude me stap voor stap uitleggen hoe ik de armen en benen zelf aan
      het werk kreeg, en heb ik de rig zelf gebouwd. De Phaser-demo is gemaakt
      met Claude Code.
pubDatetime: 2026-11-18T21:00:00+01:00
draft: false
---
