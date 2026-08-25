import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const redis = getRedis();
  if (!redis) return NextResponse.json({ like: 0, dislike: 0 });

  const counts = await redis.hgetall<{ like?: number; dislike?: number }>(
    `reactions:${slug}`
  );

  return NextResponse.json({
    like: Number(counts?.like ?? 0),
    dislike: Number(counts?.dislike ?? 0),
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      { error: "Reactions aren't available right now." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const type = body?.type;

  if (type !== "like" && type !== "dislike") {
    return NextResponse.json({ error: "Invalid reaction." }, { status: 400 });
  }

  const newCount = await redis.hincrby(`reactions:${slug}`, type, 1);

  return NextResponse.json({ [type]: newCount });
}
