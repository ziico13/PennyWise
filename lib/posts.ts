import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  readingTime: string;
  hasAffiliateLinks: boolean;
};

function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostMeta(slug: string): PostMeta {
  const { data, content } = readPostFile(slug);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    author: data.author,
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    hasAffiliateLinks: data.hasAffiliateLinks ?? false,
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      if (tag !== "newcomers") tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getPostsByTags(tags: string[]): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => tags.includes(tag))
  );
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getPostMeta(slug);
  const others = getAllPosts().filter((post) => post.slug !== slug);

  const scored = others.map((post) => {
    const sharedTags = post.tags.filter((tag) =>
      current.tags.includes(tag)
    ).length;
    return { post, sharedTags };
  });

  scored.sort((a, b) => {
    if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
    return a.post.date < b.post.date ? 1 : -1;
  });

  return scored.slice(0, limit).map(({ post }) => post);
}
