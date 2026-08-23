import Link from "next/link";
import { Calculator } from "lucide-react";

export const metadata = {
  title: "Tools",
  description: "Free calculators for newcomers navigating Canadian money.",
};

const TOOLS = [
  {
    href: "/tools/paycheque-calculator",
    title: "Gross-to-net pay calculator",
    description:
      "Estimate your take-home pay by province, after federal and provincial tax, CPP, and EI.",
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Tools
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Free calculators to make Canadian money concepts concrete, not just
        theoretical.
      </p>

      <section className="mt-10 flex flex-col gap-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center gap-4 rounded-xl border border-black/10 p-5 transition-all duration-200 hover:border-accent hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.03]"
          >
            <Calculator
              className="h-6 w-6 shrink-0 text-accent"
              strokeWidth={2}
            />
            <div>
              <div className="font-semibold group-hover:text-accent">
                {tool.title}
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
