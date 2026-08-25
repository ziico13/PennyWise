"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
};

type Reactions = { like: number; dislike: number };

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactions, setReactions] = useState<Reactions>({ like: 0, dislike: 0 });
  const [voted, setVoted] = useState<"like" | "dislike" | null>(() =>
    typeof window === "undefined"
      ? null
      : (localStorage.getItem(`reacted:${slug}`) as "like" | "dislike" | null)
  );
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/comments/${slug}`).then((r) => r.json()),
      fetch(`/api/reactions/${slug}`).then((r) => r.json()),
    ])
      .then(([commentsData, reactionsData]) => {
        setComments(commentsData.comments ?? []);
        setReactions({
          like: reactionsData.like ?? 0,
          dislike: reactionsData.dislike ?? 0,
        });
      })
      .finally(() => setLoaded(true));
  }, [slug]);

  async function react(type: "like" | "dislike") {
    if (voted) return;
    setVoted(type);
    localStorage.setItem(`reacted:${slug}`, type);
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    await fetch(`/api/reactions/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    }).catch(() => {});
  }

  async function submitComment(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/comments/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text, website: "" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setComments((prev) => [data.comment, ...prev]);
      setText("");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-lg font-semibold tracking-tight">Discussion</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => react("like")}
            disabled={!!voted}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
              voted === "like"
                ? "border-accent bg-accent-soft text-accent"
                : "border-black/10 text-zinc-600 hover:border-accent hover:text-accent dark:border-white/10 dark:text-zinc-400"
            } ${voted && voted !== "like" ? "opacity-50" : ""}`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            {reactions.like}
          </button>
          <button
            type="button"
            onClick={() => react("dislike")}
            disabled={!!voted}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
              voted === "dislike"
                ? "border-accent bg-accent-soft text-accent"
                : "border-black/10 text-zinc-600 hover:border-accent hover:text-accent dark:border-white/10 dark:text-zinc-400"
            } ${voted && voted !== "dislike" ? "opacity-50" : ""}`}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
            {reactions.dislike}
          </button>
        </div>
      </div>

      <form onSubmit={submitComment} className="mb-10 flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          maxLength={60}
          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent dark:border-white/10 dark:bg-black"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a thought or ask a question..."
          required
          maxLength={2000}
          rows={3}
          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent dark:border-white/10 dark:bg-black"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px]"
          aria-hidden="true"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {submitting ? "Posting..." : "Post comment"}
        </button>
      </form>

      <div className="flex flex-col gap-6">
        {loaded && comments.length === 0 && (
          <p className="text-sm text-zinc-500">
            No comments yet — be the first to share a thought.
          </p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">{comment.name}</span>
              <span className="text-zinc-500">
                &middot; {timeAgo(comment.createdAt)}
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
