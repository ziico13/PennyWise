import { getPostsByTag } from "@/lib/posts";
import { PillarPage } from "@/components/PillarPage";

export const metadata = {
  title: "Banking",
  description:
    "Chequing accounts, newcomer packages, fees, and how to pick a Canadian bank as a newcomer.",
};

export default function BankingPage() {
  return (
    <PillarPage
      title="Banking"
      intro="Everything about opening and using a Canadian bank account — newcomer packages, what's actually worth signing up for, and what to watch for once the promotional period ends."
      posts={getPostsByTag("banking")}
    />
  );
}
