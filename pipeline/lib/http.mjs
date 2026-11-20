// Polite fetching: UA with contact, 1 req/s per host, timeout, retries, conditional GET.
import { FETCHER_CONTACT } from '../../config/country.mjs';

export const USER_AGENT =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 ' +
	'(event-aggregator; +' + FETCHER_CONTACT + ')';

const lastHit = new Map(); // host -> ms of last reserved slot
const MIN_GAP = Number(process.env.PIPELINE_MIN_GAP_MS ?? 1000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function throttle(host, gap = MIN_GAP) {
	const prev = lastHit.get(host) ?? 0;
	// Reserve the slot synchronously so concurrent callers queue up.
	const slot = Math.max(Date.now(), prev + gap);
	lastHit.set(host, slot);
	const wait = slot - Date.now();
	if (wait > 0) await sleep(wait);
}

/**
 * GET a URL. Returns { status, ok, notModified, text, headers, etag, lastModified, url }.
 * Retries network errors / 5xx / 429; other 4xx are returned with ok=false.
 */
export async function httpGet(url, opts = {}) {
	const { etag, lastModified, accept, timeoutMs = 20000, retries = 2, fetchImpl = fetch, userAgent = USER_AGENT, gapMs = MIN_GAP } = opts;
	const host = new URL(url).host;
	let lastErr;
	for (let attempt = 0; attempt <= retries; attempt++) {
		if (attempt > 0) await sleep(800 * 2 ** (attempt - 1));
		await throttle(host, gapMs);
		try {
			const headers = { 'User-Agent': userAgent, Accept: accept ?? '*/*', 'Accept-Language': 'en,de;q=0.8' };
			if (etag) headers['If-None-Match'] = etag;
			if (lastModified) headers['If-Modified-Since'] = lastModified;
			const res = await fetchImpl(url, { headers, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
			if (res.status === 304) return { status: 304, ok: true, notModified: true, text: '', headers: res.headers, url };
			// 429 means we are being throttled: retrying within seconds only makes it worse. Fail fast, record it.
			if (res.status === 429) return { status: 429, ok: false, notModified: false, text: '', headers: res.headers, url };
			if (res.status >= 500) {
				lastErr = new Error('HTTP ' + res.status);
				continue;
			}
			const text = await res.text();
			return {
				status: res.status, ok: res.ok, notModified: false, text, headers: res.headers, url: res.url || url,
				etag: res.headers.get('etag') ?? undefined, lastModified: res.headers.get('last-modified') ?? undefined,
			};
		} catch (e) {
			lastErr = e;
		}
	}
	throw lastErr;
}

export async function httpJson(url, opts) {
	const r = await httpGet(url, { accept: 'application/json', ...opts });
	if (!r.ok) throw new Error('HTTP ' + r.status);
	return JSON.parse(r.text);
}
