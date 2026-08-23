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
  newcomers: Compass,
};

export function TagBadge({ tag }: { tag: string }) {
  const Icon = TAG_ICONS[tag] ?? Compass;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {tag}
    </span>
  );
}
