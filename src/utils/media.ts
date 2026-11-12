// TinaCMS saves uploads as "/beelden/x.png"; the site lives under BASE_URL
// ("/BAP-BLOG/" on GitHub Pages, "/" in the editor), so add it in front.
export const mediaSrc = (src?: string | null) => {
  if (!src) return "";
  if (!src.startsWith("/")) return src; // full URL
  const path = src.replace(/^\/BAP-BLOG\//, "/");
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
};
