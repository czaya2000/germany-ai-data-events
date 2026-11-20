// Scrape sources: fetch a page, honour robots.txt, reduce it to readable text plus a link list.
// No LLM and no Playwright here. Extraction happens later in the Claude step; code verifies it (phase 3).
import { createHash } from 'node:crypto';
import { httpGet } from '../lib/http.mjs';
import { stripHtml } from '../lib/normalize.mjs';

const MAX_CHARS = 32000; // about 8,000 tokens

/** Minimal robots.txt check for `User-agent: *` (and our own name). */
export function robotsAllows(robotsTxt, path) {
	const lines = robotsTxt.split(/\r?\n/).map((l) => l.replace(/#.*/, '').trim()).filter(Boolean);
	let applies = false;
	let sawGroup = false;
	const rules = [];
	for (const l of lines) {
		const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(l);
		if (!m) continue;
		const k = m[1].toLowerCase();
		if (k === 'user-agent') {
			if (sawGroup && rules.length) { /* new group begins; keep going, only the first matching group is used below */ }
			applies = m[2] === '*' || /event-aggregator/i.test(m[2]);
			sawGroup = true;
		} else if (applies && (k === 'disallow' || k === 'allow')) {
			rules.push({ allow: k === 'allow', prefix: m[2] });
		}
	}
	let best = null;
	for (const r of rules) {
		if (!r.prefix) continue;
		if (path.startsWith(r.prefix.replace(/\*.*$/, '')) && (!best || r.prefix.length >= best.prefix.length)) best = r;
	}
	return !best || best.allow;
}

/** Reduce HTML to headings, list items, dates and [text](url) links. */
export function reduceHtml(html, baseUrl) {
	const links = [];
	let h = html
		.replace(/<!--[\s\S]*?-->/g, ' ')
		.replace(/<(script|style|noscript|svg|nav|footer|iframe)[\s\S]*?<\/\1>/gi, ' ');
	const main = /<main[\s\S]*?(?:<\/main>|$)/i.exec(h);
	if (main) h = main[0];
	h = h.replace(/<a\s[^>]*href="([^"#][^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => {
		let abs;
		try { abs = new URL(href.replace(/&amp;/g, '&'), baseUrl).toString(); } catch { return inner; }
		if (!/^https?:/.test(abs)) return inner;
		const label = stripHtml(inner).replace(/\s+/g, ' ');
		if (!label) return ' ';
		if (!links.some((l) => l.url === abs)) links.push({ text: label.slice(0, 120), url: abs });
		return ` [${label.slice(0, 120)}](${abs}) `;
	});
	h = h.replace(/<(h[1-6])[^>]*>/gi, '\n## ').replace(/<li[^>]*>/gi, '\n- ');
	let text = stripHtml(h).replace(/\n{3,}/g, '\n\n');
	if (text.length > MAX_CHARS) text = text.slice(0, MAX_CHARS);
	return { text, links };
}

export async function fetchPage(src, ctx) {
	const u = new URL(src.url);
	try {
		const robots = await httpGet(`${u.origin}/robots.txt`, { retries: 0, timeoutMs: 10000, fetchImpl: ctx.fetchImpl ?? fetch });
		if (robots.ok && !robotsAllows(robots.text, u.pathname + u.search)) {
			return { skipped: 'robots.txt disallows this path' };
		}
	} catch {
		/* no robots.txt reachable: proceed politely */
	}
	const r = await httpGet(src.url, { accept: 'text/html', fetchImpl: ctx.fetchImpl ?? fetch });
	if (!r.ok) throw new Error('HTTP ' + r.status);
	const { text, links } = reduceHtml(r.text, r.url);
	const hash = createHash('sha1').update(text).digest('hex');
	return { text, links, hash, bytes: r.text.length };
}
