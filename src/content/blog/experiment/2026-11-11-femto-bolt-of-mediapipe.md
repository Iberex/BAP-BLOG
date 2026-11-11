---
title: Femto Bolt of MediaPipe?
author: Ibe
pijler:
  - DEV
samenvatting: Femto Bolt of een gewone webcam met MediaPipe? De Femto geeft een
  rustiger skelet, maar MediaPipe werkt op elke laptop en lijkt voorlopig goed
  genoeg.
videos:
  - link: https://player.mux.com/uZIaea6TvQh01hgU02S57gradbvDouipeML5x65ctYzmo
    titel: "Testopname: Femto Bolt vs MediaPipe"
soort: experiment
blokken:
  doel: >-
    De Krabbels-demo draait op de Femto Bolt, een dieptecamera. Die werkt goed,
    maar vraagt een sterke NVIDIA-videokaart, Windows en extra software. Kan het
    ook met een gewone camera en MediaPipe?
  aanpak: >-
    Met Claude Code bouwden we een testversie van de demo waarin je kiest
    tussen twee bronnen. Dezelfde camera, plek en spelcode; alleen de bron
    verschilt.


    - Femto: diepte- en infraroodbeeld, skelet via de Azure Kinect Body Tracking
    SDK

    - Webcam: kleurbeeld van dezelfde Femto, skelet via MediaPipe in Chrome


    Per test staat één persoon op 2 à 3 m met de armen opzij. Het spel meet fps,
    snelheid, herkenning en trillen. Alles draaide op een pc met een RTX 4080.
  resultaat: >-
    Gemiddelden met 1 persoon (Femto 4 tests, webcam 5 tests):


    - Femto: 30 fps, 19 à 21 ms, houding herkend 62%, trillen 1,9%

    - MediaPipe: 30 fps, 15 ms, houding herkend 43%, trillen 3,3%


    De Femto is rustiger en kent echte diepte, maar heeft een NVIDIA-kaart,
    Windows en 1,7 GB extra software nodig. MediaPipe draait in Chrome op elke
    laptop met elke webcam en is iets sneller, maar trilt meer en kent geen
    diepte.
  conclusie: >-
    Voorlopig lijkt MediaPipe de praktischere keuze. De diepte hebben we voor
    Krabbels nu niet nodig, en het trillen kunnen we misschien wegfilteren.


    Nog te testen:


    - MediaPipe op de laptop die we bij de jury gebruiken

    - Met 2 spelers en in het donker met de projector

    - Een filter tegen het trillen
beelden:
  - src: /BAP-BLOG/beelden/1-camerabeeld-femto-infrarood.png
    bijschrift: Infraroodbeeld van de Femto
  - src: /BAP-BLOG/beelden/2-spel-tijdens-femto-test.png
    bijschrift: Het spel tijdens de Femto-test
  - src: /BAP-BLOG/beelden/3-spel-tijdens-webcam-test.png
    bijschrift: Het spel tijdens de webcam-test
  - src: /BAP-BLOG/beelden/6-resultaten-ronde-1-eerste-poging.png
    bijschrift: "Resultaten ronde 1: eerste poging"
  - src: /BAP-BLOG/beelden/4-resultaten-ronde-2.png
    bijschrift: Resultaten ronde 2
  - src: /BAP-BLOG/beelden/5-resultaten-ronde-3.png
    bijschrift: Resultaten ronde 3
pubDatetime: 2026-11-11T20:39:00Z
draft: false
---
