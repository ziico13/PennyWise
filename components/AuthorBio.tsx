import Image from "next/image";

export function AuthorBio() {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-black/10 p-5 dark:border-white/10">
      <Image
        src="/images/isaac-ogunleye.jpg"
        alt="Isaac A. Ogunleye"
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover"
      />
      <div>
        <div className="font-semibold">Isaac A. Ogunleye</div>
        <p className="text-sm text-zinc-500">Chartered Accountant</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Isaac is a Chartered Accountant with over ten years of experience
          across the manufacturing, mining, and financial services sectors,
          with the bulk of that experience in financial services. He started
          PennyWise to make Canadian banking, credit, and tax rules easier to
          understand for newcomers building a financial life here.
        </p>
      </div>
    </div>
  );
}
