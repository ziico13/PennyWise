const TAG_QUERIES: Record<string, string> = {
  credit: "credit card",
  banking: "bank building architecture",
  taxes: "tax documents paperwork",
  saving: "piggy bank savings",
  investing: "stock market chart",
  income: "paycheck payday",
  remittances: "money transfer wire",
  safety: "security shield",
  housing: "apartment building canada",
  insurance: "insurance umbrella rain",
  family: "family home canada",
  settled: "canadian suburb house garden",
  markets: "stock exchange trading floor",
  "market-outlook": "financial newspaper weekly review",
};

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const APP_NAME = "pennywise";

export type CoverPhoto = {
  url: string;
  photographerName: string;
  photographerLink: string;
  photoLink: string;
};

export async function getCoverPhoto(tag?: string): Promise<CoverPhoto | null> {
  if (!ACCESS_KEY) return null;

  const query = (tag && TAG_QUERIES[tag]) || "canada finance";

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        next: { revalidate: 60 * 60 * 24 * 7 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const photo = data.results?.[0];
    if (!photo) return null;

    if (photo.links?.download_location) {
      fetch(photo.links.download_location, {
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      }).catch(() => {});
    }

    return {
      url: photo.urls?.regular,
      photographerName: photo.user?.name ?? "Unknown",
      photographerLink: `${photo.user?.links?.html}?utm_source=${APP_NAME}&utm_medium=referral`,
      photoLink: `${photo.links?.html}?utm_source=${APP_NAME}&utm_medium=referral`,
    };
  } catch {
    return null;
  }
}
