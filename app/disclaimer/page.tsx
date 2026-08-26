export const metadata = {
  title: "Financial Disclaimer",
  description:
    "PennyWise publishes general financial education, not personalized advice.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Financial Disclaimer
      </h1>
      <div className="prose prose-zinc dark:prose-invert mt-6 max-w-none">
        <p>
          PennyWise publishes general financial education for newcomers to
          Canada. Nothing on this site is personalized financial, tax,
          investment, immigration, or legal advice, and reading an article
          here doesn&apos;t create an advisory relationship of any kind.
        </p>
        <p>
          Rules discussed here — tax brackets, benefit thresholds, program
          eligibility, interest rates, and similar figures — change over
          time, and can vary by province, by financial institution, and by
          your specific circumstances. Articles aim to explain how things
          work in general, not to give you the exact numbers for your
          situation.
        </p>
        <p>
          Before making a decision that matters — filing a tax return with
          unusual circumstances, taking on debt, signing up for a financial
          product, or anything involving significant money — verify the
          specifics against an official source (CRA, IRCC, your financial
          institution) or a licensed professional who knows your full
          situation.
        </p>
      </div>
    </div>
  );
}
