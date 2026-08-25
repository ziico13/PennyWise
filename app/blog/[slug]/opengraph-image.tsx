import { ImageResponse } from "next/og";
import { getPostMeta } from "@/lib/posts";
import { CoverIllustration } from "@/lib/coverIllustrations";

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
          backgroundColor: "#060706",
          color: "#ffffff",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -280,
            right: -180,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(52,211,153,0.16) 0%, rgba(52,211,153,0) 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "58%",
            padding: "72px 40px 72px 72px",
          }}
        >
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
            PennyWise
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {primaryTag && (
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#34d399",
                  backgroundColor: "rgba(52,211,153,0.12)",
                  padding: "9px 20px",
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
                fontSize: 50,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {meta.title}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "42%",
            padding: "80px 80px 80px 20px",
          }}
        >
          <div style={{ display: "flex", width: 340, height: 340 }}>
            <CoverIllustration tag={primaryTag} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
