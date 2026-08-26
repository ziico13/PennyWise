import Link from "next/link";
import {
  Home,
  PiggyBank,
  Landmark,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export const metadata = {
  title: "Grow What You've Built",
  description:
    "A guide for settled immigrants moving past the first year — buying a home, catching up on retirement savings, and investing beyond the basics.",
};

const ROADMAP: {
  step: number;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    step: 1,
    title: "Buy your first home",
    description:
      "What the mortgage payment doesn't include — closing costs, land transfer tax, and first-time buyer programs.",
    href: "/blog/buying-your-first-home-in-canada",
    icon: Home,
  },
  {
    step: 2,
    title: "Catch up on your RRSP",
    description:
      "Room builds slowly in your early years. Here's how to use it well once you have it.",
    href: "/blog/rrsp-catch-up-contribution-room",
    icon: PiggyBank,
  },
  {
    step: 3,
    title: "Understand your CPP and OAS",
    description:
      "Arriving partway through your career changes what you'll actually receive at retirement.",
    href: "/blog/cpp-oas-immigrated-partway-through-career",
    icon: Landmark,
  },
  {
    step: 4,
    title: "Invest beyond your TFSA",
    description:
      "Once your registered accounts are maxed, here's what a non-registered account actually involves.",
    href: "/blog/investing-beyond-your-tfsa",
    icon: TrendingUp,
  },
];

export default function SettledPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Grow what you&apos;ve built in Canada.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        The first-year basics are behind you. Here&apos;s what tends to matter
        next — a home, retirement, and investing beyond the accounts you
        started with.
      </p>

      <section className="mt-14">
        <div className="flex flex-col gap-4">
          {ROADMAP.map(({ step, title, description, href, icon: Icon }) => (
            <Link
              key={step}
              href={href}
              className="group flex items-start gap-4 rounded-xl border border-black/10 p-5 transition-all duration-200 hover:border-accent hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.03]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                {step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 font-semibold group-hover:text-accent">
                  <Icon className="h-4 w-4 text-accent" strokeWidth={2.5} />
                  {title}
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
