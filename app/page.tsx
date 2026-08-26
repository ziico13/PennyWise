import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Financial guidance for your new life in Canada.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Practical, plain-language articles on credit, banking, taxes, and
          money — written for immigrants navigating the Canadian financial
          system for the first time.
        </p>
      </section>

      <Link
        href="/start-here"
        className="group mb-14 flex items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent-soft/60 p-6 transition-colors hover:border-accent dark:bg-accent-soft/20"
      >
        <div>
          <div className="font-semibold text-accent">
            New here? Start with the roadmap.
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            The four things to get right first, and a shortcut to your
            situation.
          </p>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
      </Link>

      <section>
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Latest articles
        </h2>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
