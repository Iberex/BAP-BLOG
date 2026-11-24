---
title: "Nieuw tijdperk: planning en projectmanagement"
author: Ibe
soort:
  - reflectie
  - algemeen
pijler:
  - UX
  - DESIGN
  - DEV
samenvatting: >-
  Coachmoment 3 bij Jynse was een kantelpunt. Onze blog en planning waren snel
  in elkaar gezet en leefden los van elkaar. Daarna maakten we zelf keuzes voor
  de planning, de uren en de stijl van de hele site. Hier staat elke keuze, met
  de reden erbij.
taak: "Blog en planning professioneler"
pubDatetime: 2026-11-24T18:00:00+01:00
draft: false
inhoud:
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/11-home-nu.jpg
  - _template: tussentitel
    titel: "Hoe het was"
  - _template: tekst
    tekst: >-
      De eerste weken lag onze focus volledig op Krabbels zelf: de gebaren, de
      Femto Bolt, de iPad-demo, de mascotte. Het projectmanagement liep er een
      beetje naast.


      De blog had ik in het begin gemaakt, snel en met een template, omdat het
      moest. We zagen hem toen vooral als iets voor school, niet als een plek
      waar je je keuzes toont. De planning had Senne gemaakt, in zijn eigen
      repo, ook snel. Allebei grotendeels door AI uitgespuugd, zonder dat een
      van ons er echt voor gekozen had. Over de blog en de planning samen was
      weinig overleg: de blog was "van Ibe", de planning "van Senne".
  - _template: tussentitel
    titel: "Coachmoment 3: het kantelpunt"
  - _template: tekst
    tekst: >-
      Op het derde coachmoment met Jynse kwam dat op tafel. Senne nam notities
      en schreef er een eigen post over:
      [Coachmoment 3 met Jynse](/BAP-BLOG/posts/posts/2026-11-24-coachmoment-3-jynse/).
      Bovenaan staat groot: **blogposts professioneler, met planning en
      uren**. Rechts, in grote letters: **Planning!** en het testmoment.


      Dat was het moment om te stoppen met snel snel. Ik had de blog gemaakt,
      dus ik nam de planning en de uren mee. Alles op één plek, in één stijl,
      en van ons drie.
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/01-notities-coachmoment.jpg
  - _template: tussentitel
    titel: "De planning: het belangrijkste"
  - _template: tekst
    tekst: >-
      De oude planning was een lijst per week die je moest openklappen. Hij was
      eigenlijk een beetje gevibecoded, zonder er echt over na te denken hoe we
      hem zouden gebruiken. Je zag moeilijk in één oogopslag hoe lang iets duurt
      en wie waaraan werkt.
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/02-planning-voor.jpg
  - _template: citaat
    citaat: >-
      Een betere planning is maar de helft. De andere helft is dat wij hem
      blijven bijwerken. Anders zijn we over een paar weken geen stap verder.
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/03-planning-nu.jpg
  - _template: vraag
    vraag: "Waarom een database?"
    tekst: >-
      Senne zijn repo → ons eigen bestand in Pages CMS → een database.


      De planning stond als `tasks.json` in Senne zijn eigen repo. Eerst haalden
      we hem naar een eigen bestand (`planning.json`) in
      ![](/BAP-BLOG/beelden/nieuw-tijdperk/25-pages-cms-logo.png) **Pages
      CMS**, hetzelfde CMS als voor de blog. Dat bleef een omweg via de repo.
      Nu zit hij in een **database (Supabase)**: aanpassen gebeurt op de site
      zelf en iedereen ziet het meteen.
  - _template: vraag
    vraag: "Waarom een eigen code in plaats van accounts?"
    tekst: >-
      De blog is openbaar, dus niet iedereen mag de planning aanpassen. Accounts
      en wachtwoorden zijn te veel gedoe voor drie mensen. Een eigen code per
      teamlid is genoeg.
  - _template: vraag
    vraag: "Waarom een tijdlijn?"
    tekst: >-
      Een lijst toont wat er moet gebeuren, een tijdlijn ook **hoe lang** en
      **door wie**. Het is een bestaand patroon: planners als Timely werken zo.
      Elke taak is een balk die zo lang is als de taak duurt, met een rij per
      persoon en een rij "Iedereen" voor gedeelde taken. Standaard zie je 3
      weken, en 1 week om in te zoomen.
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/20-planning-1-week.jpg
  - _template: vraag
    vraag: "Wat staat er in een balk?"
    tekst: >-
      Een balk toont alleen een icoon en de naam. Past de naam niet, dan blijft
      alleen het icoon over. De rest (datums, soort, status) staat in een
      kaartje bij hover. Dat kaartje was eerst doorzichtig, waardoor je de balk
      erachter meelas. Nu is het wit.
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/21-planning-popover.jpg
  - _template: vraag
    vraag: "Waarom is de lijst gebleven?"
    tekst: >-
      We hielden de lijst naast de tijdlijn. Voor wie liever per week alle taken
      onder elkaar ziet, is dat rustiger. Oude weken zijn dichtgeklapt.
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/22-planning-lijst.jpg
  - _template: tussentitel
    titel: "Kleur, emoji of icoon?"
  - _template: tekst
    tekst: >-
      Dit was de keuze waar we het langst over twijfelden. We wilden in één
      oogopslag zien **wat voor soort werk** een taak is.


      **Kleur per pijler → emoji → icon library.**


      **1. Kleur per pijler.** Groen voor development, roze voor design, blauw
      voor UX, grijs voor algemeen. Zo deed de oude planning het. Het werd snel
      druk, en we hadden kleur nodig voor iets anders: de status. →


      **2. Emoji** (💻 🎨 🧠 📌 🚩 💬). Snel en vriendelijk, maar ze zien er op
      elk toestel anders uit, hebben eigen felle kleuren en botsten met de
      rustige zwart-witte stijl. Het was mijn eigen keuze, maar ik merkte snel
      dat het te veel AI overkwam. →


      **3. Een icon library.** We kozen **Lucide**, via `astro-icon`: één
      lijnstijl, overal dezelfde set, in de planning, op de blogkaartjes en in
      de filters. Zo doen bestaande apps het ook. Slack gebruikt emoji voor
      reacties en status, maar de interface bestaat grotendeels uit lijniconen.
      Voor UX hadden we eerst een muispijl. Die leek te veel op je eigen muis,
      dus werd het een wireframe.
  - _template: vraag
    vraag: "Waar ging de kleur naartoe?"
    tekst: >-
      Omdat kleur nu vrij was, werd de **status** een patroon: een lege balk is
      te doen, diagonale strepen zijn bezig, grijs is klaar. De enige kleur die
      overblijft is **rood, voor deadlines**. We haalden dat even weg, maar
      deadlines moeten opvallen. Is een deadline klaar, dan wordt ze ook grijs.
  - _template: tussentitel
    titel: "Eén stijl voor de hele site"
  - _template: tekst
    tekst: >-
      Wat we hiervoor hadden was grotendeels door AI uitgespuugd, ook qua stijl
      en weergave. Blog, planning en uren zagen eruit alsof ze van
      verschillende mensen kwamen.


      Het is nu nog altijd vibe coding: AI bouwt mee, maar wij sturen met kennis
      van de grote richtlijnen. Het verschil is dat we nu zelf snel keuzes
      maakten, in plaats van te nemen wat eruit kwam. Twee sites waren onze
      inspiratie: **Jana Elst** voor de rust, een grote cover per post en een
      duidelijke titel, en **Nithin Warrier** voor het gevoel van papier met een
      fijn raster. Dat is ook een kleine knipoog naar ons concept: Krabbels gaat
      over tekenen.
  - _template: galerij
    beelden:
      - src: /BAP-BLOG/beelden/nieuw-tijdperk/30-inspiratie-jana.jpg
      - src: /BAP-BLOG/beelden/nieuw-tijdperk/31-inspiratie-nithin.jpg
  - _template: tekst
    tekst: >-
      Wat we ervan maakten, en waarom:


      - **Papier met een lichtblauw raster:** warm in plaats van kaal wit.

      - **Een grijze afgeronde navigatie:** met losse pillen leek het te veel op
        Jana. Nu is de pagina waar je bent een wit blokje.
  - _template: tussentitel
    titel: "De blog zelf"
  - _template: tekst
    tekst: >-
      De filter bovenaan bestond uit twee rijen gekleurde pillen. Dat werden twee
      rustige knoppen, **Soort** en **Onderwerp**, met een menu met iconen:
      minder kleur, meer ruimte voor de posts.


      Voor we het rasterdesign toevoegden, las een post prima. Met het raster
      achter de tekst niet meer: het liep door onder de woorden en maakte lezen
      vermoeiend. Daarom voegden we een **witte achtergrond** toe: elke post
      staat nu op een wit blad. De tekst blijft een smalle kolom die goed leest,
      de beelden mogen breder dan de tekst. Ook nieuw: een post kan meer dan één
      soort hebben. Deze is tegelijk een reflectie en een algemene post.
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/12-blog-voor.jpg
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/13-blog-nu.jpg
  - _template: galerij
    beelden:
      - src: /BAP-BLOG/beelden/nieuw-tijdperk/14-post-voor.jpg
      - src: /BAP-BLOG/beelden/nieuw-tijdperk/15-post-nu.jpg
  - _template: tussentitel
    titel: "Uren"
  - _template: tekst
    tekst: >-
      We houden onze uren bij in Toggl, ieder in een eigen account. Dat bleef
      zo. De site toont alleen wat Toggl doorgeeft: wie nu aan het werk is en
      hoeveel uur iedereen per dag had. Wie werkt krijgt een blauwe stip, zoals
      je dat van Slack kent. De week is een raster waarin een vakje donkerder
      wordt naarmate je langer werkte.
  - _template: galerij
    beelden:
      - src: /BAP-BLOG/beelden/nieuw-tijdperk/16-uren-voor.jpg
      - src: /BAP-BLOG/beelden/nieuw-tijdperk/04-uren-nu.jpg
  - _template: tussentitel
    titel: "Team"
  - _template: tekst
    tekst: >-
      De teampagina namen we in het begin niet al te serieus. Er stonden
      stickers in plaats van onze gezichten, een korte bio en een kleurrand.
      Leuk bedoeld, maar niet professioneel voor een bachelorproef. Nu staan er
      drie echte foto's met naam en rol. Wie wat doet staat in de planning. Het
      is een tussenstap.
  - _template: galerij
    beelden:
      - src: /BAP-BLOG/beelden/nieuw-tijdperk/05-team-voor.jpg
      - src: /BAP-BLOG/beelden/nieuw-tijdperk/06-team-nu.jpg
  - _template: tussentitel
    titel: "Een speelse startpagina"
  - _template: tekst
    tekst: >-
      Op de startpagina mocht het speelser. Onder de titel staan vier cijfers
      die optellen: de projectweek, het aantal posts, hoeveel keer we nog moeten
      slapen tot de jury, met kleine zzz die opstijgen, en een teller met bugs.
      Die laatste is geen echte bugtracker maar een knipoog.
  - _template: beeld
    src: /BAP-BLOG/beelden/nieuw-tijdperk/10-home-voor.jpg
  - _template: tussentitel
    titel: "Wat nu"
  - _template: actiepunten
    punten:
      - "Planning, uren en blog blijven bijwerken. Dit serieus nemen maakt het verschil."
      - "Een tekstje over jezelf voor de teampagina: een reflectie op wat je tot nu toe voor Krabbels deed, en wat je er nog in wil doen."
---
