import Link from "next/link";
import { PaycheckCalculator } from "@/components/PaycheckCalculator";

export const metadata = {
  title: "Gross-to-Net Pay Calculator",
  description:
    "Estimate your Canadian take-home pay by province, after federal and provincial tax, CPP, and EI.",
};

export default function PaycheckCalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/tools"
        className="text-sm text-zinc-500 hover:text-accent"
      >
        &larr; All tools
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Gross-to-net pay calculator
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        See roughly what lands in your account after federal tax, provincial
        tax, CPP, and EI — pick your province and pay frequency below.
      </p>

      <div className="mt-10">
        <PaycheckCalculator />
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Want the context behind these deductions? Read{" "}
        <Link
          href="/blog/understanding-your-first-paycheque"
          className="underline underline-offset-2 hover:text-accent"
        >
          Understanding Your First Canadian Paycheque
        </Link>
        .
      </p>
    </div>
  );
}
