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
        const pijlers = [data.pijler ?? []].flat().filter(Boolean);
        // Hashtags in the text blocks ("#dev") also make the post findable under that tag.
        const fragmentTags = fragments(data).flatMap(f => f.tags);
        return {
          ...data,
          pijlers,
          fragmentTags: [...new Set(fragmentTags)],
          tags: data.tags ?? [
            ...new Set(
              [...pijlers, data.soort, ...fragmentTags]
                .filter((tag): tag is string => !!tag)
                .map(tag => tag.toLowerCase())
            ),
          ],
          description: data.description ?? (data.samenvatting || data.title),
        };
      }),
});

export const collections = { blog };
