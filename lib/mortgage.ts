// Illustrative only. Canadian fixed mortgage rates compound semi-annually
// by law (unlike the US); variable-rate mortgages aren't subject to that
// rule and compound monthly instead, since the rate can change with the
// lender's prime rate at any time — both are fixed structural facts, not
// rates that change yearly. CMHC premium tiers and minimum down payment
// rules are published federal figures current as of 2024 and can change —
// see CMHC's own site for the authoritative numbers. Doesn't include
// property tax, home/condo insurance, or land transfer tax.

export type RateType = "fixed" | "variable";

export const PAYMENT_FREQUENCIES = [
  { label: "Monthly", paymentsPerYear: 12, accelerated: false },
  { label: "Biweekly", paymentsPerYear: 26, accelerated: false },
  { label: "Accelerated biweekly", paymentsPerYear: 26, accelerated: true },
  { label: "Weekly", paymentsPerYear: 52, accelerated: false },
  { label: "Accelerated weekly", paymentsPerYear: 52, accelerated: true },
] as const;

export function minimumDownPayment(homePrice: number) {
  if (homePrice <= 500000) return homePrice * 0.05;
  if (homePrice < 1500000) return 500000 * 0.05 + (homePrice - 500000) * 0.1;
  return homePrice * 0.2;
}

export function cmhcPremiumRate(downPaymentPct: number) {
  if (downPaymentPct >= 0.2) return 0;
  if (downPaymentPct >= 0.15) return 0.028;
  if (downPaymentPct >= 0.1) return 0.031;
  if (downPaymentPct >= 0.05) return 0.04;
  return null; // below the legal minimum, not insurable
}

// Effective per-payment rate from a nominal annual rate. Fixed mortgages
// compound semi-annually by law; variable mortgages compound monthly.
function periodRateFromNominal(
  nominalAnnualRate: number,
  paymentsPerYear: number,
  rateType: RateType
) {
  if (rateType === "variable") {
    const monthlyRate = nominalAnnualRate / 12;
    const effectiveAnnualRate = (1 + monthlyRate) ** 12 - 1;
    return (1 + effectiveAnnualRate) ** (1 / paymentsPerYear) - 1;
  }
  const semiAnnualRate = nominalAnnualRate / 2;
  const effectiveAnnualRate = (1 + semiAnnualRate) ** 2 - 1;
  return (1 + effectiveAnnualRate) ** (1 / paymentsPerYear) - 1;
}

export function calculatePayment(
  principal: number,
  nominalAnnualRate: number,
  amortizationYears: number,
  paymentsPerYear: number,
  rateType: RateType = "fixed"
) {
  const periodRate = periodRateFromNominal(
    nominalAnnualRate,
    paymentsPerYear,
    rateType
  );
  const numPayments = amortizationYears * paymentsPerYear;
  if (periodRate === 0) return principal / numPayments;
  return (
    (principal * periodRate) / (1 - (1 + periodRate) ** -numPayments)
  );
}
