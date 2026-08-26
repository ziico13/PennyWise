import { Download, CheckCircle2 } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "The Canadian Money Starter Kit",
  description:
    "A free downloadable guide covering your first bank account, first credit card, first paycheque, first tax return, and a first-year financial checklist.",
};

const SECTIONS = [
  "Your first bank account — picking a newcomer package that's actually worth it",
  "Your first credit card — building a Canadian credit file from zero",
  "Your first paycheque — what's actually being deducted, and why",
  "Your first tax return — filing correctly, even with minimal income",
  "A first-year financial checklist tying it all together",
];

export default function StarterKitPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Free guide
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        The Canadian Money Starter Kit
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        A short, practical PDF covering the five things worth getting right
        in your first 90 days in Canada — condensed from the full articles
        into one printable roadmap.
      </p>

      <a
        href="/downloads/canadian-money-starter-kit.pdf"
        download
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
      >
        <Download className="h-4 w-4" />
        Download the free PDF
      </a>

      <div className="mt-12 flex flex-col gap-3">
        {SECTIONS.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              strokeWidth={2}
            />
            <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <NewsletterSignup />
      </div>
    </div>
  );
}
