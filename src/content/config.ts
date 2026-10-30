import { SITE } from "@config";
import { defineCollection, z } from "astro:content";
import { fragments } from "../utils/fragments";

// Pages CMS stores empty fields as "" or null, so every extra field is optional.
const text = z.string().nullish();
const count = z.number().nullish();

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        author: z.string().default(SITE.author),
        pubDatetime: z.date(),
        modDatetime: z.date().optional().nullable(),
        title: z.string(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
        // One pillar (older posts) or several (a post can combine pillars).
        pijler: z.union([z.string(), z.array(z.string())]).nullish(),
        soort: z.string().optional(),
        samenvatting: text,
        // Text blocks of the post type, see src/utils/soorten.ts.
        blokken: z.record(text).nullish(),
        playtest: z
          .object({ testers: count, groepen: count, leeftijd: text, wat: text })
          .nullish(),
        bron: text, // feedback: from whom, meeting: with whom
        ai: z.object({ tool: text, waarvoor: text }).nullish(),
        actiepunten: text,
        // Pictures uploaded in the CMS, shown as a grid below the text blocks.
        beelden: z
          .array(z.object({ src: text, bijschrift: text }))
          .nullish()
          .transform(list => (list ?? []).filter(beeld => beeld.src)),
        // Files (pdf, slides, ...) uploaded in the CMS, listed as downloads.
        bestanden: z
          .array(z.object({ src: text, naam: text }))
          .nullish()
          .transform(list => (list ?? []).filter(bestand => bestand.src)),
        ogImage: image()
          .refine(img => img.width >= 1200 && img.height >= 630, {
            message: "OpenGraph image must be at least 1200 X 630 pixels!",
          })
          .or(z.string())
          .optional(),
        description: z.string().optional(),
        canonicalURL: z.string().optional(),
      })
      // Pages CMS saves pijler and soort; the site expects tags and a description.
      .transform(data => {
        // "Algemeen" used to be a pillar; it is a type of post now.
        const pijlers = [data.pijler ?? []]
          .flat()
          .filter(p => p && p.toLowerCase() !== "algemeen");
        // Paragraphs about UX, Design, Development or AI, recognised automatically.
        const found = fragments(data);
        // Pillars for the filter: chosen in the CMS, found in the text, or AI for an AI post.
        const onderwerpen = [
          ...new Set([
            ...pijlers.map(p => p.toLowerCase()),
            ...found.flatMap(f => f.tags),
            ...(data.soort === "ai" ? ["ai"] : []),
          ]),
        ];
        return {
          ...data,
          pijlers,
          fragments: found,
          onderwerpen,
          tags: data.tags ?? [
            ...new Set(
              [data.soort, ...onderwerpen]
                .filter((tag): tag is string => !!tag)
                .map(tag => tag.toLowerCase())
            ),
          ],
          description: data.description ?? (data.samenvatting || data.title),
        };
      }),
});

export const collections = { blog };
