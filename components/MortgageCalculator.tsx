"use client";

import { useMemo, useState } from "react";
import {
  PAYMENT_FREQUENCIES,
  minimumDownPayment,
  cmhcPremiumRate,
  calculatePayment,
  type RateType,
} from "@/lib/mortgage";

const AMORTIZATIONS = [15, 20, 25, 30];

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

const currencyPrecise = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 2,
});

const percent = new Intl.NumberFormat("en-CA", {
  style: "percent",
  maximumFractionDigits: 1,
});

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(600000);
  const [downPayment, setDownPayment] = useState(60000);
  const [rateType, setRateType] = useState<RateType>("fixed");
  const [rate, setRate] = useState(5.49);
  const [amortization, setAmortization] = useState(25);
  const [frequencyIndex, setFrequencyIndex] = useState(0);

  const result = useMemo(() => {
    const price = Math.max(0, homePrice);
    const down = Math.max(0, Math.min(downPayment, price));
    const downPct = price > 0 ? down / price : 0;
    const minDown = minimumDownPayment(price);
    const belowMinimum = down < minDown;

    const premiumRate = cmhcPremiumRate(downPct);
    const baseLoan = price - down;
    const cmhcPremium =
      premiumRate !== null ? baseLoan * premiumRate : 0;
    const insuranceRequired = downPct < 0.2;
    const principal = baseLoan + (insuranceRequired ? cmhcPremium : 0);

    const monthlyPayment = calculatePayment(
      principal,
      rate / 100,
      amortization,
      12,
      rateType
    );

    const freq = PAYMENT_FREQUENCIES[frequencyIndex];
    const payment = freq.accelerated
      ? monthlyPayment / (freq.paymentsPerYear === 26 ? 2 : 4)
      : calculatePayment(
          principal,
          rate / 100,
          amortization,
          freq.paymentsPerYear,
          rateType
        );

    const totalPaid = payment * freq.paymentsPerYear * amortization;
    const totalInterest = totalPaid - principal;

    return {
      downPct,
      minDown,
      belowMinimum,
      insuranceRequired,
      premiumRate,
      cmhcPremium,
      principal,
      payment,
      totalInterest,
      totalPaid,
    };
  }, [homePrice, downPayment, rateType, rate, amortization, frequencyIndex]);

  const freq = PAYMENT_FREQUENCIES[frequencyIndex];

  return (
    <div className="not-prose rounded-xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold tracking-tight">
        Mortgage payment estimator
      </h3>
      <p className="mt-1 text-sm text-zinc-500">
        Illustrative estimate. Fixed-rate mortgages compound semi-annually by
        law in Canada; variable-rate mortgages compound monthly instead,
        since the rate can change with the lender&apos;s prime rate. Also
        uses published CMHC insurance tiers and minimum down payment rules.
        Doesn&apos;t include property tax, home/condo insurance, or land
        transfer tax — for exact figures, see{" "}
        <a
          href="https://www.cmhc-schl.gc.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          CMHC&apos;s own tools
        </a>
        .
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-zinc-500">Home price</span>
          <input
            type="number"
            min={0}
            step={5000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-foreground dark:border-white/10 dark:bg-black"
          />
        </label>

        <label className="block text-sm">
          <span className="text-zinc-500">
            Down payment ({percent.format(result.downPct)})
          </span>
          <input
            type="number"
            min={0}
            step={1000}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-foreground dark:border-white/10 dark:bg-black"
          />
        </label>

        <div className="block text-sm">
          <span className="text-zinc-500">Rate type</span>
          <div className="mt-1 grid grid-cols-2 gap-1 rounded-md border border-black/10 p-1 dark:border-white/10">
            {(["fixed", "variable"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setRateType(type)}
                className={`rounded px-3 py-1.5 text-sm capitalize transition-colors ${
                  rateType === type
                    ? "bg-accent text-white"
                    : "text-zinc-500 hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <label className="block text-sm">
          <span className="text-zinc-500">
            Interest rate (annual, %)
            {rateType === "variable" && " — e.g. prime − 0.5%"}
          </span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-foreground dark:border-white/10 dark:bg-black"
          />
        </label>

        <label className="block text-sm">
          <span className="text-zinc-500">Amortization</span>
          <select
            value={amortization}
            onChange={(e) => setAmortization(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-foreground dark:border-white/10 dark:bg-black"
          >
            {AMORTIZATIONS.map((years) => (
              <option key={years} value={years}>
                {years} years
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="text-zinc-500">Payment frequency</span>
          <select
            value={frequencyIndex}
            onChange={(e) => setFrequencyIndex(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-foreground dark:border-white/10 dark:bg-black"
          >
            {PAYMENT_FREQUENCIES.map((f, i) => (
              <option key={f.label} value={i}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result.belowMinimum && (
        <p className="mt-4 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
          This down payment is below Canada&apos;s minimum of{" "}
          {currency.format(result.minDown)} for a {currency.format(homePrice)}{" "}
          home — a lender won&apos;t approve this as entered.
        </p>
      )}

      {rateType === "variable" && (
        <p className="mt-4 rounded-md bg-black/5 px-3 py-2 text-sm text-zinc-600 dark:bg-white/5 dark:text-zinc-400">
          With a variable rate, this payment can change as your lender&apos;s
          prime rate moves. If your payment stays fixed while prime rises
          enough, you can hit your mortgage&apos;s &ldquo;trigger
          rate&rdquo;, the point where the payment no longer covers even the
          interest — ask your lender how they handle that before choosing
          variable.
        </p>
      )}

      <div className="mt-6 rounded-lg bg-accent-soft p-4">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Estimated {freq.label.toLowerCase()} payment
        </div>
        <div className="text-3xl font-semibold tracking-tight text-accent">
          {currencyPrecise.format(result.payment)}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-zinc-500">Mortgage principal</dt>
          <dd>{currency.format(result.principal)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">CMHC premium</dt>
          <dd>
            {result.premiumRate === null
              ? "Not insurable"
              : result.insuranceRequired
                ? currency.format(result.cmhcPremium)
                : "Not required"}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">Total interest</dt>
          <dd>{currency.format(result.totalInterest)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Total cost</dt>
          <dd>{currency.format(result.totalPaid)}</dd>
        </div>
      </dl>
    </div>
  );
}
