import { defineConfig } from "astro/config";
import type { AstroIntegration } from "astro";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import netlify from "@astrojs/netlify";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";
import { SITE } from "./src/config";

// TINA_EDITOR=1 builds the TinaCMS editor version of the site (npm run cms, Netlify):
// served from "/" with a server for live editing. Without it: the public static
// site for GitHub Pages under /BAP-BLOG/, exactly as before.
const editor = process.env.TINA_EDITOR === "1";

// Editor-only pages: /bewerk/[file] and the endpoint Tina re-renders through.
const tinaEditorRoutes: AstroIntegration = {
  name: "tina-editor-routes",
  hooks: {
    "astro:config:setup": ({ injectRoute }) => {
      injectRoute({
        pattern: "/bewerk/[file]",
        entrypoint: "./src/tina/bewerk.astro",
        prerender: false,
      });
      injectRoute({
        pattern: "/tina-island/[name]",
        entrypoint: "./src/tina/island-route.ts",
        prerender: false,
      });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  base: editor ? "/" : "/BAP-BLOG/",
  // Editor: Netlify online (Netlify sets NETLIFY=true while building), Node locally.
  ...(editor && {
    adapter: process.env.NETLIFY ? netlify() : node({ mode: "standalone" }),
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    ...(editor ? [tina(), tinaEditorRoutes] : []),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    plugins: editor ? [tinaAdminDevRedirect()] : [],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  // Inline all CSS in each page: GitHub Pages caches HTML for 10 minutes, so after a deploy a
  // cached page could point to a CSS file that no longer exists (unstyled until a refresh).
  build: { inlineStylesheets: "always" },
});
