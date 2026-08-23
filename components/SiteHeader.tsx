import Link from "next/link";
import { PiggyBank } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors hover:text-accent"
        >
          <PiggyBank className="h-5 w-5 text-accent" strokeWidth={2.5} />
          PennyWise
        </Link>
        <nav className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="transition-colors hover:text-accent">
            Articles
          </Link>
          <Link href="/about" className="transition-colors hover:text-accent">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
