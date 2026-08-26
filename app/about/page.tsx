import { AuthorBio } from "@/components/AuthorBio";

export const metadata = {
  title: "About",
  description: "What PennyWise is and who it's for.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="prose prose-zinc dark:prose-invert mt-6 max-w-none">
        <p>
          PennyWise exists for one reason: figuring out money in a new
          country is harder than it should be. Credit history doesn&apos;t
          transfer. Bank products are unfamiliar. Tax season brings forms
          nobody explained. And a lot of the financial advice online assumes
          you grew up in the system it&apos;s describing.
        </p>
        <p>
          This site publishes short, practical articles written specifically
          for immigrants building a financial life in Canada — building
          credit from zero, understanding newcomer banking offers, filing a
          first tax return, and the everyday decisions that come with
          settling in.
        </p>
        <p>
          Nothing here is personalized financial, tax, or investment advice.
          It&apos;s a starting point for understanding how things work, not a
          substitute for advice from a licensed professional who knows your
          specific situation.
        </p>
        <h2>How this site makes money</h2>
        <p>
          Some articles include links to financial products &mdash; credit
          cards, banking, or money transfer services &mdash; that pay
          PennyWise a commission if you sign up through them, at no extra
          cost to you. Any article that does this says so clearly near the
          top. We only link to products we&apos;d genuinely recommend to a
          newcomer regardless of the commission, and a company paying us
          never changes what we say about it.
        </p>
      </div>

      <div className="mt-10 not-prose">
        <AuthorBio />
      </div>
    </div>
  );
}
