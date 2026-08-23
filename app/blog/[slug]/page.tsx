import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostMeta, getRelatedPosts } from "@/lib/posts";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { TagBadge } from "@/components/TagBadge";
import { ToolCallout } from "@/components/ToolCallout";
import { PostCard } from "@/components/PostCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const mdxComponents = { ToolCallout };

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return {};
  const meta = getPostMeta(slug);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      authors: [meta.author],
      url: `/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const meta = getPostMeta(slug);
  const relatedPosts = getRelatedPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: {
      "@type": "Organization",
      name: meta.author,
    },
    publisher: {
      "@type": "Organization",
      name: "PennyWise",
    },
    mainEntityOfPage: `https://pennywisemoney.com/blog/${slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        All articles
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {data.title}
        </h1>
        <div className="mt-4 flex gap-3 text-sm text-zinc-500">
          <time dateTime={meta.date}>
            {new Date(meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden="true">&middot;</span>
          <span>{meta.readingTime}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{data.author}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {meta.tags
            .filter((tag) => tag !== "newcomers")
            .map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
        </div>
      </header>

      {meta.hasAffiliateLinks && <AffiliateDisclosure />}

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      <div className="mt-12">
        <NewsletterSignup />
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
          <h2 className="text-lg font-semibold tracking-tight">
            Read next
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            {relatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
