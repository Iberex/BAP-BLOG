export function vimeoEmbed(url?: string | null) {
  const match = url?.match(
    /vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?(?:.*[?&]h=(\w+))?/
  );
  if (!match) return null;
  const hash = match[2] ?? match[3];
  return `https://player.vimeo.com/video/${match[1]}${hash ? `?h=${hash}` : ""}`;
}

// A Mux video in the "link" field: a bare playback ID, or any Mux link
// (player.mux.com, stream.mux.com/....m3u8, image.mux.com thumbnail).
// A "time" or "thumbnail-time" in the link picks the poster frame.
export function muxVideo(link?: string | null) {
  const value = link?.trim() ?? "";
  const fromUrl = value.match(
    /(?:player|stream|image)\.mux\.com\/([A-Za-z0-9]+)/
  );
  const playbackId =
    fromUrl?.[1] ?? (/^[A-Za-z0-9]{20,}$/.test(value) ? value : null);
  if (!playbackId) return null;
  const time = value.match(/[?&](?:thumbnail-)?time=([\d.]+)/)?.[1];
  const poster = `https://image.mux.com/${playbackId}/thumbnail.webp${
    time ? `?time=${time}` : ""
  }`;
  return { playbackId, poster };
}
