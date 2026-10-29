import { slugifyStr } from "./slugify";

// The three pillars from the briefing, plus "algemeen" for posts about the project as a whole.
export const PIJLERS = [
  { key: "ux", label: "UX" },
  { key: "design", label: "Design" },
  { key: "dev", label: "Development" },
  { key: "algemeen", label: "Algemeen" },
] as const;

export const pijlerLabel = (value: string) =>
  PIJLERS.find(p => p.key === slugifyStr(value))?.label ?? value;

// Week 1 of the bachelor project starts on Monday 26 October 2026.
const START = Date.UTC(2026, 9, 26);
const DAY = 24 * 60 * 60 * 1000;

export const bapWeek = (date: Date) =>
  Math.floor((date.getTime() - START) / (7 * DAY)) + 1;

export const weekRange = (week: number) => {
  const format = (time: number) =>
    new Date(time).toLocaleDateString("nl-BE", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
  const monday = START + (week - 1) * 7 * DAY;
  return `${format(monday)} – ${format(monday + 6 * DAY)}`;
};

// Planning dates are free text ("vr 20/11", "9/11 – 13/11", "21/01/2027").
// Returns the first date as yyyy-mm-dd, or undefined when there is none (e.g. "week 1").
export const planningDate = (text: string) => {
  const match = text.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
  if (!match) return undefined;
  const [, day, month, year] = match;
  const y = year ?? (Number(month) >= 9 ? "2026" : "2027");
  return `${y}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
