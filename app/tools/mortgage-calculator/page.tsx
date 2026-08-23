import Link from "next/link";
import { MortgageCalculator } from "@/components/MortgageCalculator";

export const metadata = {
  title: "Mortgage Payment Calculator",
  description:
    "Estimate your Canadian mortgage payment, including CMHC insurance if your down payment is under 20%.",
};

export default function MortgageCalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/tools" className="text-sm text-zinc-500 hover:text-accent">
        &larr; All tools
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Mortgage payment calculator
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Estimate your payment by home price, down payment, rate, and
        amortization — including CMHC insurance if your down payment is
        under 20%.
      </p>

      <div className="mt-10">
        <MortgageCalculator />
      </div>
    </div>
  );
}
