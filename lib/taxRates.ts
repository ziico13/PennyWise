// Illustrative only — 2024 published federal and provincial/territorial tax
// rates. Excludes CPP2, provincial surtaxes, health premiums, and other
// credits for simplicity. Real payroll deductions vary by year and personal
// circumstances — see the CRA's official payroll calculator for an exact
// figure. Quebec isn't included: it runs a separate system (its own pension
// plan and a federal tax abatement) that doesn't fit this simplified model.

export type Bracket = { upTo: number; rate: number };

export type Province = {
  code: string;
  label: string;
  brackets: Bracket[];
  basicPersonalAmount: number;
};

export const FEDERAL_BRACKETS: Bracket[] = [
  { upTo: 55867, rate: 0.15 },
  { upTo: 111733, rate: 0.205 },
  { upTo: 173205, rate: 0.26 },
  { upTo: 246752, rate: 0.29 },
  { upTo: Infinity, rate: 0.33 },
];
export const FEDERAL_BASIC_PERSONAL_AMOUNT = 15705;

export const PROVINCES: Province[] = [
  {
    code: "ON",
    label: "Ontario",
    brackets: [
      { upTo: 51446, rate: 0.0505 },
      { upTo: 102894, rate: 0.0915 },
      { upTo: 150000, rate: 0.1116 },
      { upTo: 220000, rate: 0.1216 },
      { upTo: Infinity, rate: 0.1316 },
    ],
    basicPersonalAmount: 11865,
  },
  {
    code: "BC",
    label: "British Columbia",
    brackets: [
      { upTo: 47937, rate: 0.0506 },
      { upTo: 95875, rate: 0.077 },
      { upTo: 110076, rate: 0.105 },
      { upTo: 133664, rate: 0.1229 },
      { upTo: 181232, rate: 0.147 },
      { upTo: 252752, rate: 0.168 },
      { upTo: Infinity, rate: 0.205 },
    ],
    basicPersonalAmount: 12580,
  },
  {
    code: "AB",
    label: "Alberta",
    brackets: [
      { upTo: 148269, rate: 0.1 },
      { upTo: 177922, rate: 0.12 },
      { upTo: 237230, rate: 0.13 },
      { upTo: 355845, rate: 0.14 },
      { upTo: Infinity, rate: 0.15 },
    ],
    basicPersonalAmount: 21885,
  },
  {
    code: "MB",
    label: "Manitoba",
    brackets: [
      { upTo: 47000, rate: 0.108 },
      { upTo: 100000, rate: 0.1275 },
      { upTo: Infinity, rate: 0.174 },
    ],
    basicPersonalAmount: 15780,
  },
  {
    code: "SK",
    label: "Saskatchewan",
    brackets: [
      { upTo: 52057, rate: 0.105 },
      { upTo: 148734, rate: 0.125 },
      { upTo: Infinity, rate: 0.145 },
    ],
    basicPersonalAmount: 18491,
  },
  {
    code: "NS",
    label: "Nova Scotia",
    brackets: [
      { upTo: 29590, rate: 0.0879 },
      { upTo: 59180, rate: 0.1495 },
      { upTo: 93000, rate: 0.1667 },
      { upTo: 150000, rate: 0.175 },
      { upTo: Infinity, rate: 0.21 },
    ],
    basicPersonalAmount: 8481,
  },
  {
    code: "NB",
    label: "New Brunswick",
    brackets: [
      { upTo: 49958, rate: 0.094 },
      { upTo: 99916, rate: 0.14 },
      { upTo: 185064, rate: 0.16 },
      { upTo: Infinity, rate: 0.195 },
    ],
    basicPersonalAmount: 13044,
  },
  {
    code: "NL",
    label: "Newfoundland and Labrador",
    brackets: [
      { upTo: 43198, rate: 0.087 },
      { upTo: 86395, rate: 0.145 },
      { upTo: 154244, rate: 0.158 },
      { upTo: 215943, rate: 0.178 },
      { upTo: 275870, rate: 0.198 },
      { upTo: 551739, rate: 0.208 },
      { upTo: 1103478, rate: 0.213 },
      { upTo: Infinity, rate: 0.218 },
    ],
    basicPersonalAmount: 10818,
  },
  {
    code: "PE",
    label: "Prince Edward Island",
    brackets: [
      { upTo: 32656, rate: 0.0965 },
      { upTo: 64313, rate: 0.1363 },
      { upTo: 105000, rate: 0.1665 },
      { upTo: 140000, rate: 0.18 },
      { upTo: Infinity, rate: 0.1875 },
    ],
    basicPersonalAmount: 13500,
  },
  {
    code: "YT",
    label: "Yukon",
    brackets: [
      { upTo: 55867, rate: 0.064 },
      { upTo: 111733, rate: 0.09 },
      { upTo: 173205, rate: 0.109 },
      { upTo: 500000, rate: 0.128 },
      { upTo: Infinity, rate: 0.15 },
    ],
    basicPersonalAmount: 15705,
  },
  {
    code: "NT",
    label: "Northwest Territories",
    brackets: [
      { upTo: 50597, rate: 0.059 },
      { upTo: 101198, rate: 0.086 },
      { upTo: 164525, rate: 0.122 },
      { upTo: Infinity, rate: 0.1405 },
    ],
    basicPersonalAmount: 17373,
  },
  {
    code: "NU",
    label: "Nunavut",
    brackets: [
      { upTo: 53268, rate: 0.04 },
      { upTo: 106537, rate: 0.07 },
      { upTo: 173205, rate: 0.09 },
      { upTo: Infinity, rate: 0.115 },
    ],
    basicPersonalAmount: 18767,
  },
];

export const CPP_RATE = 0.0595;
export const CPP_BASIC_EXEMPTION = 3500;
export const CPP_MAX_PENSIONABLE_EARNINGS = 68500;
export const CPP_MAX_CONTRIBUTION = 3867.5;

export const EI_RATE = 0.0166;
export const EI_MAX_INSURABLE_EARNINGS = 63200;
export const EI_MAX_CONTRIBUTION = 1049.12;

export function progressiveTax(income: number, brackets: Bracket[]) {
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
