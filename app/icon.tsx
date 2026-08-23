import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 6,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#34d399"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-1-11 5 0 1.8 1 2.9 2.5 3.5L7 20h3l.5-3h3.5l.5 3h3l-.5-3.5c1.5-.4 2.5-1.5 2.5-3.5V9l2-2-2-2z" />
          <circle cx="16" cy="9" r="0.5" fill="#34d399" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
