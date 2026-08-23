"use client";

import { useMemo, useState } from "react";

// Illustrative only — Ontario, 2024 published rates. Excludes CPP2, Ontario
// surtax, and the Ontario health premium for simplicity. Real payroll
// deductions vary by province, year, and personal credits — see the CRA's
// own calculator (linked below) for an accurate figure.
const FEDERAL_BRACKETS = [
  { upTo: 55867, rate: 0.15 },
  { upTo: 111733, rate: 0.205 },
  { upTo: 173205, rate: 0.26 },
  { upTo: 246752, rate: 0.29 },
  { upTo: Infinity, rate: 0.33 },
];
const FEDERAL_BASIC_PERSONAL_AMOUNT = 15705;

const ONTARIO_BRACKETS = [
  { upTo: 51446, rate: 0.0505 },
  { upTo: 102894, rate: 0.0915 },
  { upTo: 150000, rate: 0.1116 },
  { upTo: 220000, rate: 0.1216 },
  { upTo: Infinity, rate: 0.1316 },
];
const ONTARIO_BASIC_PERSONAL_AMOUNT = 11865;

const CPP_RATE = 0.0595;
const CPP_BASIC_EXEMPTION = 3500;
const CPP_MAX_PENSIONABLE_EARNINGS = 68500;
const CPP_MAX_CONTRIBUTION = 3867.5;

const EI_RATE = 0.0166;
const EI_MAX_INSURABLE_EARNINGS = 63200;
const EI_MAX_CONTRIBUTION = 1049.12;

function progressiveTax(
  income: number,
  brackets: { upTo: number; rate: number }[]
) {
  let tax = 0;
  let lower = 0;
  for (const { upTo, rate } of brackets) {
    if (income <= lower) break;
    const taxableInBracket = Math.min(income, upTo) - lower;
    tax += taxableInBracket * rate;
    lower = upTo;
  }
  return tax;
}

const FREQUENCIES = [
  { label: "Weekly", periodsPerYear: 52 },
  { label: "Biweekly", periodsPerYear: 26 },
  { label: "Semi-monthly", periodsPerYear: 24 },
  { label: "Monthly", periodsPerYear: 12 },
];

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function PaycheckCalculator() {
  const [grossSalary, setGrossSalary] = useState(55000);
  const [frequencyIndex, setFrequencyIndex] = useState(1);

  const result = useMemo(() => {
    const gross = Math.max(0, grossSalary);

    const federalTax = Math.max(
      0,
      progressiveTax(gross, FEDERAL_BRACKETS) -
        FEDERAL_BASIC_PERSONAL_AMOUNT * FEDERAL_BRACKETS[0].rate
    );
    const provincialTax = Math.max(
      0,
      progressiveTax(gross, ONTARIO_BRACKETS) -
        ONTARIO_BASIC_PERSONAL_AMOUNT * ONTARIO_BRACKETS[0].rate
    );

    const pensionableEarnings = Math.max(
      0,
      Math.min(gross, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION
    );
    const cpp = Math.min(
      pensionableEarnings * CPP_RATE,
      CPP_MAX_CONTRIBUTION
    );

    const insurableEarnings = Math.min(gross, EI_MAX_INSURABLE_EARNINGS);
    const ei = Math.min(insurableEarnings * EI_RATE, EI_MAX_CONTRIBUTION);

    const totalDeductions = federalTax + provincialTax + cpp + ei;
    const net = gross - totalDeductions;

    return { federalTax, provincialTax, cpp, ei, totalDeductions, net };
  }, [grossSalary]);

  const periodsPerYear = FREQUENCIES[frequencyIndex].periodsPerYear;

  return (
    <div className="not-prose my-10 rounded-xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold tracking-tight">
        Gross-to-net pay estimator
      </h3>
      <p className="mt-1 text-sm text-zinc-500">
        Illustrative estimate using Ontario, 2024 published tax rates.
        Doesn&apos;t include Ontario&apos;s surtax, health premium, or CPP2 —
        for an exact figure, use the{" "}
        <a
          href="https://www.canada.ca/en/revenue-agency/services/e-services/payroll-deductions-online-calculator.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          CRA&apos;s official payroll calculator
        </a>
        .
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-zinc-500">Annual gross salary</span>
          <input
            type="number"
            min={0}
            step={1000}
            value={grossSalary}
            onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-foreground dark:border-white/10 dark:bg-black"
          />
        </label>

        <label className="block text-sm">
          <span className="text-zinc-500">Pay frequency</span>
          <select
            value={frequencyIndex}
            onChange={(e) => setFrequencyIndex(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-foreground dark:border-white/10 dark:bg-black"
          >
            {FREQUENCIES.map((f, i) => (
              <option key={f.label} value={i}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-accent-soft p-4">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Estimated net pay per {FREQUENCIES[frequencyIndex].label.toLowerCase()} period
        </div>
        <div className="text-3xl font-semibold tracking-tight text-accent">
          {currency.format(result.net / periodsPerYear)}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-zinc-500">Federal tax</dt>
          <dd>{currency.format(result.federalTax)}/yr</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Ontario tax</dt>
          <dd>{currency.format(result.provincialTax)}/yr</dd>
        </div>
        <div>
          <dt className="text-zinc-500">CPP</dt>
          <dd>{currency.format(result.cpp)}/yr</dd>
        </div>
        <div>
          <dt className="text-zinc-500">EI</dt>
          <dd>{currency.format(result.ei)}/yr</dd>
        </div>
      </dl>
    </div>
  );
}
