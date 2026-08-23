import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Financial guidance for your new life in Canada.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Practical, plain-language articles on credit, banking, taxes, and
          money — written for immigrants navigating the Canadian financial
          system for the first time.
        </p>
      </section>

      <section className="flex flex-col gap-10">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold tracking-tight group-hover:underline">
                {post.title}
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
              <div className="mt-3 flex gap-3 text-sm text-zinc-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
