---
title: "Van iPad naar muur: de eerste tekendemo"
author: Ibe
soort:
  - experiment
pijler:
  - DEV
  - UX
samenvatting: >-
  Een werkende demo met drie schermen: je tekent een mannetje op de iPad, het
  loopt door een level en woont daarna in een wereld met alle andere mannetjes.
  Daarna maakten we het tekenscherm stap voor stap duidelijker voor kinderen
  die nog niet kunnen lezen.
inhoud:
  - _template: tekst
    tekst: >-
      In Krabbels tekent een kind een eigen mannetje op een iPad. Dat mannetje
      verlaat de iPad, verschijnt op de grote muur en loopt daar verder. Tot
      nu toe was dat alleen een idee op papier. Deze keer wilde ik bewijzen dat
      het technisch werkt: van vinger op de iPad tot een mannetje dat op een
      ander scherm rondloopt. Het uitzicht deed er nog niet toe, dus alles is
      zwarte lijnen op wit. In de demo heet het mannetje nog een "wobbel".
  - _template: beeld
    src: /BAP-BLOG/beelden/ipad-tekendemo/06-level-wobbels-lopen.png
    bijschrift: Drie getekende wobbels lopen samen door het level naar de finishvlag
  - _template: tussentitel
    titel: "Stap 1: drie schermen die met elkaar praten"
  - _template: tekst
    tekst: >-
      De demo bestaat uit een kleine Node-server met drie pagina's:


      - **/draw** draait op de iPad. Daar teken je je mannetje.

      - **/level** is het scherm van de beamer. Je mannetje komt binnen via een
      portaal en loopt vanzelf van de startvlag naar de finish.

      - **/world** is een derde scherm. Na de finish valt je mannetje daar uit
      de lucht en blijft het rondlopen met alle mannetjes van die dag.


      Mijn lector raadde aan om het eenvoudig te houden: geen WebSockets, enkel
      `fetch`. De iPad stuurt een tekening naar de server, en de schermen
      vragen elke seconde of er iets nieuws is. Dat is minder "live", maar wel
      makkelijk te begrijpen en te debuggen.


      De tekening gaat niet als afbeelding mee, maar als lijnen met punten. Zo
      blijft ze scherp op een groot scherm, hoe groot je ze ook maakt. Alles
      van één dag komt in één bestand, zodat de mannetjes terugkomen als de
      server herstart.
  - _template: tussentitel
    titel: "Stap 2: meer vrijheid bij het tekenen"
  - _template: tekst
    tekst: >-
      In de eerste versie tekende je met één zwarte lijn binnen een cirkel. Dat
      werkte, maar het voelde streng. Ik wilde dat kinderen echt hun eigen ding
      kunnen maken. Daarom kwamen er kleuren, drie diktes, een gom, een
      regenboogpen en een verfemmer bij. De cirkel werd een zachte stippellijn
      als hulp: je mag erbuiten tekenen voor oren, haar of een staart. Op de
      grote schermen zie je de cirkel niet meer.


      Daarbij dook een bug op: als je een penkleur koos, kregen de ogen ook die
      kleur. De tekencode gaf de penkleur door aan elke sticker. Nu zet elke
      sticker zelf zijn kleuren, dus ogen blijven zwart-wit.
  - _template: beeld
    src: /BAP-BLOG/beelden/ipad-tekendemo/01-test-op-echte-ipad.png
  - _template: galerij
    beelden:
      - src: /BAP-BLOG/beelden/ipad-tekendemo/02-tekenstap-voor.png
        bijschrift: "Voor de review: ronde knoppen, een klein tekenvlak"
      - src: /BAP-BLOG/beelden/ipad-tekendemo/03-tekenstap-na.png
        bijschrift: "Na de review: vierkante knoppen, het tekenvlak is bijna dubbel zo groot"
  - _template: tussentitel
    titel: "Stap 3: een scherm voor kinderen die nog niet lezen"
  - _template: tekst
    tekst: >-
      Toen ik het zelf op de iPad probeerde, was het te ingewikkeld voor een
      kind van 6. Er stond Engelse tekst op de knoppen en alles stond tegelijk
      op het scherm. Ik heb het omgebouwd naar een flow in vier stappen, met
      bovenaan vier vakjes met een pictogram:


      - **Benen kiezen.** Zonder benen kan je mannetje niet lopen. Onder de
      cirkel staan grijze stippelbenen tot je er een paar kiest. Benen teken je
      niet, je kiest ze uit kaartjes.

      - **Tekenen.** Het lijf teken je zelf, met alle kleuren en diktes.

      - **Ogen en extra's.** Eén tik zet een oog of een hoed op een logische
      plek. Daarna kan je hem verslepen.

      - **Versturen.** Een grote knop met een papieren vliegtuigje. Je mannetje
      krimpt en vliegt met sterretjes weg van de iPad.


      Weet een kind niet wat te doen, dan tikt na 4 seconden een handje op de
      volgende knop. De vuilbak moet je 1 seconde ingedrukt houden, zodat je
      niet per ongeluk alles wist. Alleen de eerste vinger tekent, zodat een
      handpalm op het scherm geen strepen maakt.
  - _template: galerij
    beelden:
      - src: /BAP-BLOG/beelden/ipad-tekendemo/04-stap-1-benen-kiezen.png
        bijschrift: "Stap 1: stippelbenen tonen wat er nog ontbreekt, het handje wijst een kaartje aan"
      - src: /BAP-BLOG/beelden/ipad-tekendemo/05-stap-3-ogen.png
        bijschrift: "Stap 3: ogen kiezen uit kaartjes met alleen een pictogram"
      - src: /BAP-BLOG/beelden/ipad-tekendemo/09-versturen.png
        bijschrift: "Stap 4: het mannetje vliegt met sterretjes weg van de iPad"
  - _template: tussentitel
    titel: "Stap 4: meten in plaats van gokken"
  - _template: tekst
    tekst: >-
      Ik had het gevoel dat sommige knoppen te groot waren en andere te klein,
      maar ik kon niet zeggen welke. Daarom liet ik screenshots maken van elk
      scherm en elke stap, op echte iPad-formaten (liggend, staand en iPad
      Pro), en alle knoppen opmeten.


      - **Het tekenvlak was te klein.** Liggend was het maar 26% van het
      scherm. Na het verplaatsen van de kleuren en het gereedschap naar de
      zijkanten is dat 49%.

      - **Bijna alles was rond.** Knoppen, kleuren en het lijf waren allemaal
      cirkels. Nu is alleen het lijf rond en zijn de knoppen afgeronde
      vierkanten, zodat een kind ze niet verwart met het tekenvlak.

      - **Sommige pictogrammen waren onduidelijk.** De benen leken op de
      letters "LL" en de verfemmer kennen jonge kinderen niet.

      - **Wit tekenen zag je niet** op het witte vlak. Het vlak is nu
      lichtgrijs.
  - _template: tussentitel
    titel: "Probleem: een wereld vol kluwen"
  - _template: tekst
    tekst: >-
      Op het wereldscherm liepen alle mannetjes op één grondlijn. Met 66
      mannetjes was het één grote kluwen lijnen en vond je je eigen mannetje
      niet meer terug. De bovenkant van het scherm bleef leeg.


      De oplossing werd een toren van platforms, zoals een platformgame waarin
      je naar boven klimt. Elk mannetje krijgt een eigen plek, springt van
      platform naar platform en gebruikt ladders en veren. De camera volgt een
      nieuw mannetje als het binnenkomt. In de test liepen 150 mannetjes vlot
      aan 60 beelden per seconde. Er staat nu ook een maximum op het aantal
      mannetjes in de wereld, zodat het overzichtelijk blijft.
  - _template: galerij
    beelden:
      - src: /BAP-BLOG/beelden/ipad-tekendemo/07-world-kluwen.png
      - src: /BAP-BLOG/beelden/ipad-tekendemo/08-world-toren.jpg
  - _template: tussentitel
    titel: Wat nu?
  - _template: tekst
    tekst: >-
      We hebben nu een demo die werkt. Die moet natuurlijk nog getest worden:
      snappen kinderen, of een andere doelgroep, zonder uitleg wat ze moeten
      doen? Verder wil ik bekijken hoe we kinderen nog meer vrijheid kunnen
      geven bij het maken van hun mannetje. Daarna komt onze stijl erop, zodat
      de demo ook het verhaal van Krabbels vertelt.
  - _template: tussentitel
    titel: Wat neem ik mee?
  - _template: tekst
    tekst: >-
      Zonder stijl zag ik sneller of de flow klopte. Elke knop met tekst was
      een knop die een kind van 6 niet snapte, dus pictogrammen en één stap
      tegelijk werken beter. En door de knoppen echt op te meten, wist ik
      eindelijk wat er te groot of te klein was.
  - _template: tussentitel
    titel: Gebruik van AI
  - _template: tekst
    tekst: >-
      De code van deze demo is geschreven met Claude Code. Wat de demo moest
      doen en hoe hij voor kinderen moest werken, bepaalde ik: de drie
      schermen, `fetch` in plaats van WebSockets, de stappen en waar de review
      op moest letten. Ik testte alles op mijn iPad en stuurde bij waar het
      niet klopte.
pubDatetime: 2026-11-16T20:00:00+01:00
draft: false
---
