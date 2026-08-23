export function AffiliateDisclosure() {
  return (
    <div className="mb-10 rounded-md border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400">
      This article contains one or more affiliate links. If you sign up
      through them, PennyWise may earn a commission at no extra cost to you.
      We only recommend products we&apos;d suggest anyway — see our{" "}
      <a href="/about" className="underline underline-offset-2">
        about page
      </a>{" "}
      for how that works.
    </div>
  );
}
