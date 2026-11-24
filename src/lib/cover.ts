// Post covers.
// - Posts about specific tools: the tools' real logos (Simple Icons marks in their
//   official brand colours) on a plain dark card, joined by "+".
// - Other posts: a hand-picked free-licence image set as `heroImage` (see cover-credits.ts).
// No text is drawn, so the generated image renders the same on any machine.

import fs from 'node:fs';
import path from 'node:path';
import type { Logo } from './logos';

export const COVER_W = 1200;
export const COVER_H = 630;

const BG = '#0c0d10';
const INK = '#f2efe9';

/** Brand colour, or ink when the brand colour is too dark to read on the card (Apple, Bun, Ollama…). */
function colourOf(hex: string): string {
    const n = parseInt(hex, 16);
    const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
    return lum < 0.22 ? INK : `#${hex}`;
}

const f = (n: number) => n.toFixed(1);

export function logoCoverSvg(logos: Logo[]): string {
    const n = logos.length;
    const size = n === 1 ? 260 : n === 2 ? 200 : 160;
    const plus = 36;
    const gap = n === 1 ? 0 : 64;
    const total = n * size + (n - 1) * (gap * 2 + plus);
    let x = (COVER_W - total) / 2;
    const y = (COVER_H - size) / 2;

    const parts: string[] = [];
    logos.forEach((logo, i) => {
        parts.push(
            `<g transform="translate(${f(x)} ${f(y)}) scale(${(size / 24).toFixed(4)})"><path d="${logo.path}" fill="${colourOf(logo.hex)}"/></g>`
        );
        x += size;
        if (i < n - 1) {
            const px = x + gap + plus / 2;
            const py = COVER_H / 2;
            parts.push(
                `<path d="M${f(px - plus / 2)} ${f(py)}H${f(px + plus / 2)}M${f(px)} ${f(py - plus / 2)}V${f(py + plus / 2)}" stroke="${INK}" stroke-opacity="0.35" stroke-width="3" stroke-linecap="round"/>`
            );
            x += gap * 2 + plus;
        }
    });

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${COVER_W}" height="${COVER_H}" viewBox="0 0 ${COVER_W} ${COVER_H}">
  <defs>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="${INK}" fill-opacity="0.07"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="${BG}"/>
  <rect width="100%" height="100%" fill="url(#dots)"/>
  ${parts.join('\n  ')}
</svg>`;
}

/**
 * Cover URL for a post: its own heroImage when that file exists in /public,
 * otherwise the generated logo cover at /blog/<slug>/cover.jpg (only when the
 * post has related tools), otherwise null.
 */
export function coverFor(
    post: { slug: string; data: { heroImage?: string } },
    hasTools: boolean
): { src: string; generated: boolean } | null {
    const hero = post.data.heroImage;
    if (hero && hero.startsWith('/') && fs.existsSync(path.join(process.cwd(), 'public', hero))) {
        return { src: hero, generated: false };
    }
    return hasTools ? { src: `/blog/${post.slug}/cover.jpg`, generated: true } : null;
}
