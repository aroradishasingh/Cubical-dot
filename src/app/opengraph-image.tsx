import { ImageResponse } from "next/og";

export const alt = "Cubical Dot - Ideas in motion.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 84% 14%, rgba(99,24,255,0.55), transparent 42%), radial-gradient(circle at 10% 96%, rgba(215,255,63,0.16), transparent 38%)",
          padding: "90px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="46" viewBox="0 0 101.67 64" fill="none">
            <path
              d="M 18.4 0 H 64 V 46.8 A 17.2 17.2 0 0 1 46.8 64 H 0 V 18.4 A 18.4 18.4 0 0 1 18.4 0 Z"
              fill="#2C5CF6"
            />
            <circle cx="86.2" cy="48.54" r="15.46" fill="#D7FF3F" />
          </svg>
          <span style={{ fontSize: 38, fontWeight: 600, color: "#F6F5F2", letterSpacing: "-0.02em" }}>
            Cubical Dot
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 64 }}>
          <span
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#F9F9F7",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Ideas in motion.
          </span>
          <span
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: "rgba(249,249,247,0.72)",
              marginTop: 26,
              letterSpacing: "-0.01em",
              maxWidth: 820,
            }}
          >
            Website design and redesign for premium brands entering their next market.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
