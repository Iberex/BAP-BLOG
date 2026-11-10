import type { Site } from "./types";

export const SITE: Site = {
  website: "https://iberex.github.io/", // deployed under base /BAP-BLOG/ (see astro.config.ts)
  author: "Team BAP",
  desc: "Procesblog van onze bachelorproef Devine 2026-2027 voor Jeugdfilmfestival Antwerpen (XL-Medialab 2027).",
  title: "BAP-procesblog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 500, // all posts on one page, filtered client-side
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "nl", // html lang code. Set this empty and default will be "en"
  langTag: ["nl-BE"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};
