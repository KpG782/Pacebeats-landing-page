/**
 * Generates the social-share card → public/og-image.png (1200×630).
 *
 * Run:  node scripts/generate-og-image.mjs
 *
 * It is a one-off design tool, NOT part of `npm run build`. It renders an SVG
 * with sharp (already a transitive Astro dep). Because sharp/libvips resolves
 * fonts through fontconfig, the script downloads Plus Jakarta Sans (the site's
 * display face) to a temp dir, points FONTCONFIG_FILE at it, then imports sharp
 * — env must be set before sharp initialises, hence the dynamic import.
 *
 * Re-run this whenever the brand colours, tagline, or wordmark change, then
 * commit the regenerated public/og-image.png.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// ── Brand tokens (mirror src/styles/global.css) ────────────────────────────
const INK = "#091233";
const INK2 = "#0f1b40";
const INK3 = "#1f2d5c";
const WHITE = "#ffffff";
const MUTED = "#a8b4c9";
const COBALT = "#2347e0";
const COBALT_L = "#3d6beb";
const FONT = "Plus Jakarta Sans, Helvetica, Arial, sans-serif";
const W = 1200, H = 630;

// ── Font + fontconfig bootstrap ────────────────────────────────────────────
const FONT_DIR = join(tmpdir(), "pacebeats-og-fonts");
const FONT_TTF = join(FONT_DIR, "PlusJakartaSans.ttf");
const FONT_CONF = join(FONT_DIR, "fonts.conf");
const FONT_URL =
  "https://github.com/google/fonts/raw/main/ofl/plusjakartasans/PlusJakartaSans%5Bwght%5D.ttf";

mkdirSync(FONT_DIR, { recursive: true });
if (!existsSync(FONT_TTF)) {
  console.log("Downloading Plus Jakarta Sans…");
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`font download failed: ${res.status}`);
  writeFileSync(FONT_TTF, Buffer.from(await res.arrayBuffer()));
}
writeFileSync(
  FONT_CONF,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONT_DIR}</dir>
  <dir>/System/Library/Fonts</dir>
  <dir>/System/Library/Fonts/Supplemental</dir>
  <dir>/Library/Fonts</dir>
  <cachedir>${join(FONT_DIR, "cache")}</cachedir>
  <config></config>
</fontconfig>`,
);
process.env.FONTCONFIG_FILE = FONT_CONF;

// sharp must load AFTER FONTCONFIG_FILE is set.
const { default: sharp } = await import("sharp");

// ── Equalizer bars (music motif), right-aligned in the preview header ──────
const eqHeights = [16, 30, 12, 38, 22, 34, 14];
const eqBars = eqHeights
  .map((h, i) => {
    const x = 1004 + i * 12;
    const y = 210 - h;
    return `<rect x="${x}" y="${y}" width="6" height="${h}" rx="3" fill="${COBALT_L}" opacity="${Math.min(1, 0.55 + h / 90)}"/>`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/>
      <stop offset="1" stop-color="#0b1740"/>
    </linearGradient>
    <linearGradient id="prog" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${COBALT}"/>
      <stop offset="1" stop-color="${COBALT_L}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Signature route line (from the hero) -->
  <path d="M-20,470 C180,360 360,560 560,440 S900,300 1080,470 S1300,600 1460,380"
        fill="none" stroke="${COBALT_L}" stroke-width="2" stroke-opacity="0.22" stroke-linecap="round"/>
  <circle cx="560" cy="440" r="4" fill="${COBALT_L}" opacity="0.5"/>
  <circle cx="1080" cy="470" r="4" fill="${COBALT_L}" opacity="0.5"/>

  <rect x="80" y="82" width="48" height="4" rx="2" fill="${COBALT_L}"/>
  <text x="80" y="124" font-family="${FONT}" font-size="21" font-weight="600"
        letter-spacing="4" fill="${MUTED}">ANDROID + WEAR OS · RUNNING COMPANION</text>

  <text x="78" y="252" font-family="${FONT}" font-size="74" font-weight="800"
        letter-spacing="-2" fill="${WHITE}">Run to the rhythm.</text>
  <text x="78" y="338" font-family="${FONT}" font-size="74" font-weight="800"
        letter-spacing="-2" fill="${COBALT_L}">Achieve your pace.</text>

  <text x="80" y="400" font-family="${FONT}" font-size="26" font-weight="500"
        fill="${MUTED}">Your music, synced to every stride.</text>

  <rect x="80" y="470" width="222" height="50" rx="25" fill="${COBALT}"/>
  <text x="191" y="502" font-family="${FONT}" font-size="19" font-weight="700"
        letter-spacing="2" fill="${WHITE}" text-anchor="middle">FREE · GITHUB BUILD</text>
  <text x="322" y="503" font-family="${FONT}" font-size="22" font-weight="600"
        letter-spacing="1" fill="${MUTED}">www.pacebeats.top</text>

  <!-- App-preview mini panel -->
  <g>
    <rect x="780" y="150" width="340" height="300" rx="26" fill="${INK2}" stroke="${INK3}" stroke-width="1.5"/>
    <text x="812" y="206" font-family="${FONT}" font-size="16" font-weight="600"
          letter-spacing="3" fill="${MUTED}">NOW SYNCING</text>
    ${eqBars}
    <text x="812" y="316" font-family="${FONT}" font-size="76" font-weight="800"
          letter-spacing="-2" fill="${WHITE}">172</text>
    <text x="812" y="348" font-family="${FONT}" font-size="18" font-weight="600"
          letter-spacing="3" fill="${COBALT_L}">SPM · CADENCE</text>
    <rect x="812" y="372" width="276" height="1.5" fill="${INK3}"/>
    <text x="812" y="406" font-family="${FONT}" font-size="20" font-weight="600" fill="${MUTED}">PACE</text>
    <text x="1088" y="406" font-family="${FONT}" font-size="20" font-weight="700"
          fill="${WHITE}" text-anchor="end">5:24 /km</text>
    <rect x="812" y="420" width="276" height="8" rx="4" fill="${INK3}"/>
    <rect x="812" y="420" width="188" height="8" rx="4" fill="url(#prog)"/>
  </g>
</svg>`;

const out = new URL("../public/og-image.png", import.meta.url);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out.pathname);
console.log("Wrote", out.pathname);
