export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-zinc-500 dark:text-zinc-500">
        <p>
          PennyWise is a free educational resource for newcomers to Canada.
          Nothing here is personalized financial, tax, or investment advice.
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} PennyWise.
        </p>
      </div>
    </footer>
  );
}
