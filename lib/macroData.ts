const FRED_API_KEY = process.env.FRED_API_KEY;
const FRED_BASE = "https://api.stlouisfed.org/fred/series/observations";

export type MacroStat = {
  label: string;
  value: string;
  asOf: string;
  live: boolean;
  sourceUrl: string;
};

async function fetchFredLatest(
  seriesId: string,
  units: "lin" | "pc1"
): Promise<{ value: number; date: string } | null> {
  if (!FRED_API_KEY) return null;

  try {
    const url = `${FRED_BASE}?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&units=${units}&limit=5`;
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 12 } });
    if (!res.ok) return null;
    const data = await res.json();
    const observations: { date: string; value: string }[] = data.observations ?? [];
    // FRED marks missing data as "." — walk back until we find a real number.
    const latest = observations.find((o) => o.value !== ".");
    if (!latest) return null;
    return { value: parseFloat(latest.value), date: latest.date };
  } catch {
    return null;
  }
}

function formatDailyDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// FRED's monthly series (CPI) return the 1st of the month as the observation
// date — show just the month, since a day-of-month there would misleadingly
// imply more precision than a monthly release actually has.
function formatMonthlyDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

// Nigeria has no public API for its monthly CPI release — NBS publishes it
// as a report, not a feed. Update this manually alongside the weekly market
// outlook research. Verified against https://nairametrics.com/2026/08/17/nigerias-headline-inflation-falls-to-15-43-in-july/ (NBS-sourced) on 2026-08-26.
const NIGERIA_INFLATION = {
  value: "15.43%",
  asOf: "July 2026",
  sourceUrl: "https://www.nigerianstat.gov.ng/",
};

export async function getMacroSnapshot(): Promise<MacroStat[]> {
  const [wti, brent, usCpi, caCpi] = await Promise.all([
    fetchFredLatest("DCOILWTICO", "lin"),
    fetchFredLatest("DCOILBRENTEU", "lin"),
    fetchFredLatest("CPIAUCSL", "pc1"),
    fetchFredLatest("CANCPIALLMINMEI", "pc1"),
  ]);

  const stats: MacroStat[] = [];

  if (wti) {
    stats.push({
      label: "WTI Crude",
      value: `$${wti.value.toFixed(2)}`,
      asOf: formatDailyDate(wti.date),
      live: true,
      sourceUrl: "https://fred.stlouisfed.org/series/DCOILWTICO",
    });
  }
  if (brent) {
    stats.push({
      label: "Brent Crude",
      value: `$${brent.value.toFixed(2)}`,
      asOf: formatDailyDate(brent.date),
      live: true,
      sourceUrl: "https://fred.stlouisfed.org/series/DCOILBRENTEU",
    });
  }
  if (usCpi) {
    stats.push({
      label: "US Inflation",
      value: `${usCpi.value.toFixed(1)}%`,
      asOf: formatMonthlyDate(usCpi.date),
      live: true,
      sourceUrl: "https://fred.stlouisfed.org/series/CPIAUCSL",
    });
  }
  if (caCpi) {
    stats.push({
      label: "Canada Inflation",
      value: `${caCpi.value.toFixed(1)}%`,
      asOf: formatMonthlyDate(caCpi.date),
      live: true,
      sourceUrl: "https://fred.stlouisfed.org/series/CANCPIALLMINMEI",
    });
  }

  stats.push({
    label: "Nigeria Inflation",
    value: NIGERIA_INFLATION.value,
    asOf: NIGERIA_INFLATION.asOf,
    live: false,
    sourceUrl: NIGERIA_INFLATION.sourceUrl,
  });

  return stats;
}
