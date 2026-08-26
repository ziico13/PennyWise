export const metadata = {
  title: "Disclosure Policy",
  description:
    "How PennyWise makes money, and how that's kept separate from what articles recommend.",
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Disclosure Policy
      </h1>
      <div className="prose prose-zinc dark:prose-invert mt-6 max-w-none">
        <p>
          Some articles on PennyWise contain affiliate links — to credit
          cards, bank accounts, or money-transfer services. If you sign up
          through one of those links, PennyWise may earn a commission, at no
          extra cost to you.
        </p>
        <h2>The rule this site follows</h2>
        <p>
          An article only links to a product if it&apos;s something that
          would genuinely be recommended to a newcomer in that situation,
          regardless of whether it pays a commission. A company paying for a
          placement doesn&apos;t change what the article says about it, and a
          company is never given the chance to review or approve an article
          before it&apos;s published.
        </p>
        <h2>How to tell when this applies</h2>
        <p>
          Any article that includes affiliate links says so clearly near the
          top, before you get to the recommendation itself — not buried in a
          footer disclaimer you&apos;d have to go looking for.
        </p>
        <p>
          This site currently has no sponsorship or advertising
          relationships beyond individual affiliate links disclosed this way.
          If that changes, this page will be updated to reflect it.
        </p>
      </div>
    </div>
  );
}
