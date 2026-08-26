"use client";

import { useState } from "react";
import Link from "next/link";
import { PiggyBank, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/start-here", label: "Start Here" },
  { href: "/banking", label: "Banking" },
  { href: "/credit", label: "Credit" },
  { href: "/taxes", label: "Taxes" },
  { href: "/saving-investing", label: "Saving & Investing" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors hover:text-accent"
          onClick={() => setOpen(false)}
        >
          <PiggyBank className="h-5 w-5 text-accent" strokeWidth={2.5} />
          PennyWise
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-zinc-600 dark:text-zinc-400 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-black/[0.05] dark:text-zinc-400 dark:hover:bg-white/[0.05] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-black/10 px-6 py-4 dark:border-white/10 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-black/[0.05] hover:text-accent dark:text-zinc-400 dark:hover:bg-white/[0.05]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
