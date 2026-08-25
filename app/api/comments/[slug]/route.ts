import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const MAX_NAME_LENGTH = 60;
const MAX_TEXT_LENGTH = 2000;
const MAX_COMMENTS_RETURNED = 200;

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const redis = getRedis();
  if (!redis) return NextResponse.json({ comments: [] });

  const raw = await redis.lrange(`comments:${slug}`, 0, MAX_COMMENTS_RETURNED - 1);
  const comments: Comment[] = raw
    .map((entry) => {
      try {
        return typeof entry === "string" ? (JSON.parse(entry) as Comment) : (entry as Comment);
      } catch {
        return null;
      }
    })
    .filter((c): c is Comment => c !== null)
    .reverse();

  return NextResponse.json({ comments });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      { error: "Comments aren't available right now." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, text, website } = body as {
    name?: string;
    text?: string;
    website?: string;
  };

  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof text !== "string" ||
    name.trim().length === 0 ||
    text.trim().length === 0 ||
    name.length > MAX_NAME_LENGTH ||
    text.length > MAX_TEXT_LENGTH
  ) {
    return NextResponse.json({ error: "Invalid comment." }, { status: 400 });
  }

  const comment: Comment = {
    id: crypto.randomUUID(),
    name: name.trim(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };

  await redis.rpush(`comments:${slug}`, JSON.stringify(comment));

  return NextResponse.json({ comment });
}
