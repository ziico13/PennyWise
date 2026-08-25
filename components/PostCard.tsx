import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { TagBadge } from "@/components/TagBadge";
import { getCoverPhoto } from "@/lib/coverPhoto";

export async function PostCard({ post }: { post: PostMeta }) {
  const primaryTag = post.tags.find((tag) => tag !== "newcomers");
  const photo = await getCoverPhoto(primaryTag);

  return (
    <article className="group relative rounded-xl border border-transparent p-5 -mx-5 transition-all duration-200 hover:border-black/10 hover:bg-black/[0.03] hover:shadow-sm dark:hover:border-white/10 dark:hover:bg-white/[0.03]">
      <div className="relative mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo?.url ?? `/blog/${post.slug}/opengraph-image`}
          alt=""
          className="aspect-[1200/630] w-full rounded-lg object-cover"
        />
        {photo && (
          <a
            href={photo.photographerLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="absolute bottom-1.5 right-1.5 z-10 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/80 hover:text-white"
          >
            {photo.photographerName} / Unsplash
          </a>
        )}
      </div>
      <div className="relative z-10 mb-2 flex flex-wrap gap-2">
        {post.tags
          .filter((tag) => tag !== "newcomers")
          .map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
      </div>
      <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
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
    </article>
  );
}
