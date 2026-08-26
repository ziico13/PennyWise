import { getPostsByTag } from "@/lib/posts";
import { PillarPage } from "@/components/PillarPage";

export const metadata = {
  title: "Taxes",
  description:
    "Filing your first Canadian tax return, understanding your paycheque, and the benefits newcomers often miss.",
};

export default function TaxesPage() {
  return (
    <PillarPage
      title="Taxes"
      intro="Canadian payroll and tax filing work differently than most newcomers expect. Here's how deductions, returns, and benefit eligibility actually work."
      posts={getPostsByTag("taxes")}
    />
  );
}
