import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

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
        ogImage: image()
          .refine(img => img.width >= 1200 && img.height >= 630, {
            message: "OpenGraph image must be at least 1200 X 630 pixels!",
          })
          .or(z.string())
          .optional(),
        description: z.string().optional(),
        canonicalURL: z.string().optional(),
      })
      // Pages CMS saves pijler + soort; the site expects tags and a description.
      .transform(data => ({
        ...data,
        tags:
          data.tags ??
          [data.pijler, data.soort].filter((tag): tag is string => !!tag),
        description: data.description ?? data.title,
      })),
});

export const collections = { blog };
