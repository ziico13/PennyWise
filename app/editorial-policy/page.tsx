export const metadata = {
  title: "Editorial Policy",
  description: "How PennyWise researches, writes, and updates its articles.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Editorial Policy
      </h1>
      <div className="prose prose-zinc dark:prose-invert mt-6 max-w-none">
        <p>
          PennyWise is written and maintained by one person, not an editorial
          team — worth knowing upfront so you can weigh the advice
          accordingly. Every article is written to explain how a system or
          rule actually works, based on publicly available sources: government
          publications (CRA, IRCC, provincial regulators), the terms and rate
          sheets of financial institutions, and standard practice as
          documented by consumer-protection bodies.
        </p>
        <p>
          Articles are written in plain language on purpose. Where a rule has
          exceptions or genuinely depends on your specific situation, the
          article says so rather than flattening it into a false absolute.
        </p>
        <h2>How accuracy is maintained</h2>
        <p>
          Rules around taxes, benefits, and financial products change —
          sometimes yearly. Articles are reviewed periodically for accuracy,
          and updated in place when something changes, rather than left to go
          stale. Where an article has been substantively updated since it was
          first published, that&apos;s noted on the article itself.
        </p>
        <h2>What this site doesn&apos;t do</h2>
        <p>
          PennyWise doesn&apos;t publish sponsored content written by outside
          companies, and doesn&apos;t let a business relationship change what
          an article says — see the{" "}
          <a href="/disclosure" className="underline underline-offset-2">
            Disclosure Policy
          </a>{" "}
          for how that boundary works in practice.
        </p>
      </div>
    </div>
  );
}
