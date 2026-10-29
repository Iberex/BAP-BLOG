import planning from "../data/planning.json";

export type Item = {
  titel: string;
  start: string; // yyyy-mm-dd
  einde?: string | null;
  tijd?: string | null;
  soort?: string | null;
};

// Pages CMS stores empty fields as "" or null.
export const items = (planning as Item[])
  .filter(item => item.titel && item.start)
  .map(item => ({ ...item, einde: item.einde || item.start }))
  .sort((a, b) => a.start.localeCompare(b.start));

export type AgendaItem = (typeof items)[number];

const DAY = 24 * 60 * 60 * 1000;
const toTime = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const toIso = (time: number) => new Date(time).toISOString().slice(0, 10);

export const soortClass = (soort?: string | null) =>
  `soort-${(soort || "andere").replace(/\s+/g, "-")}`;

export const formatDay = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Date(toTime(iso)).toLocaleDateString("nl-BE", {
    ...options,
    timeZone: "UTC",
  });

export const formatRange = (item: AgendaItem) =>
  item.einde === item.start
    ? formatDay(item.start, {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : `${formatDay(item.start, { day: "numeric", month: "short" })} – ${formatDay(item.einde, { day: "numeric", month: "short" })}`;

// Every month from the first to the last item, each as a grid of weeks starting on Monday.
export const months = () => {
  if (items.length === 0) return [];
  const first = new Date(toTime(items[0].start));
  const last = new Date(Math.max(...items.map(item => toTime(item.einde))));
  const result = [];
  for (
    let y = first.getUTCFullYear(), m = first.getUTCMonth();
    y < last.getUTCFullYear() ||
    (y === last.getUTCFullYear() && m <= last.getUTCMonth());
    m === 11 ? ((m = 0), y++) : m++
  ) {
    const start = Date.UTC(y, m, 1);
    const offset = (new Date(start).getUTCDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    const cells = Math.ceil((offset + daysInMonth) / 7) * 7;
    const days = Array.from({ length: cells }, (_, i) => {
      const iso = toIso(start + (i - offset) * DAY);
      return {
        iso,
        inMonth: i >= offset && i < offset + daysInMonth,
        items: items.filter(item => item.start <= iso && iso <= item.einde),
      };
    });
    const key = `${y}-${String(m + 1).padStart(2, "0")}`;
    result.push({
      key,
      label: formatDay(`${key}-01`, { month: "long", year: "numeric" }),
      days,
      items: items.filter(
        item => item.start.slice(0, 7) <= key && key <= item.einde.slice(0, 7)
      ),
    });
  }
  return result;
};
