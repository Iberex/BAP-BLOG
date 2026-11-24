// Lucide icons as inline SVG strings, for places that render on the server (Astro, Card.tsx).
import lucide from "@iconify-json/lucide/icons.json";

// Icon per pillar, same as in the planning.
export const PIJLER_ICON: Record<string, string> = {
  ux: "layout-template",
  design: "palette",
  dev: "code-xml",
  ai: "sparkles",
};

export const iconSvg = (name: string) => {
  const body = lucide.icons[name as keyof typeof lucide.icons]?.body ?? "";
  return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
};

export const pijlerIconSvg = (key: string) =>
  iconSvg(PIJLER_ICON[key] ?? "pin");
