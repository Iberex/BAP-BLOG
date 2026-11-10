export function vimeoEmbed(url?: string | null) {
  const match = url?.match(
    /vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?(?:.*[?&]h=(\w+))?/
  );
  if (!match) return null;
  const hash = match[2] ?? match[3];
  return `https://player.vimeo.com/video/${match[1]}${hash ? `?h=${hash}` : ""}`;
}
