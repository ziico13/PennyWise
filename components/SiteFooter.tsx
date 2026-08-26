import Link from "next/link";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              PennyWise is a free educational resource for newcomers to
              Canada. Nothing here is personalized financial, tax, or
              investment advice.
            </p>
            <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/start-here" className="hover:text-accent">
                Start Here
              </Link>
              <Link href="/tools" className="hover:text-accent">
                Tools
              </Link>
              <Link href="/about" className="hover:text-accent">
                About
              </Link>
            </nav>
            <nav className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
              <Link href="/editorial-policy" className="hover:text-accent">
                Editorial Policy
              </Link>
              <Link href="/disclosure" className="hover:text-accent">
                Disclosure
              </Link>
              <Link href="/disclaimer" className="hover:text-accent">
                Disclaimer
              </Link>
            </nav>
            <p className="mt-4 text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} PennyWise.
            </p>
          </div>
          <div className="sm:w-72">
            <NewsletterSignup compact />
          </div>
        </div>
      </div>
    </footer>
  );
}
