// Every type of post with its own text blocks, in the order they are shown.
// The keys match the "blokken" fields of that type in .pages.yml.
export const SOORTEN: Record<
  string,
  { label: string; blokken: [key: string, label: string][] }
> = {
  weekverslag: {
    label: "Weekverslag",
    blokken: [
      ["voortgang", "Voortgang"],
      ["ux", "UX"],
      ["design", "Design"],
      ["dev", "Development"],
      ["playtest", "Playtest"],
      ["feedback", "Feedback"],
      ["ai", "AI-gebruik"],
      ["volgende", "Volgende stappen"],
    ],
  },
  dagboek: {
    label: "Dagboek",
    blokken: [
      ["gedaan", "Wat deden we?"],
      ["geleerd", "Wat leerden we?"],
      ["vast", "Waar liepen we vast?"],
      ["morgen", "Wat doen we morgen?"],
    ],
  },
  research: {
    label: "Research",
    blokken: [
      ["vraag", "Onderzoeksvraag"],
      ["bronnen", "Bronnen en referenties"],
      ["inzichten", "Inzichten"],
      ["keuze", "Wat doen we ermee?"],
    ],
  },
  experiment: {
    label: "Experiment",
    blokken: [
      ["doel", "Wat wilden we uitproberen?"],
      ["aanpak", "Aanpak"],
      ["resultaat", "Resultaat"],
      ["conclusie", "Conclusie en volgende stap"],
    ],
  },
  playtest: {
    label: "Playtest",
    blokken: [
      ["opzet", "Opzet van de test"],
      ["bevindingen", "Wat zagen we?"],
      ["aanpassingen", "Wat passen we aan?"],
    ],
  },
  feedback: {
    label: "Feedback",
    blokken: [
      ["wat", "Wat was de feedback?"],
      ["reactie", "Wat vinden we ervan?"],
    ],
  },
  meeting: {
    label: "Meeting",
    blokken: [
      ["besproken", "Wat bespraken we?"],
      ["beslissingen", "Beslissingen"],
    ],
  },
  ai: {
    label: "AI-gebruik",
    blokken: [
      ["vraag", "Wat vroegen we?"],
      ["resultaat", "Wat kregen we?"],
      ["kritisch", "Wat klopte niet / wat pasten we aan?"],
    ],
  },
  reflectie: {
    label: "Reflectie",
    blokken: [
      ["onderwerp", "Waarover?"],
      ["goed", "Wat ging goed?"],
      ["beter", "Wat kan beter?"],
      ["anders", "Wat doen we vanaf nu anders?"],
    ],
  },
  algemeen: { label: "Algemeen", blokken: [] },
};
