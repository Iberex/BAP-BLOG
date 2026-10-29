import { slugifyStr } from "./slugify";

// The three pillars from the briefing, plus "algemeen" for posts about the project as a whole.
export const PIJLERS = [
  { key: "ux", label: "UX" },
  { key: "design", label: "Design" },
  { key: "dev", label: "Development" },
  { key: "ai", label: "AI" },
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
