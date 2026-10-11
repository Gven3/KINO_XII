const RECENT_KEY = "kinoxii_recently_viewed";
const MAX_RECENT = 10;

function read(): string[] {
  try {
    const slugs: unknown = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(slugs)
      ? slugs.filter((s) => typeof s === "string")
      : [];
  } catch {
    return [];
  }
}

export const recentlyViewed = {
  get: read,
  // Newest first; viewing a film again moves it to the front.
  add: (slug: string) => {
    const slugs = [slug, ...read().filter((s) => s !== slug)];
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify(slugs.slice(0, MAX_RECENT)),
    );
  },
};
