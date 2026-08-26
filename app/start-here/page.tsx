import Link from "next/link";
import {
  Landmark,
  CreditCard,
  Receipt,
  PiggyBank,
  Send,
  TrendingUp,
  Compass,
  type LucideIcon,
} from "lucide-react";

export const metadata = {
  title: "Start Here",
  description:
    "A guided roadmap for your first months of managing money in Canada — banking, credit, taxes, and saving, in order.",
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
    title: "Open a bank account",
    description:
      "Look for a newcomer banking package — usually your fastest, cheapest way in.",
    href: "/banking",
    icon: Landmark,
  },
  {
    step: 2,
    title: "Start building credit",
    description:
      "Your credit history from home doesn't transfer. Start from zero, deliberately.",
    href: "/credit",
    icon: CreditCard,
  },
  {
    step: 3,
    title: "Understand your paycheque and taxes",
    description:
      "Know what's actually being deducted, and file your first return correctly.",
    href: "/taxes",
    icon: Receipt,
  },
  {
    step: 4,
    title: "Start saving and investing",
    description:
      "TFSA first for most newcomers — here's why, and what comes after.",
    href: "/saving-investing",
    icon: PiggyBank,
  },
];

const SITUATIONS: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "New to Canada",
    description: "Just landed and setting up the basics for the first time.",
    href: "/blog/newcomer-banking-what-to-watch-for",
    icon: Compass,
  },
  {
    title: "Building credit",
    description: "Ready to open your first Canadian credit product.",
    href: "/credit",
    icon: CreditCard,
  },
  {
    title: "Starting to invest",
    description: "You've got some savings and want it to actually grow.",
    href: "/saving-investing",
    icon: TrendingUp,
  },
  {
    title: "Sending money home",
    description: "Supporting family abroad without losing money to fees.",
    href: "/blog/sending-money-home-without-losing-it-to-fees",
    icon: Send,
  },
];

export default function StartHerePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Start your Canadian money guide.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Four things to get right first, roughly in order, and a shortcut to
        the topic that matches where you actually are.
      </p>

      <Link
        href="/starter-kit"
        className="group mt-8 flex items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent-soft/60 p-5 transition-colors hover:border-accent dark:bg-accent-soft/20"
      >
        <div>
          <div className="font-semibold text-accent">
            Get the free Canadian Money Starter Kit
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            A downloadable PDF covering everything below, condensed into one
            printable roadmap.
          </p>
        </div>
      </Link>

      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Your first 90 days
        </h2>
        <div className="mt-5 flex flex-col gap-4">
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

      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Or, jump to where you are
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {SITUATIONS.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-xl border border-black/10 p-5 transition-all duration-200 hover:border-accent hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.03]"
            >
              <Icon className="h-5 w-5 text-accent" strokeWidth={2.5} />
              <div className="mt-3 font-semibold group-hover:text-accent">
                {title}
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
