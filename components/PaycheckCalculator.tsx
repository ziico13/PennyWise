"use client";

import { useMemo, useState } from "react";
import {
  FEDERAL_BRACKETS,
  FEDERAL_BASIC_PERSONAL_AMOUNT,
  PROVINCES,
  CPP_RATE,
  CPP_BASIC_EXEMPTION,
  CPP_MAX_PENSIONABLE_EARNINGS,
  CPP_MAX_CONTRIBUTION,
  EI_RATE,
  EI_MAX_INSURABLE_EARNINGS,
  EI_MAX_CONTRIBUTION,
  progressiveTax,
} from "@/lib/taxRates";

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
  const [provinceIndex, setProvinceIndex] = useState(0);

  const province = PROVINCES[provinceIndex];

  const result = useMemo(() => {
    const gross = Math.max(0, grossSalary);

    const federalTax = Math.max(
      0,
      progressiveTax(gross, FEDERAL_BRACKETS) -
        FEDERAL_BASIC_PERSONAL_AMOUNT * FEDERAL_BRACKETS[0].rate
    );
    const provincialTax = Math.max(
      0,
      progressiveTax(gross, province.brackets) -
        province.basicPersonalAmount * province.brackets[0].rate
    );

    const pensionableEarnings = Math.max(
      0,
      Math.min(gross, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION
    );
    const cpp = Math.min(pensionableEarnings * CPP_RATE, CPP_MAX_CONTRIBUTION);

    const insurableEarnings = Math.min(gross, EI_MAX_INSURABLE_EARNINGS);
    const ei = Math.min(insurableEarnings * EI_RATE, EI_MAX_CONTRIBUTION);

    const totalDeductions = federalTax + provincialTax + cpp + ei;
    const net = gross - totalDeductions;

    return { federalTax, provincialTax, cpp, ei, totalDeductions, net };
  }, [grossSalary, province]);

  const periodsPerYear = FREQUENCIES[frequencyIndex].periodsPerYear;

  return (
    <div className="not-prose rounded-xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold tracking-tight">
        Gross-to-net pay estimator
      </h3>
      <p className="mt-1 text-sm text-zinc-500">
        Illustrative estimate using 2024 published federal and provincial tax
        rates. Doesn&apos;t include provincial surtaxes, health premiums, or
        CPP2 — for an exact figure, use the{" "}
        <a
          href="https://www.canada.ca/en/revenue-agency/services/e-services/payroll-deductions-online-calculator.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          CRA&apos;s official payroll calculator
        </a>
        . Quebec isn&apos;t included — it runs a separate tax and pension
        system that doesn&apos;t fit this simplified model.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
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
          <span className="text-zinc-500">Province or territory</span>
          <select
            value={provinceIndex}
            onChange={(e) => setProvinceIndex(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-foreground dark:border-white/10 dark:bg-black"
          >
            {PROVINCES.map((p, i) => (
              <option key={p.code} value={i}>
                {p.label}
              </option>
            ))}
          </select>
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
          Estimated net pay per {FREQUENCIES[frequencyIndex].label.toLowerCase()} period in {province.label}
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
          <dt className="text-zinc-500">{province.label} tax</dt>
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
