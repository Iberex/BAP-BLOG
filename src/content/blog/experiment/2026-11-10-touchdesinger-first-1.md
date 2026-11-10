---
title: TouchDesinger First
author: Ibe
pijler:
  - DEV
samenvatting: "In één weekend leerde ik TouchDesigner door effecten te maken die
  mijn handen volgen via de webcam en MediaPipe. Het viel beter mee dan
  verwacht: eens je de handdata hebt, kun je er bijna alles mee aansturen, zelfs
  de verlichting van mijn toetsenbord."
videos:
  - link: " https://vimeo.com/1245501015"
    titel: Röntgen
  - link: https://vimeo.com/1245501581
    titel: Toetsenbord + oled screen
  - link: https://vimeo.com/1245502443
    titel: Toestenbord Led
soort: experiment
blokken:
  doel: >-
    Ik keek online rond en vroeg ook aan AI wat ik zou kunnen onderzoeken. Ik
    zag dat TouchDesigner heel vaak gebruikt wordt voor interactieve
    installaties met camera’s, en het leek me gewoon leuk om mee te
    experimenteren. Ik wilde weten hoe moeilijk TouchDesigner is om te leren, en
    wat je allemaal kunt doen met de data van een camera die je handen volgt.


    Vooraf verwachtte ik een moeilijke leercurve, met heel veel lijntjes trekken
    tussen nodes.
  aanpak: >-
    Ik deed dit op zondag 8 november. Eerst volgde ik een paar tutorials om de
    interface te snappen. Daarna volgde ik één tutorial helemaal zoals de
    youtuber het deed: bliksem tussen mijn vingers.


    Daarvoor gebruikte ik mediapipe-touchdesigner. Die component zet MediaPipe
    in TouchDesigner en geeft per hand 21 punten, van de pols tot elke
    vingertop. MediaPipe kan ook het gezicht en het lichaam volgen, maar die
    zette ik uit, want dat vrat FPS.


    Toen ik de handdata had, ging ik zelf verder: wat kan ik nog met die punten,
    en hoe? Dat deed ik samen met Claude, dat Python-scripts schreef die ik in
    TouchDesigner liet lopen. Zo kwamen er nog drie effecten bij:


    Röntgen: tussen je vingers verschijnt een kader dat een lijntekening van je
    gezicht toont, alsof je door je handen kijkt.


    Toetsenbord: ik wilde TouchDesigner eerst aan iets niet-digitaals koppelen
    met een Arduino, maar die lag onder het stof en ik had niet alles bij de
    hand. Dus keek ik rond in mijn kamer, en zag mijn SteelSeries-toetsenbord.
    Via de software van SteelSeries kun je dat rechtstreeks aansturen met JSON.
    Ik maakte twee versies:


    Licht: de kant van het toetsenbord waar je hand is, licht rood op. Een open
    hand is licht aan, een vuist is licht uit.


    Scherm: de punten van je hand verschijnen op het kleine OLED-schermpje van
    het toetsenbord.
  resultaat: >-
    Leren ging sneller dan verwacht. Na één tutorial kon ik al zelf dingen
    maken, omdat je eigenlijk altijd dezelfde handdata gebruikt en alleen moet
    bedenken wat je ermee doet.


    De handen worden heel precies gevolgd, tot op elke vinger. Daardoor kun je
    ook kleine gebaren gebruiken, zoals een vuist of een kader met je vingers.


    Met twee handen werkte het ook. Met twee mensen heb ik het niet geprobeerd.


    Het draaide vlot op mijn MacBook, zolang gezicht en lichaam uit stonden.


    In het donker werkt het niet. MediaPipe heeft licht nodig, en redelijk veel.
  conclusie: "TouchDesigner is minder eng dan het eruitziet. Eens je de data uit
    een camera hebt, wordt het vooral een creatieve vraag: wat wil je ermee
    doen?"
pubDatetime: 2026-11-10T16:31:00Z
draft: true
---
