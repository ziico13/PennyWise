import type { PostMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export function PillarPage({
  title,
  intro,
  posts,
}: {
  title: string;
  intro: string;
  posts: PostMeta[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        {intro}
      </p>

      <section className="mt-10 flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
