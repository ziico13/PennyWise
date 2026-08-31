import { getMacroSnapshot } from "@/lib/macroData";

export async function MacroSnapshot() {
  const stats = await getMacroSnapshot();
  const hasLiveData = stats.some((s) => s.live);

  // If FRED_API_KEY isn't set, only the manual Nigeria figure would show —
  // not worth rendering a whole widget for one static number.
  if (!hasLiveData) return null;

  return (
    <section className="mb-14">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Macro snapshot
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group rounded-xl border border-black/10 p-4 transition-colors hover:border-accent dark:border-white/10"
          >
            <div className="text-xs text-zinc-500">{stat.label}</div>
            <div className="mt-1 font-mono text-lg font-semibold tabular-nums group-hover:text-accent">
              {stat.value}
            </div>
            <div className="mt-1 text-[11px] text-zinc-400">
              {stat.live ? "Live" : "Manual"} · {stat.asOf}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
