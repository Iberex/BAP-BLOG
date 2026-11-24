// Playful counter, not real data: about 100 "bugs" are fixed per week, spread
// randomly over the days. The numbers come from the date, so everyone sees the same.
const START = Date.UTC(2026, 9, 26); // week 1 starts on 26 October 2026
const DAY = 24 * 60 * 60 * 1000;

// Small deterministic hash so a given day always gives the same number.
const hash = (n: number) => {
  let x = Math.imul(n + 1, 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519) >>> 0;
  return (x ^ (x >>> 13)) >>> 0;
};

export const bugs = (date: Date) => {
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.max(0, Math.floor((today - START) / DAY) + 1);
  let opgelost = 0;
  // 7 to 22 per day: average ~14.5, so roughly 100 a week.
  for (let d = 0; d < days; d++) opgelost += 7 + (hash(d) % 16);
  const gevonden = Math.round(opgelost * 1.1) + 4 + (hash(days) % 6);
  return { opgelost, gevonden };
};
