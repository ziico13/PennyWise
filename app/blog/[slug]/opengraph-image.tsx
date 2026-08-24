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
  const primaryTag = meta.tags.find((tag) => tag !== "newcomers");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -260,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(52,211,153,0.35) 0%, rgba(52,211,153,0) 70%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 34, fontWeight: 700 }}>PennyWise</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {primaryTag && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 24,
                fontWeight: 600,
                color: "#34d399",
                backgroundColor: "rgba(52,211,153,0.12)",
                padding: "10px 22px",
                borderRadius: 9999,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {primaryTag}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: 1000,
            }}
          >
            {meta.title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
