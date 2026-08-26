import { UserRound } from "lucide-react";

export function AuthorBio() {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-black/10 p-5 dark:border-white/10">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        <UserRound className="h-5 w-5" strokeWidth={2} />
      </div>
      <div>
        <div className="font-semibold">Isaac A. Ogunleye</div>
        <p className="text-sm text-zinc-500">Chartered Accountant</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Isaac is a Chartered Accountant with over ten years of experience
          across the manufacturing, mining, and financial services sectors,
          with the bulk of that experience in financial services. He started
          PennyWise to make Canadian banking, credit, and tax rules easier to
          understand for newcomers building a financial life here.
        </p>
      </div>
    </div>
  );
}
