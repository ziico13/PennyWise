import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

function formatTagLabel(tag: string) {
  return tag.replace(/-/g, " ");
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  if (!getAllTags().includes(tag)) return {};
  const label = formatTagLabel(tag);
  return {
    title: `${label} articles`,
    description: `PennyWise articles tagged "${label}".`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  if (!getAllTags().includes(tag)) {
    notFound();
  }

  const posts = getPostsByTag(tag);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-zinc-500 hover:text-accent">
        &larr; All articles
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight capitalize sm:text-4xl">
        {formatTagLabel(tag)}
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {posts.length} article{posts.length === 1 ? "" : "s"} tagged &ldquo;
        {formatTagLabel(tag)}&rdquo;.
      </p>

      <section className="mt-10 flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
