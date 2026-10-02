import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Social preview shown when any Ymagen page is shared on WhatsApp, X, LinkedIn, etc. */
export const alt = "Ymagen: marketing that grows your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Design tokens, inlined: ImageResponse can't read CSS variables.
const BRAND = "#2767e3";
const INK = "#0b0d10";
const INK_500 = "#6b717c";
const PANEL = "#f0f0f1";

export default async function Image() {
  const [switzer, mark] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/Switzer-Semibold.ttf")),
    readFile(join(process.cwd(), "public/logo-mark.png")),
  ]);
  const logo = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          padding: 28,
          fontFamily: "Switzer",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: PANEL,
            borderRadius: 40,
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
            <img src={logo} width={64} height={64} alt="" />
            <span style={{ fontSize: 44, color: INK, letterSpacing: -1.5 }}>Ymagen</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.02, letterSpacing: -3.5, color: INK }}>
              <div style={{ display: "flex" }}>
                Marketing that<span style={{ color: BRAND, marginLeft: 22 }}>grows</span>
              </div>
              <div>your business.</div>
            </div>
            <div style={{ marginTop: 28, fontSize: 30, color: INK_500, letterSpacing: -0.5 }}>
              Strategy, ads, social media, branding, websites and email for Nigerian businesses.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: BRAND }} />
            <span style={{ fontSize: 28, color: INK }}>Stop guessing. Start growing.</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Switzer", data: switzer, style: "normal", weight: 600 }],
    },
  );
}
