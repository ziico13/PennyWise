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
      </div>
    </div>
  );
}
