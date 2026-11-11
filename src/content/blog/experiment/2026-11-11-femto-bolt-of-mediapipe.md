---
title: Femto Bolt of MediaPipe?
author: Ibe
pijler:
  - DEV
samenvatting: We vergeleken skelet-tracking met de dieptecamera van de Femto
  Bolt met MediaPipe op een gewone camera. De Femto geeft een rustiger skelet,
  maar heeft een sterke NVIDIA-videokaart nodig. MediaPipe draait op elke laptop
  en lijkt voorlopig goed genoeg.
videos:
  - link: https://player.mux.com/uZIaea6TvQh01hgU02S57gradbvDouipeML5x65ctYzmo
    titel: "Testopname: Femto Bolt vs MediaPipe"
soort: experiment
blokken:
  doel: >-
    De Krabbels-demo draaide tot nu toe op de Femto Bolt, een dieptecamera. Dat
    werkt goed, maar vraagt veel: een sterke videokaart, Windows en extra
    software. We wilden weten of het ook eenvoudiger kan, met een gewone camera
    en MediaPipe.


    Onze vragen:

    1. Hoeveel beter is de Femto echt, in cijfers?

    2. Hebben we de diepte van de Femto eigenlijk nodig?

    3. Kunnen we de Femto gebruiken bij de jury, zonder zware videokaart?

    4. Is MediaPipe krachtig genoeg om de Femto te vervangen?
  aanpak: >-
    Om eerlijk te kunnen vergelijken, bouwden we met Claude Code (AI) een
    vergelijkingstool: een aparte versie van de Krabbels-demo waarin je kunt
    kiezen tussen twee bronnen, met een testmodus die de cijfers automatisch
    meet en in een tabel zet.


    De twee bronnen:

    - Femto: diepte- en infraroodbeeld. Het skelet komt van de Azure Kinect Body
    Tracking SDK, via een eigen Python-brug.

    - Webcam: het kleurbeeld van dezelfde Femto, gebruikt als gewone webcam. Het
    skelet komt van MediaPipe Pose in Chrome.


    Beide gebruiken dezelfde camera op dezelfde plek en dezelfde spelcode.
    Alleen de bron verschilt. Per test staat één persoon op 2 à 3 m en houdt 5
    seconden de armen opzij. Het spel meet het aantal gevonden spelers, fps,
    verwerkingstijd, of de houding herkend wordt, en hoeveel de pols trilt.
    Alles draaide op een pc met een NVIDIA RTX 4080.
  resultaat: >-
    Gemiddelden met 1 persoon (Femto 4 tests, webcam 5 tests):

    Femto: 1,0 speler, 30 fps, 19 à 21 ms, houding herkend 62%, trillen 1,9%

    MediaPipe: 1,0 speler, 30 fps, 15 ms, houding herkend 43%, trillen 3,3%


    Femto Bolt

    + Rustigste skelet: ongeveer 40% minder trillen

    + Echte diepte: weet hoe ver elke speler van de camera staat

    + Ziet met infrarood, dus werkt ook in het donker (nog niet getest)

    - De body tracking heeft een sterke videokaart nodig. Wij gebruiken CUDA op
    een NVIDIA-kaart. Er bestaat een CPU-modus, maar die is veel trager (niet
    getest).

    - Werkt alleen op Windows of Linux, niet op een Mac

    - Veel extra software: camera-driver, Body Tracking SDK (1,7 GB) en onze
    eigen brug

    - In de eerste testronde haalde hij maar 20 à 22 fps, tot we de brug
    aanpasten


    Webcam + MediaPipe

    + Draait in Chrome op elke laptop, ook op een Mac, en schakelt over naar de
    processor als er geen goede videokaart is

    + Werkt met elke webcam, zonder extra software

    + Even goed in het vinden van de speler (altijd gevonden), even vloeiend (30
    fps) en iets sneller (15 ms)

    - Skelet trilt meer

    - Geen echte diepte: MediaPipe schat de houding, maar weet niet hoe ver je
    van de camera staat

    - Heeft licht nodig, dus waarschijnlijk minder goed in het donker met de
    projector (nog niet getest)

    - Laadt het model (~10 MB) van internet, dus werkt nu niet offline
  conclusie: >-
    1. Hoeveel beter is de Femto? Vooral rustiger. Op alle andere punten zijn ze
    bijna gelijk.

    2. Hebben we de diepte nodig? Voor wat Krabbels nu doet, eigenlijk niet.

    3. Kan de Femto bij de jury? Nu niet zonder een pc met NVIDIA-videokaart.
    Dat moeten we nog oplossen.

    4. Is MediaPipe krachtig genoeg? Met één speler wel, op het trillen na. Dat
    kunnen we misschien oplossen door een filter toe te voegen dat de bewegingen
    afvlakt.


    Voorlopig lijkt MediaPipe de praktischere keuze, maar eerst willen we nog
    een paar dingen testen.


    Verdere acties, te bespreken op het consult:

    - MediaPipe testen op de laptop die we bij de jury gebruiken, want onze
    cijfers komen van een zware pc

    - Testen met 2 spelers en in het donker met de projector aan

    - Een filter tegen het trillen toevoegen en opnieuw meten

    - MediaPipe en het model lokaal zetten, zodat het zonder internet werkt

    - Testen met een gewone webcam in plaats van de kleurcamera van de Femto

    - Bespreken: hebben we diepte nodig voor wat we later nog willen maken? En
    kan er bij de jury een pc met videokaart staan?
beelden:
  - src: /BAP-BLOG/beelden/1-camerabeeld-femto-infrarood.png
  - src: /BAP-BLOG/beelden/2-spel-tijdens-femto-test.png
  - src: /BAP-BLOG/beelden/3-spel-tijdens-webcam-test.png
  - src: /BAP-BLOG/beelden/4-resultaten-ronde-2.png
  - src: /BAP-BLOG/beelden/5-resultaten-ronde-3.png
  - src: /BAP-BLOG/beelden/6-resultaten-ronde-1-eerste-poging.png
pubDatetime: 2026-11-11T20:39:00Z
draft: false
---
