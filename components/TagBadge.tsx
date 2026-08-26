import Link from "next/link";
import {
  CreditCard,
  Landmark,
  Receipt,
  PiggyBank,
  TrendingUp,
  Wallet,
  Send,
  ShieldAlert,
  Compass,
  Home,
  Umbrella,
  Sprout,
  type LucideIcon,
} from "lucide-react";

const TAG_ICONS: Record<string, LucideIcon> = {
  credit: CreditCard,
  banking: Landmark,
  taxes: Receipt,
  saving: PiggyBank,
  investing: TrendingUp,
  income: Wallet,
  remittances: Send,
  safety: ShieldAlert,
  housing: Home,
  insurance: Umbrella,
  settled: Sprout,
  newcomers: Compass,
};

export function TagBadge({ tag }: { tag: string }) {
  const Icon = TAG_ICONS[tag] ?? Compass;
  return (
    <Link
      href={`/tags/${tag}`}
      className="relative z-10 inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-white"
    >
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {tag}
    </Link>
  );
}
