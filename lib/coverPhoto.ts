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
};

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function getCoverPhotoUrl(tag?: string): Promise<string | null> {
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
    return data.results?.[0]?.urls?.regular ?? null;
  } catch {
    return null;
  }
}
