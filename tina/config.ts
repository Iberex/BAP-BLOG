import { defineConfig } from "tinacms";

// TinaCMS: visual editor for the new block-based posts (src/content/blog/posts).
// Older posts and home/team stay in Pages CMS (.pages.yml) for now.
export default defineConfig({
  branch: "main",
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "BAP-BLOG",
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
          // Tina adds build.basePath ("/BAP-BLOG") in front of this URL itself.
          router: ({ document }) => `/posts/posts/${document._sys.filename}/`,
        },
        fields: [
          { name: "title", label: "Titel", type: "string", isTitle: true, required: true },
          { name: "pubDatetime", label: "Datum", type: "datetime", required: true },
          { name: "draft", label: "Nog niet publiceren", type: "boolean" },
          { name: "body", label: "Tekst", type: "rich-text", isBody: true },
        ],
      },
    ],
  },
});
