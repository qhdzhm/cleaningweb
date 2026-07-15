import { ImageResponse } from "next/og";

// Generated at build time so social shares stop rendering an empty grey box.
// Applies site-wide unless a route supplies its own opengraph-image.
export const alt = "NaturePure Cleaning — chemical-free cleaning across Hobart";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#005b3d",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 256 256" fill="#8fd6b4">
            <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>NaturePure</span>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: 7, color: "#8fd6b4" }}>CLEANING</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 900 }}>
            Hobart&apos;s easier way to a beautifully clean space.
          </div>
          <div style={{ marginTop: 26, fontSize: 27, color: "#b9e3cd", maxWidth: 860 }}>
            Chemical-free home, commercial &amp; end-of-lease cleaning.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 21, color: "#b9e3cd" }}>
          <span>Fully insured</span>
          <span style={{ color: "#4d8f70" }}>•</span>
          <span>Police checked</span>
          <span style={{ color: "#4d8f70" }}>•</span>
          <span>naturepurecleaning.com.au</span>
        </div>
      </div>
    ),
    size
  );
}
