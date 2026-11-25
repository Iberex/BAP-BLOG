---
title: "Van iPad naar spel"
author: Ibe
soort: experiment
pijler:
  - DEV
samenvatting: >-
  De tekendemo en het Femto-spel waren twee losse demo's. Nu hangen ze aan elkaar:
  je tekent op de iPad, je Krabbel loopt in het schaduwspel en verhuist daarna
  naar de wereldmuur. Over de codekeuzes die daarvoor nodig waren.
inhoud:
  - _template: tekst
    tekst: >-
      In Krabbels moet de tekening van een kind meteen het mannetje in het
      spel worden. Tot nu toe had ik daar twee aparte demo's voor. De
      tekendemo stuurde een mannetje naar een testscherm (zie
      [de eerste tekendemo](/BAP-BLOG/posts/posts/2026-11-16-krabbel-tekenen-op-de-ipad/)).
      Het Femto-spel liep met een getekende placeholder. Deze keer heb ik ze
      aan elkaar gehangen. Dat ging niet zonder een paar keuzes in de code,
      en die wil ik hier tonen: hoe het was, en hoe het nu is.
  - _template: beeld
    src: /BAP-BLOG/beelden/2026-11-25-ipad-praat-met-femto-spel/03-opstelling-twee-ipads.jpg
    bijschrift: "Links wacht een iPad op START, rechts tekent iemand. Het spel op de laptop wacht"
  - _template: tussentitel
    titel: "Stap 1: van testscherm naar spel"
  - _template: tekst
    tekst: |
      In de tekendemo kreeg elke nieuwe tekening de status `"level"`. Het
      scherm `/level` pikte hem op, liet hem van start naar finish lopen en
      stuurde hem daarna naar `/world`. Dat testscherm was nuttig om te
      bewijzen dat het werkte, maar in de echte installatie is het spel het
      level.

      Daarom kreeg een nieuwe tekening de status `"game"`. Het Femto-spel
      vraagt elke seconde aan de server welke tekeningen wachten:

      ```js
      const url = `${HUB}/api/wobbels?status=game`;
      const data = await (await fetch(url)).json();
      hub.queue = data.wobbels.sort(
        (a, b) => startOf(a) - startOf(b)
      );
      ```

      Is het spel gedaan, dan roept het het bestaande `/finish` aan. Dat zet
      de Krabbel op de status van de wereld, net zoals het testscherm dat
      vroeger deed. Ik moest dus niets nieuws bouwen voor de wereldmuur:

      - **`lock()`** bij de start van een ronde. De Krabbel verandert niet
      meer tijdens het spelen.
      - **`finishCurrent()`** op het einde. De Krabbel gaat naar `/world` en
      de volgende in de rij is aan de beurt.
      - **`unlock()`** als je een ronde stopt met Esc. De Krabbel blijft dan in
      de rij staan en gaat niet verloren.
  - _template: tussentitel
    titel: "Stap 2: één tekencode, niet twee"
  - _template: tekst
    tekst: |
      Het spel moet de Krabbel exact zo tekenen als de iPad. De makkelijke
      weg was de tekencode kopiëren naar het spel. Dan heb je wel twee versies
      die uit elkaar groeien: pas je iets aan op de iPad, dan ziet het spel
      het niet.

      Nu laadt het spel de tekencode rechtstreeks van de server, op dezelfde
      plek waar de iPad ze ook haalt:

      ```js
      await loadScript(`${HUB}/shared/stickers.js`);
      await loadScript(`${HUB}/shared/wobbel.js`);
      ```

      Draait de server nog niet, dan faalt dat stil en probeert de volgende
      poll het opnieuw. Het spel toont dan "Even geduld... Het spel zoekt de
      iPad-hub".
  - _template: beeld
    src: /BAP-BLOG/beelden/2026-11-25-ipad-praat-met-femto-spel/02-spel-wacht-op-ipad.png
    bijschrift: Het spel wacht op een tekening. Zonder hub of Femto-brug blijft het hier staan
  - _template: tekst
    tekst: >-
      **Kanttekening:** het spel zelf is nog niet van ons. Hoe de physics en
      het tekenen op het scherm werken, werd nog gekozen door Claude. Daar zijn
      we nu mee bezig: we bouwen het spel opnieuw op met Phaser, en
      waarschijnlijk met Node.js.
  - _template: tussentitel
    titel: "Probleem 1: de schoolwifi"
  - _template: tekst
    tekst: |
      Eerst opende de iPad `http://<ip-van-de-laptop>:3000/draw`. Dat werkt
      thuis, maar alleen als iPad en laptop op hetzelfde netwerk zitten. Op
      school blokkeert de wifi vaak dat toestellen elkaar zien. Dan vindt de
      iPad de laptop niet, en is de demo voorbij voor ze begint.

      De oplossing: de iPad praat niet meer met de laptop. De tekenpagina
      staat op GitHub Pages, en een tekening gaat als rij naar een tabel
      `krabbels` in Supabase. De hub op de laptop haalt ze daar op. Zo werkt
      het op elk netwerk met internet.

      Het mooie is dat de tekenpagina zelf niet veranderde. Ze roept nog
      altijd `Api.post('/api/wobbels', ...)` aan. Alleen `api.js` kijkt of er
      een `config.js` is, en stuurt de tekening dan naar Supabase:

      ```js
      try {
        await request(base + '/rest/v1/krabbels', {
          method: 'POST',
          body: JSON.stringify({
            client_id: body.clientId,
            data: body,
          }),
        });
      } catch (error) {
        // 409: al binnen, een herhaalde poging
        if (error.status !== 409) throw error;
      }
      ```

      - **De sleutel mag publiek.** Het is een publishable key, en de tabel
      laat alleen toe dat je een rij toevoegt. Lezen of wissen kan niet.
      - **Een 409 is geen fout.** Valt de wifi weg nadat de tekening al
      binnen was, dan probeert de iPad opnieuw. Dezelfde `client_id` geeft
      dan een 409, en dat betekent gewoon: hij was er al.
      - **Zonder `config.js` verandert er niets.** Lokaal testen met de
      Node-server werkt nog zoals vroeger.
  - _template: tussentitel
    titel: "Probleem 2: het spel startte met een oude tekening"
  - _template: tekst
    tekst: |
      Na een refresh van het spel greep het meteen een tekening uit de rij.
      Soms was dat een tekening van een uur eerder. Een kind dat net op de
      iPad zit, zag dan het mannetje van iemand anders lopen.

      Nu onthoudt het spel bij de eerste poll welke tekeningen al wachtten,
      en slaat die over:

      ```js
      if (skipped === null) {
        skipped = new Set(hub.queue.map((w) => w.id));
      }
      const fresh = (w) =>
        !finished.has(w.id) && !skipped.has(w.id);
      ```

      Na een refresh wacht het spel dus altijd op een nieuwe tekening.
  - _template: tussentitel
    titel: "Stap 3: een START-knop en twee kinderen tegelijk"
  - _template: tekst
    tekst: |
      Het spel wist pas dat er een kind was als de tekening al verstuurd was.
      Daarom kreeg de iPad een grote START-knop. Wie erop tikt, krijgt een
      id. De iPad meldt `start` en daarna elke 5 seconden een `ping`. Hoort
      de hub 20 seconden niets meer, dan vergeet hij die iPad.

      Daarmee kon het spel twee dingen beter doen:

      - **Wachten tot iedereen klaar is.** Zolang er nog een kind tekent,
      start er niets. Het spel toont hoeveel kinderen aan het tekenen zijn.
      - **Samen spelen.** Zijn er twee tekeningen klaar, dan lopen beide
      Krabbels samen in het spel. Eén tekening speelt alleen.

      De volgorde is die van de START-knop, niet van het moment dat de
      tekening binnenkwam. Wie eerst begon, speelt eerst, ook al tekent hij
      langer.

      Als laatste werd de Krabbel in het spel groter. Hij is nu 2,6 keer zo
      groot als de oude placeholder, zodat je de tekening op de muur ook echt
      herkent.
  - _template: tussentitel
    titel: "Test: twee iPads tegelijk"
  - _template: tekst
    tekst: >-
      Thuis had ik het al met één iPad getest. Met twee iPads, van tekening tot
      spel tot wereldmuur, nog nooit. Dat heb ik meteen op school
      gedaan: twee iPads, de laptop met het spel en de Femto Bolt ernaast.
      Terwijl de ene iPad nog op START wacht en de andere tekent, toont het
      spel "Je Krabbel wordt getekend...".
  - _template: tekst
    tekst: >-
      Een paar dingen vielen meteen op:


      - **Een ongepaste tekening.** Een medestudent van Devine testte vlug mee, en de
      eerste tekening was meteen ongepast. In het XL-Medialab tekenen
      kinderen, en wat ze tekenen komt groot op de muur. Er moet dus een vorm
      van moderatie tussen de iPad en de muur komen.

      - **De laptops zijn snel leeg.** Dat was heel duidelijk.
      In de installatie moeten de laptops altijd aan de lader hangen.

      - **Klaarzetten kost tijd.** Elke iPad op het internet krijgen, de
      tekenpagina openen en alles juist zetten, was gewoon even werk. Dat
      moet sneller kunnen voor een opstelling die elke dag opnieuw start.
  - _template: beeld
    src: /BAP-BLOG/beelden/2026-11-25-ipad-praat-met-femto-spel/04-ongepaste-tekening-geblurd.jpg
    bijschrift: De tekening is onscherp gemaakt. Zo'n tekening mag nooit op de muur komen
  - _template: tussentitel
    titel: "Wat nu?"
  - _template: tekst
    tekst: >-
      Het geheel werkt met twee iPads, maar nog niet met kinderen. Daar moet
      blijken of de duo-regel klopt: wachten kinderen graag op elkaar, of
      willen ze meteen spelen?


      Daarnaast wil ik een automatische controle onderzoeken. Daar zijn al
      getrainde modellen voor te vinden, maar die heb ik nog niet grondig
      bekeken. Het idee: voldoet een tekening niet, dan krijgt het kind een
      placeholder of een vorige tekening. Zo kan het toch nog spelen. Ik
      kwam hier pas op door de test met een medestudent van Devine.
  - _template: tussentitel
    titel: "Wat neem ik mee?"
  - _template: tekst
    tekst: >-
      De grootste winst zat niet in nieuwe features, maar in de plek waar code
      staat. Eén tekencode die het spel van de server laadt, en één `api.js`
      die beslist waar een tekening heen gaat. Daardoor kon de rest bijna
      hetzelfde blijven.
  - _template: tussentitel
    titel: "Gebruik van AI"
  - _template: tekst
    tekst: >-
      De code is geschreven met Claude Code. Op mijn Mac werden de
      instructies opgesteld, op mijn Windows-pc zijn ze uitgevoerd in beide
      projecten. Ik koos welke weg een tekening aflegt, de START-knop, de duo-regel en de
      volgorde van spelen, en ik heb alles zelf getest.
pubDatetime: 2026-11-25T18:00:00+01:00
draft: false
---
