import Link from "next/link";
import { Calculator } from "lucide-react";

export function ToolCallout({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="not-prose group flex items-center gap-4 rounded-xl border border-black/10 bg-accent-soft p-5 no-underline transition-colors hover:border-accent dark:border-white/10"
    >
      <Calculator className="h-6 w-6 shrink-0 text-accent" strokeWidth={2} />
      <div>
        <div className="font-semibold text-foreground group-hover:text-accent">
          {title}
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </Link>
  );
}
