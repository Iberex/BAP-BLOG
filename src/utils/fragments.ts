import { readFileSync } from "node:fs";
import { SOORTEN } from "./soorten";

// Paragraphs in the text blocks are labelled UX / Design / Development / AI automatically.
// In CI an AI model does this (scripts/tag-paragraphs.mjs, cached in .cache/fragment-tags.json);
// paragraphs it has not seen (e.g. locally) fall back to the keywords below.
// Only used at build time (content config), never in the browser.

let labelled: Record<string, string[]> = {};
try {
  labelled = JSON.parse(readFileSync(".cache/fragment-tags.json", "utf8"));
} catch {
  // No cache yet: keywords only.
}

const KEYWORDS: Record<string, RegExp> = {
  dev: /\b(code|coden|programmeren|astro|javascript|typescript|react|three\.?js|arduino|esp32|raspberry|sensor(en)?|hardware|bug(s)?|deploy(en)?|github|framework|server|api|database|websocket(s)?|unity|touchdesigner|gebouwd|bouwen|technisch(e)?)\b/i,
  ux: /\b(gebruiker(s)?|kinderen|kind|playtest(s)?|test(en|ers)?|getest|flow|ervaring|interactie|begrijp\w*|user(s)?|usability|reageren|reactie(s)?)\b/i,
  design:
    /\b(design|kleur(en)?|typografie|font(s)?|stijl|illustratie(s)?|moodboard|figma|logo|branding|animatie(s)?|visue(el|le)|look and feel)\b/i,
  ai: /\b(ai|chatgpt|gpt|claude|copilot|gemini|midjourney|prompt(s)?)\b/i,
};

// Must match the hash in scripts/tag-paragraphs.mjs.
const hash = (text: string) => {
  let h = 2166136261;
  for (const char of text) h = Math.imul(h ^ char.codePointAt(0)!, 16777619);
  return (h >>> 0).toString(36);
};

export const paragraphs = (text?: unknown) =>
  String(text ?? "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);

export const tagsOf = (paragraph: string) =>
  labelled[hash(paragraph)] ??
  Object.keys(KEYWORDS).filter(tag => KEYWORDS[tag].test(paragraph));

export const fragmentId = (blok: string, index: number) =>
  `fragment-${blok}-${index}`;

type Data = { soort?: string | null; blokken?: Record<string, unknown> | null };

// Every labelled paragraph in the text blocks of a post.
export const fragments = ({ soort, blokken }: Data) =>
  (SOORTEN[soort ?? ""]?.blokken ?? []).flatMap(([key, label]) =>
    paragraphs(blokken?.[key]).flatMap((text, index) => {
      const tags = tagsOf(text);
      return tags.length > 0
        ? [{ id: fragmentId(key, index), label, tags, text }]
        : [];
    })
  );
