import { defineConfig, type Template } from "tinacms";
import { SOORTEN } from "../src/utils/soorten";

// TinaCMS: visual editor for the new block-based posts (src/content/blog/posts).
// Older posts and home/team stay in Pages CMS (.pages.yml) for now.
// Every block has one fixed look (src/components/blokken/); writers choose
// which blocks they use and in which order, not colours or fonts.

// The fixed questions of every type of post, offered in the "Vraag" block.
const vragen = [
  ...new Set(Object.values(SOORTEN).flatMap(s => s.blokken.map(([, l]) => l))),
];

const blokken: Template[] = [
  {
    name: "tussentitel",
    label: "Tussentitel",
    ui: { defaultItem: { titel: "Nieuwe tussentitel" } },
    fields: [{ name: "titel", label: "Tussentitel", type: "string" }],
  },
  {
    name: "tekst",
    label: "Tekst",
    fields: [{ name: "tekst", label: "Tekst", type: "rich-text" }],
  },
  {
    name: "vraag",
    label: "Vraag + antwoord",
    fields: [
      { name: "vraag", label: "Vraag", type: "string", options: vragen },
      { name: "tekst", label: "Antwoord", type: "rich-text" },
    ],
  },
  {
    name: "beeld",
    label: "Beeld",
    fields: [
      { name: "src", label: "Beeld", type: "image" },
      { name: "bijschrift", label: "Bijschrift (wat zie je?)", type: "string" },
    ],
  },
  {
    name: "galerij",
    label: "Galerij (meerdere beelden)",
    fields: [
      {
        name: "beelden",
        label: "Beelden",
        type: "object",
        list: true,
        ui: { itemProps: item => ({ label: item?.bijschrift || "Beeld" }) },
        fields: [
          { name: "src", label: "Beeld", type: "image" },
          { name: "bijschrift", label: "Bijschrift", type: "string" },
        ],
      },
    ],
  },
  {
    name: "video",
    label: "Video",
    fields: [
      { name: "link", label: "Vimeo- of Mux-link", type: "string" },
      { name: "titel", label: "Titel (wat zie je?)", type: "string" },
    ],
  },
  {
    name: "bestand",
    label: "Bestand (pdf, presentatie)",
    fields: [
      { name: "src", label: "Bestand", type: "image" },
      { name: "naam", label: "Naam (wat is het?)", type: "string" },
    ],
  },
  {
    name: "citaat",
    label: "Citaat",
    fields: [
      { name: "citaat", label: "Citaat", type: "string", ui: { component: "textarea" } },
      { name: "wie", label: "Van wie?", type: "string" },
    ],
  },
  {
    name: "cijfers",
    label: "Cijfers (playtest)",
    fields: [
      { name: "testers", label: "Aantal testers", type: "number" },
      { name: "groepen", label: "Aantal groepen", type: "number" },
      { name: "leeftijd", label: "Leeftijd (bv. 6-9 jaar)", type: "string" },
      { name: "wat", label: "Wat testten we?", type: "string" },
    ],
  },
  {
    name: "actiepunten",
    label: "Actiepunten",
    fields: [{ name: "punten", label: "Actiepunt", type: "string", list: true }],
  },
];

export default defineConfig({
  branch: "main",
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: { mediaRoot: "beelden", publicFolder: "public" },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/blog/posts",
        format: "md",
        ui: {
          // The editor version of the site (TINA_EDITOR=1) shows posts live on /bewerk/.
          router: ({ document }) => `/bewerk/${document._sys.filename}`,
          filename: {
            slugify: values =>
              `${new Date().toISOString().slice(0, 10)}-${(values?.title || "post")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[̀-ͯ]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`,
          },
          defaultItem: () => ({
            pubDatetime: new Date().toISOString(),
            draft: true,
            inhoud: [{ _template: "tekst" }],
          }),
        },
        fields: [
          { name: "title", label: "Titel", type: "string", isTitle: true, required: true },
          {
            name: "author",
            label: "Wie schrijft?",
            type: "string",
            options: ["Ibe", "Tjorven", "Senne"],
          },
          {
            name: "soort",
            label: "Soort post",
            type: "string",
            options: Object.entries(SOORTEN).map(([value, s]) => ({
              value,
              label: s.label,
            })),
          },
          {
            name: "pijler",
            label: "Pijler(s)",
            type: "string",
            list: true,
            options: ["UX", "DESIGN", "DEV"],
          },
          {
            name: "samenvatting",
            label: "Samenvatting (1-2 zinnen, komt bovenaan)",
            type: "string",
            ui: { component: "textarea" },
          },
          {
            name: "inhoud",
            label: "Inhoud",
            type: "object",
            list: true,
            templates: blokken,
          },
          { name: "pubDatetime", label: "Datum", type: "datetime", required: true },
          { name: "draft", label: "Nog niet publiceren", type: "boolean" },
        ],
      },
    ],
  },
});
