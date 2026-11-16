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

// Supabase project for the "Uren" page (live timers and hours). Both values are meant to be
// public: visitors can only read, and every change needs the team password (see supabase/uren.sql).
// Find them in Supabase under Project Settings -> API.
export const SUPABASE = {
  url: "https://gbzabbenzkzbodcmcawv.supabase.co",
  key: "sb_publishable_x-9Ea9FUA4n507SbS1kD6g_UiPRI7dO",
};
