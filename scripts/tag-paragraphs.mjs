// Lets an AI model decide which paragraphs of the text blocks are about UX, Design,
// Development or AI. Uses Google Gemini when the GEMINI_API_KEY secret is set (free tier),
// otherwise GitHub Models with the workflow's GITHUB_TOKEN.
// Results are cached per paragraph in .cache/fragment-tags.json, so each paragraph is
// only sent once. Without a token (e.g. locally) this script does nothing and the site
// falls back to keywords (src/utils/fragments.ts).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

const GEMINI = process.env.GEMINI_API_KEY;
const TOKEN = GEMINI || process.env.GITHUB_TOKEN;
// Both offer the same OpenAI-style chat API.
const API = GEMINI
  ? {
      url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      model: "gemini-3.8-flash",
    }
  : {
      url: "https://models.github.ai/inference/chat/completions",
      model: "openai/gpt-4.1-mini",
    };
const CACHE = ".cache/fragment-tags.json";
const BLOG = "src/content/blog";
const TAGS = ["ux", "design", "dev", "ai"];

// Same hash and paragraph split as src/utils/fragments.ts.
const hash = text => {
  let h = 2166136261;
  for (const char of text) h = Math.imul(h ^ char.codePointAt(0), 16777619);
  return (h >>> 0).toString(36);
};
const paragraphs = text =>
  String(text ?? "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);

const PROMPT = `Je labelt alinea's uit de procesblog van een Devine-bachelorproef: drie studenten maken een interactieve, audiovisuele multiplayer-installatie voor kinderen (6-12 jaar) op een jeugdfilmfestival.
Geef per alinea de onderwerpen waar ze echt over gaat:
- "ux": de ervaring van de gebruikers (kinderen, klant, testers), playtests, interactie, flow, begrijpbaarheid, feedback van gebruikers.
- "design": hoe het eruitziet of klinkt: stijl, kleur, typografie, illustratie, animatie, branding, visuele keuzes.
- "dev": technisch bouwen: code, frameworks, hardware, sensoren, prototypes bouwen, deployen, tools.
- "ai": het gebruik van AI-tools (ChatGPT, Claude, Copilot, ...).
Kies alleen een onderwerp als de alinea er duidelijk over gaat. Een alinea mag meerdere of geen onderwerpen hebben. Iets bouwen is "dev"; wat gebruikers ermee doen is "ux".
Antwoord enkel met JSON: {"1": ["dev"], "2": [], ...}.`;

async function classify(texts) {
  const response = await fetch(API.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: API.model,
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: PROMPT },
          {
            role: "user",
            content: texts.map((text, i) => `${i + 1}. ${text}`).join("\n\n"),
          },
        ],
      }),
  });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  const answer = JSON.parse((await response.json()).choices[0].message.content);
  return texts.map((_, i) =>
    (answer[i + 1] ?? []).filter(tag => TAGS.includes(tag))
  );
}

// Busy models answer 429/503 or drop the connection now and then; wait and try again.
async function withRetry(job) {
  for (const wait of [5, 20, 60]) {
    try {
      return await job();
    } catch (error) {
      // A wrong request (400, 401, 404) will not get better by waiting.
      if (/^4(?!29)\d\d/.test(error.message)) throw error;
      console.warn(`tag-paragraphs: busy, retrying in ${wait}s`);
      await new Promise(resolve => setTimeout(resolve, wait * 1000));
    }
  }
  return job();
}

const files = readdirSync(BLOG, { recursive: true }).filter(file =>
  String(file).endsWith(".md")
);

let cache = {};
try {
  cache = JSON.parse(readFileSync(CACHE, "utf8"));
} catch {}

const todo = new Set();
for (const file of files) {
  const source = readFileSync(join(BLOG, String(file)), "utf8");
  const frontmatter = yaml.load(source.split(/^---$/m)[1] ?? "") ?? {};
  for (const text of Object.values(frontmatter.blokken ?? {}))
    for (const paragraph of paragraphs(text))
      if (!(hash(paragraph) in cache)) todo.add(paragraph);
}

if (!TOKEN) {
  console.log("tag-paragraphs: no API key or token, using keywords");
} else if (todo.size > 0) {
  // Small batches keep each request well within the free limits.
  const list = [...todo];
  let done = 0;
  for (let i = 0; i < list.length; i += 20) {
    const batch = list.slice(i, i + 20);
    try {
      const tags = await withRetry(() => classify(batch));
      batch.forEach((text, j) => (cache[hash(text)] = tags[j]));
      done += batch.length;
    } catch (error) {
      console.warn(`tag-paragraphs: model failed, using keywords (${error.message})`);
      break;
    }
  }
  console.log(`tag-paragraphs: labelled ${done} of ${todo.size} new paragraph(s)`);
}

mkdirSync(".cache", { recursive: true });
writeFileSync(CACHE, JSON.stringify(cache, null, 2));
