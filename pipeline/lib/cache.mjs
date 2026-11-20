// Conditional GET with an on-disk body cache (git-ignored data/cache/http/). Raw feeds are never committed.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { httpGet } from './http.mjs';

/**
 * GET text through the cache. ctx.cacheDir may be unset (then no caching), ctx.etags is a plain object
 * persisted in source-health.json. Returns { ok, status, text, fromCache }.
 */
export async function getText(url, ctx = {}, opts = {}) {
	const file = ctx.cacheDir ? join(ctx.cacheDir, createHash('sha1').update(url).digest('hex').slice(0, 16) + '.txt') : null;
	const have = file && existsSync(file);
	const prev = ctx.etags?.[url];
	const res = await httpGet(url, { ...opts, ...(have && prev ? prev : {}), fetchImpl: ctx.fetchImpl ?? fetch });
	if (res.notModified && have) return { ok: true, status: 304, text: readFileSync(file, 'utf8'), fromCache: true, headers: res.headers };
	if (res.ok && file) {
		mkdirSync(ctx.cacheDir, { recursive: true });
		writeFileSync(file, res.text);
		if (ctx.etags && (res.etag || res.lastModified)) ctx.etags[url] = { etag: res.etag, lastModified: res.lastModified };
	}
	return { ok: res.ok, status: res.status, text: res.text, fromCache: false, headers: res.headers };
}
