import { ImageResponse } from "next/og";
import { getPostMeta } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700 }}>PennyWise</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.25,
            maxWidth: 1000,
          }}
        >
          {meta.title}
        </div>
      </div>
    ),
    { ...size }
  );
}
