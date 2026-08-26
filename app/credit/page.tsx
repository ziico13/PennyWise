import { getPostsByTag } from "@/lib/posts";
import { PillarPage } from "@/components/PillarPage";

export const metadata = {
  title: "Credit",
  description:
    "Building Canadian credit from zero, understanding your score, and using credit products without paying for the privilege.",
};

export default function CreditPage() {
  return (
    <PillarPage
      title="Credit"
      intro="Credit history doesn't transfer across borders. Here's how to build a Canadian credit file from nothing, and use it well once you have one."
      posts={getPostsByTag("credit")}
    />
  );
}
