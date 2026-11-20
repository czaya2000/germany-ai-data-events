// Regenerates public/favicon.ico, public/apple-touch-icon.png and public/og-image.png.
// One-off design tool, not part of the build: `node scripts/make-brand-assets.mjs`
// (needs Playwright's chromium: `npx playwright install chromium`).
// Same visual system as the Swiss site (Archivo, black, warm off-white, red accent,
// square mark); German branding is limited to a thin gold band under the red rule.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { SITE_NAME, SITE_HOST } from '../config/country.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (f) => path.join(root, 'public', f);
const font = (w) => pathToFileURL(pub(`fonts/archivo-latin-${w}.woff2`)).href;

const BG = '#fbfbf9';
const mark = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
<rect x="3" y="4" width="18" height="17" fill="none" stroke="#000" stroke-width="2"/>
<rect x="3" y="4" width="18" height="4.5" fill="#E30613"/>
<rect x="3" y="8.5" width="18" height="1.5" fill="#FFCE00"/></svg>`;

const browser = await chromium.launch();
const shot = async (html, w, h) => {
	const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
	await page.setContent(html);
	await page.evaluate(() => document.fonts.ready);
	const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: w, height: h } });
	await page.close();
	return buf;
};
const iconHtml = (size, pad) =>
	`<body style="margin:0;background:${BG};width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center">${mark(size - pad * 2)}</body>`;

// apple-touch-icon: 180 px, same proportions as the Swiss icon (mark fills the canvas).
writeFileSync(pub('apple-touch-icon.png'), await shot(iconHtml(180, 0), 180, 180));

// favicon.ico: PNG-compressed 16, 32 and 48 px images (transparent background).
const icoImages = [];
for (const s of [16, 32, 48]) {
	const page = await browser.newPage({ viewport: { width: s, height: s } });
	await page.setContent(`<body style="margin:0;background:transparent">${mark(s)}</body>`);
	icoImages.push({ s, buf: await page.screenshot({ type: 'png', omitBackground: true }) });
	await page.close();
}
const head = Buffer.alloc(6 + 16 * icoImages.length);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(icoImages.length, 4);
let offset = head.length;
icoImages.forEach(({ s, buf }, i) => {
	const o = 6 + 16 * i;
	head[o] = s; head[o + 1] = s;
	head.writeUInt16LE(1, o + 4);
	head.writeUInt16LE(32, o + 6);
	head.writeUInt32LE(buf.length, o + 8);
	head.writeUInt32LE(offset, o + 12);
	offset += buf.length;
});
writeFileSync(pub('favicon.ico'), Buffer.concat([head, ...icoImages.map((i) => i.buf)]));

// og-image: 1200x630.
const og = `<style>
@font-face{font-family:Archivo;font-weight:400;src:url('${font(400)}') format('woff2')}
@font-face{font-family:Archivo;font-weight:600;src:url('${font(600)}') format('woff2')}
@font-face{font-family:Archivo;font-weight:700;src:url('${font(700)}') format('woff2')}
*{box-sizing:border-box}
body{margin:0;width:1200px;height:630px;background:${BG};color:#000;font-family:Archivo,sans-serif;position:relative}
.brand{position:absolute;left:72px;top:60px;display:flex;align-items:center;gap:20px;font-weight:700;font-size:34px;letter-spacing:-0.02em}
h1{position:absolute;left:72px;top:150px;margin:0;width:900px;font-weight:400;font-size:84px;line-height:1.04;letter-spacing:-0.04em}
.sub{position:absolute;left:72px;bottom:62px;font-size:24px;color:#5c5c5c}
.host{position:absolute;right:72px;bottom:62px;font-size:24px;color:#5c5c5c;font-weight:600}
.bar{position:absolute;left:0;right:0;bottom:0;height:14px;display:flex;flex-direction:column}
.bar i{display:block;flex:1}
</style>
<body>
<div class="brand">${mark(44)}<span>${SITE_NAME}</span></div>
<h1>Every AI and data event in Germany, in one place.</h1>
<div class="sub">Conferences, meetups, workshops and webinars across Germany.</div>
<div class="host">${SITE_HOST}</div>
<div class="bar" style="flex-direction:row"><i style="background:#000;flex:1"></i><i style="background:#E30613;flex:1"></i><i style="background:#FFCE00;flex:1"></i></div>
</body>`;
writeFileSync(pub('og-image.png'), await shot(og, 1200, 630));

await browser.close();

// favicon.svg keeps the Swiss file's structure plus the gold band.
const svg = readFileSync(pub('favicon.svg'), 'utf8');
if (!svg.includes('class="band"')) {
	writeFileSync(
		pub('favicon.svg'),
		svg
			.replace('    <style>', '    <rect x="3" y="8.5" width="18" height="1.5" class="band" />\n    <style>')
			.replace('.rule  { fill:   #E30613; }\n        @media', '.rule  { fill:   #E30613; }\n        .band  { fill:   #FFCE00; }\n        @media'),
	);
}
console.log('brand assets written');
