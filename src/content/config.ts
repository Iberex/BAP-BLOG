import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

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
        pijler: z.string().optional(),
        soort: z.string().optional(),
        samenvatting: text,
        olr: z.array(z.string()).nullish(),
        week: z
          .object({
            voortgang: text,
            ux: text,
            design: text,
            dev: text,
            playtest: text,
            feedback: text,
            ai: text,
            volgende: text,
          })
          .nullish(),
        playtest: z
          .object({
            testers: count,
            groepen: count,
            leeftijd: text,
            wat: text,
            bevindingen: text,
          })
          .nullish(),
        feedback: z.object({ bron: text, actiepunten: text }).nullish(),
        ai: z.object({ tool: text, waarvoor: text, kritisch: text }).nullish(),
        ogImage: image()
          .refine(img => img.width >= 1200 && img.height >= 630, {
            message: "OpenGraph image must be at least 1200 X 630 pixels!",
          })
          .or(z.string())
          .optional(),
        description: z.string().optional(),
        canonicalURL: z.string().optional(),
      })
      // Pages CMS saves pijler, soort and olr; the site expects tags and a description.
      .transform(data => ({
        ...data,
        tags:
          data.tags ??
          [data.pijler, data.soort, ...(data.olr ?? [])].filter(
            (tag): tag is string => !!tag
          ),
        description: data.description ?? (data.samenvatting || data.title),
      })),
});

export const collections = { blog };
