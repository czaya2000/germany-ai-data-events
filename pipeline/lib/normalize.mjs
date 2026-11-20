// Candidate shape, URL canonicalisation, ledger keys, text cleanup, German/English date parsing.
import { fold } from './city.mjs';
import { MONTHS } from './time.mjs';

export function stripHtml(html) {
	return String(html ?? '')
		.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
		.replace(/<br\s*\/?>|<\/p>|<\/li>|<\/h\d>/gi, '\n')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
		.replace(/[ \t ]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
}

export function oneLine(s, max) {
	const t = String(s ?? '').replace(/\s+/g, ' ').trim();
	return max && t.length > max ? t.slice(0, max - 1) + '…' : t;
}

const TRACKING = /^(utm_|fbclid|gclid|mc_|ref$|ref_|source$)/i;

/** Canonical URL for ledger keys: no query tracking, fragment or trailing slash; per-platform shortcuts. */
export function canonicalUrl(raw) {
	let u;
	try { u = new URL(String(raw).trim()); } catch { return null; }
	const host = u.hostname.replace(/^www\./, '').toLowerCase();
	let m;
	if (host === 'meetup.com' && (m = /^\/([^/]+)\/events\/(\d+)/.exec(u.pathname))) return `meetup.com/${m[1].toLowerCase()}/events/${m[2]}`;
	if ((host === 'luma.com' || host === 'lu.ma') && (m = /^\/([^/]+)\/?$/.exec(u.pathname))) return `luma.com/${m[1]}`;
	if (/(^|\.)eventbrite\./.test(host) && (m = /(\d{8,})\/?$/.exec(u.pathname))) return `eventbrite/${m[1]}`;
	const keep = [...u.searchParams].filter(([k]) => !TRACKING.test(k));
	const q = keep.length ? '?' + keep.map(([k, v]) => `${k}=${v}`).join('&') : '';
	return `${host}${u.pathname.replace(/\/+$/, '')}${q}`;
}

const STOP = new Set([
	'the', 'and', 'of', 'in', 'at', 'der', 'die', 'das', 'und', 'für', 'fur', 'mit', 'von', 'zu', 'im', 'an', 'a', 'for', 'to', 'with',
	'berlin', 'munich', 'muenchen', 'munchen', 'hamburg', 'frankfurt', 'cologne', 'koln', 'stuttgart', 'germany', 'deutschland',
	'event', 'events', 'meetup', 'online',
]);

/** Port of norm_title from reference/dedupe-and-keywords.py. */
export function normTitle(t) {
	let s = fold(t);
	s = s.replace(/20\d\d|#\d+|\bno\.?\s*\d+/g, '').replace(/[^a-z0-9 ]/g, ' ');
	return s.split(/\s+/).filter((w) => w && !STOP.has(w)).join(' ');
}

export function ledgerKeys(c) {
	const keys = [];
	const u = canonicalUrl(c.url);
	if (u) keys.push('u:' + u);
	for (const x of c.extraUrls ?? []) {
		const cu = canonicalUrl(x);
		if (cu && !keys.includes('u:' + cu)) keys.push('u:' + cu);
	}
	const nt = normTitle(c.title);
	if (nt) keys.push(`t:${nt}|${c.start}`);
	return keys;
}

/** Build a Candidate from loose fields. Returns null when title/start are missing. */
export function makeCandidate(f, src) {
	if (!f.title || !f.start || !/^\d{4}-\d{2}-\d{2}$/.test(f.start)) return null;
	const c = {
		title: oneLine(f.title, 200),
		start: f.start,
		end: f.end && f.end >= f.start ? f.end : f.start,
		time: f.time || undefined,
		city: f.city || null,
		venue: f.venue ? oneLine(f.venue, 160) : undefined,
		organiser: f.organiser ? oneLine(f.organiser, 120) : '',
		url: f.url || '',
		extraUrls: f.extraUrls ?? [],
		cost: f.cost || null,
		desc: oneLine(f.desc, 600),
		online: !!f.online,
		country: f.country ?? src.country ?? null,
		cancelled: !!f.cancelled,
		sourceId: src.id,
		sourceLabel: src.label ?? src.id,
		sourceType: src.type,
		trust: src.trust,
		role: src.role,
		onlineOk: !!src.onlineOk,
		acceptAll: !!src.acceptAll,
		categoryHint: f.categoryHint,
	};
	c.keys = ledgerKeys(c);
	c.key = c.keys[0];
	return c;
}

// ---- date text parsing (German and English) ----
const DE_MONTHS = {
	januar: 1, februar: 2, maerz: 3, marz: 3, april: 4, mai: 5, juni: 6, juli: 7, august: 8,
	september: 9, oktober: 10, november: 11, dezember: 12,
};
const MON_ALL = { ...MONTHS, ...DE_MONTHS };
for (const [k, v] of Object.entries(MONTHS)) MON_ALL[k.slice(0, 3)] = v;
const monthNum = (s) => MON_ALL[fold(s).replace(/\./g, '')];
const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const MON_RE = '(?:[A-Za-zÄÖÜäöüß]{3,9})\\.?';

/**
 * Find the first date or date range in free text.
 * Handles "16.–20. November 2026", "5.-7. Oktober 2027", "10. November 2026", "December 10, 2026",
 * "Dec 10-11, 2026", "10 Dec 2026", "2026-11-20", "20.11.2026".
 * Returns { start, end } or null.
 */
export function parseDateText(text) {
	const t = String(text ?? '');
	let m;
	if ((m = /(\d{1,2})\.\s*(?:(\d{1,2})\.\s*)?[–—-]\s*(\d{1,2})\.\s*(?:(\d{1,2})\.\s*)?(\d{4})/.exec(t)) && m[2] && m[4]) {
		return { start: iso(m[5], m[2], m[1]), end: iso(m[5], m[4], m[3]) };
	}
	// German: 16.–20. November 2026 | 10. November 2026 | 28. Nov. – 2. Dez. 2026
	m = new RegExp(`(\\d{1,2})\\.\\s*(${MON_RE})?\\s*[–—-]\\s*(\\d{1,2})\\.\\s*(${MON_RE})\\s*(\\d{4})`).exec(t);
	if (m) {
		const m2 = monthNum(m[4]), m1 = m[2] ? monthNum(m[2]) : m2;
		if (m1 && m2) return { start: iso(m[5], m1, m[1]), end: iso(m[5], m2, m[3]) };
	}
	m = new RegExp(`(\\d{1,2})\\.\\s*(${MON_RE})\\s*(\\d{4})`).exec(t);
	if (m && monthNum(m[2])) return { start: iso(m[3], monthNum(m[2]), m[1]), end: iso(m[3], monthNum(m[2]), m[1]) };
	if ((m = /(\d{1,2})\.(\d{1,2})\.(\d{4})/.exec(t))) return { start: iso(m[3], m[2], m[1]), end: iso(m[3], m[2], m[1]) };
	if ((m = /\b(\d{4})-(\d{2})-(\d{2})\b/.exec(t))) return { start: m[0], end: m[0] };
	// English: December 10, 2026 | Dec 10-11, 2026 | 10 December 2026 | 10-12 December 2026
	m = new RegExp(`(${MON_RE})\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:\\s*[–—-]\\s*(\\d{1,2}))?,?\\s+(\\d{4})`).exec(t);
	if (m && monthNum(m[1])) return { start: iso(m[4], monthNum(m[1]), m[2]), end: iso(m[4], monthNum(m[1]), m[3] ?? m[2]) };
	m = new RegExp(`(\\d{1,2})(?:\\s*[–—-]\\s*(\\d{1,2}))?\\s+(${MON_RE})\\s+(\\d{4})`).exec(t);
	if (m && monthNum(m[3])) return { start: iso(m[4], monthNum(m[3]), m[1]), end: iso(m[4], monthNum(m[3]), m[2] ?? m[1]) };
	return null;
}

export function costFromPrice({ isFree, priceFrom, priceTo, currency }) {
	if (isFree === true) return 'Free';
	const cur = (currency || 'EUR').toUpperCase();
	if (priceFrom != null && Number(priceFrom) > 0) {
		const amount = Number.isInteger(Number(priceFrom)) ? Number(priceFrom) : Number(priceFrom).toFixed(2);
		if (priceTo != null && Number(priceTo) > Number(priceFrom)) return `From ${cur} ${amount}`;
		return `${cur} ${amount}`;
	}
	return null;
}
