const FORM_ACTION = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ACTION;

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  if (!FORM_ACTION) return null;

  return (
    <div
      className={
        compact
          ? "rounded-xl border border-black/10 bg-accent-soft/60 p-5 dark:border-white/10 dark:bg-accent-soft/20"
          : "rounded-xl border border-black/10 bg-accent-soft/60 p-6 dark:border-white/10 dark:bg-accent-soft/20"
      }
    >
      <h3 className="font-semibold tracking-tight">
        Get new articles by email
      </h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        One practical article at a time. No spam, unsubscribe anytime.
      </p>
      <form
        action={FORM_ACTION}
        method="post"
        className="mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor="email_address" className="sr-only">
          Email address
        </label>
        <input
          id="email_address"
          type="email"
          name="email_address"
          required
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent dark:border-white/10 dark:bg-black"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
