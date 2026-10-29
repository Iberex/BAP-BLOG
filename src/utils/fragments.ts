import { SOORTEN } from "./soorten";

// Hashtags a writer can put in a text block, e.g. "#dev" or "#ai".
// Each one maps to a pillar or post type, so filters can find that paragraph.
const TAGS: Record<string, string> = {
  ux: "ux",
  design: "design",
  dev: "dev",
  development: "dev",
  algemeen: "algemeen",
  ...Object.fromEntries(Object.keys(SOORTEN).map(key => [key, key])),
};

const HASHTAG = /(^|\s)#([a-zA-Z]+)\b/g;

export const paragraphs = (text?: string | null) =>
  (text ?? "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);

export const tagsIn = (paragraph: string) => [
  ...new Set(
    [...paragraph.matchAll(HASHTAG)]
      .map(([, , word]) => TAGS[word.toLowerCase()])
      .filter(Boolean)
  ),
];

// The paragraph without its known hashtags (unknown ones like "#1" stay).
export const withoutTags = (paragraph: string) =>
  paragraph
    .replace(HASHTAG, (match, space, word) =>
      TAGS[word.toLowerCase()] ? space : match
    )
    .replace(/\s{2,}/g, " ")
    .trim();

export const fragmentId = (blok: string, index: number) =>
  `fragment-${blok}-${index}`;

type Data = { soort?: string | null; blokken?: Record<string, unknown> | null };

// Every tagged paragraph in the text blocks of a post.
export const fragments = ({ soort, blokken }: Data) =>
  (SOORTEN[soort ?? ""]?.blokken ?? []).flatMap(([key, label]) =>
    paragraphs(blokken?.[key] as string | null).flatMap((paragraph, index) => {
      const tags = tagsIn(paragraph);
      return tags.length > 0
        ? [
            {
              id: fragmentId(key, index),
              label,
              tags,
              text: withoutTags(paragraph),
            },
          ]
        : [];
    })
  );
