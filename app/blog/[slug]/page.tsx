import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostMeta } from "@/lib/posts";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { TagBadge } from "@/components/TagBadge";
import { PaycheckCalculator } from "@/components/PaycheckCalculator";

const mdxComponents = { PaycheckCalculator };

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
    </article>
  );
}
