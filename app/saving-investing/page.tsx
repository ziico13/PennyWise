import { getPostsByTags } from "@/lib/posts";
import { PillarPage } from "@/components/PillarPage";

export const metadata = {
  title: "Saving & Investing",
  description:
    "TFSA vs RRSP, building an emergency fund, and getting started with investing as a newcomer to Canada.",
};

export default function SavingInvestingPage() {
  return (
    <PillarPage
      title="Saving & Investing"
      intro="Canada's registered accounts are genuinely useful once you understand them — the trouble is most explanations assume you already know how they work. Here's the newcomer-friendly version."
      posts={getPostsByTags(["saving", "investing"])}
    />
  );
}
