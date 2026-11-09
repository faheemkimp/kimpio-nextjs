/** YouTube video id from youtu.be/ID, youtube.com/shorts/ID, /embed/ID or watch?v=ID; null for anything else (e.g. an .mp4). */
export function youTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com")) {
      const [, kind, id] = u.pathname.split("/");
      if ((kind === "shorts" || kind === "embed") && id) return id;
      return u.searchParams.get("v");
    }
  } catch {
    /* not a URL */
  }
  return null;
}

/** Privacy-enhanced embed URL that starts playing when the player opens. */
export const youTubeEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
