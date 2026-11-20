// Verification of the Claude step's output. Nothing the model says is trusted: items are checked against
// pipeline/enrichment.schema.json (small validator below), then against the candidate the feed gave us.
// Anything invalid is dropped and counted under a reason; nothing is repaired or guessed.
import { readFileSync } from 'node:fs';
import { fold, detectCity, NATIONWIDE, ONLINE } from './city.mjs';
import { addDays, daysBetween } from './time.mjs';

export const SCHEMA = JSON.parse(readFileSync(new URL('../enrichment.schema.json', import.meta.url), 'utf8'));
export const FORMATS = SCHEMA.definitions.format.enum;
export const BLURB_MAX = SCHEMA.definitions.blurb.maxLength;
export const MAX_EVENT_DAYS = 45;

const URL_RE = /(?:https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|de|org|net|eu)\b)/i;
export const containsUrl = (s) => URL_RE.test(String(s ?? ''));

// ---- tiny JSON-schema subset: type, enum, pattern, min/max(Length|Items|imum), required, properties, additionalProperties, items, $ref ----
function typeOf(v) {
	if (v === null) return 'null';
	if (Array.isArray(v)) return 'array';
	return typeof v;
}
function deref(node) {
	if (!node.$ref) return node;
	return node.$ref.replace(/^#\//, '').split('/').reduce((o, k) => o[k], SCHEMA);
}
/** Returns a list of error strings: `unknown-field:<name>` for extra properties, otherwise `<path>: <what>`. */
export function validateNode(rawNode, value, path = '$') {
	const node = deref(rawNode);
	const errs = [];
	if (node.enum) {
		if (!node.enum.includes(value)) errs.push(`${path}: not in enum`);
		return errs;
	}
	if (node.type) {
		const types = [].concat(node.type);
		const t = typeOf(value);
		const ok = types.includes(t) || (t === 'number' && types.includes('integer') && Number.isInteger(value));
		if (!ok) return [`${path}: expected ${types.join('|')}, got ${t}`];
	}
	if (typeof value === 'string') {
		if (node.minLength != null && value.length < node.minLength) errs.push(`${path}: too short`);
		if (node.maxLength != null && value.length > node.maxLength) errs.push(`${path}: too long`);
		if (node.pattern && !new RegExp(node.pattern).test(value)) errs.push(`${path}: bad format`);
	}
	if (typeof value === 'number') {
		if (!Number.isFinite(value)) errs.push(`${path}: not finite`);
		if (node.minimum != null && value < node.minimum) errs.push(`${path}: below minimum`);
		if (node.maximum != null && value > node.maximum) errs.push(`${path}: above maximum`);
	}
	if (Array.isArray(value)) {
		if (node.minItems != null && value.length < node.minItems) errs.push(`${path}: too few items`);
		if (node.maxItems != null && value.length > node.maxItems) errs.push(`${path}: too many items`);
		if (node.items) value.forEach((v, i) => errs.push(...validateNode(node.items, v, `${path}[${i}]`)));
	}
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		for (const k of node.required ?? []) if (!(k in value)) errs.push(`${path}.${k}: missing`);
		const props = node.properties ?? {};
		for (const [k, v] of Object.entries(value)) {
			if (props[k]) errs.push(...validateNode(props[k], v, `${path}.${k}`));
			else if (node.additionalProperties === false) errs.push(`unknown-field:${k}`);
			else if (node.additionalProperties && typeof node.additionalProperties === 'object') errs.push(...validateNode(node.additionalProperties, v, `${path}.${k}`));
		}
	}
	return errs;
}

/** Collapse a list of validator errors into one counter reason. */
function reasonOf(errs) {
	const unknown = errs.find((e) => e.startsWith('unknown-field:'));
	if (unknown) return 'unknown-field';
	if (errs.some((e) => /\.blurb: too long/.test(e))) return 'blurb-too-long';
	return 'schema';
}

export class Counter {
	constructor() { this.n = {}; }
	add(reason, k = 1) { this.n[reason] = (this.n[reason] ?? 0) + k; }
	get total() { return Object.values(this.n).reduce((a, b) => a + b, 0); }
	toJSON() { return this.n; }
}

/** Parse one enrichment file's text. Returns { results, extracted, error }. Lenient wrapper, strict items. */
export function parseEnrichment(text) {
	let doc;
	try {
		doc = JSON.parse(String(text).replace(/^﻿/, '').trim().replace(/^```(?:json)?\s*|\s*```$/g, ''));
	} catch {
		return { results: [], extracted: {}, error: 'malformed-json' };
	}
	if (Array.isArray(doc)) doc = { results: doc };
	if (!doc || typeof doc !== 'object' || !Array.isArray(doc.results)) return { results: [], extracted: {}, error: 'malformed-structure' };
	const extracted = doc.extracted && typeof doc.extracted === 'object' && !Array.isArray(doc.extracted) ? doc.extracted : {};
	return { results: doc.results, extracted, error: null };
}

/** City value for events.json. The model's answer is accepted only if it names a known German place (or Online/Nationwide);
    `trusted` (the feed's own city hint) may also be a place we have no name for. Returns null when unusable. */
export function checkCity(raw, trusted = false) {
	if (raw == null) return null;
	const s = String(raw).trim();
	if (!s || s.length > 40) return null;
	if (/^online/i.test(s)) return ONLINE;
	if (/^(nationwide|germany|deutschland|bundesweit)$/i.test(s)) return NATIONWIDE;
	const d = detectCity(s);
	if (d) return d;
	return trusted && !containsUrl(s) ? s : null;
}

/** Tidy and check a model cost string (comma decimals, spacing); returns the canonical string or null. */
export function checkCost(s) {
	if (typeof s !== 'string') return null;
	return validateNode(SCHEMA.definitions.cost, s).length ? null : s.replace(',', '.');
}

/**
 * Verify the feed-candidate results.
 * `candidates`: Map<id, fullCandidate> (from work/candidates.full.json). `ctx`: { today, windowDays }.
 * Returns { accepted: [{cand, ...fields}], rejected: [{cand, reason}], deferred: [{cand, reason}], unanswered: [cand], counts }.
 * Candidates with no valid answer are `unanswered` and stay out of the ledger, so the next prepare offers them again.
 */
export function verifyResults(results, candidates, ctx) {
	const counts = new Counter();
	const out = { accepted: [], rejected: [], deferred: [], unanswered: [], counts };
	const answered = new Set();
	const horizon = addDays(ctx.today, ctx.windowDays);
	for (const item of results) {
		if (!item || typeof item !== 'object' || Array.isArray(item)) { counts.add('invalid:not-an-object'); continue; }
		const errs = validateNode(SCHEMA.definitions.result, item);
		if (errs.length) { counts.add('invalid:' + reasonOf(errs)); continue; }
		if (Object.entries(item).some(([k, v]) => k !== 'id' && typeof v === 'string' && containsUrl(v))) { counts.add('invalid:url-in-text'); continue; }
		if (Array.isArray(item.topics) && item.topics.some(containsUrl)) { counts.add('invalid:url-in-text'); continue; }
		const cand = candidates.get(item.id);
		if (!cand) { counts.add('invalid:unknown-id'); continue; }
		if (answered.has(item.id)) { counts.add('invalid:duplicate-id'); continue; }
		const curated = cand.trust === 'curated';
		const needsDetail = item.relevant || curated;
		if (needsDetail) {
			const missing = ['format', 'topics', 'blurb', 'cost', 'confidence'].filter((k) => item[k] == null);
			if (item.relevant && !('city' in item)) missing.push('city');
			if (missing.length) { counts.add('invalid:incomplete'); continue; }
		}
		answered.add(item.id);
		if (cand.start < ctx.today || cand.start > horizon) { counts.add('invalid:out-of-window'); out.unanswered.push(cand); continue; }
		if (!/^https?:\/\//i.test(cand.url ?? '')) { out.deferred.push({ cand, reason: 'no-url' }); counts.add('deferred:no-url'); continue; }
		if (!item.relevant && !curated) { out.rejected.push({ cand, reason: item.reason ?? 'offtopic' }); counts.add('rejected'); continue; }
		if (!curated && item.confidence < 0.6) { out.deferred.push({ cand, reason: 'low-confidence' }); counts.add('deferred:low-confidence'); continue; }
		const city = checkCity(item.city) ?? checkCity(cand.city, true) ?? (cand.online ? ONLINE : null);
		if (!city) { out.deferred.push({ cand, reason: 'no-city' }); counts.add('deferred:no-city'); continue; }
		const feedCost = checkCost(cand.cost);
		out.accepted.push({ cand, city, format: item.format, topics: item.topics.map((t) => t.trim()), blurb: item.blurb.trim(), cost: feedCost ?? item.cost });
	}
	for (const cand of candidates.values()) {
		if (!answered.has(cand.id) && !out.unanswered.includes(cand)) out.unanswered.push(cand);
	}
	return out;
}

// ---- scrape extraction ----
/** Registrable domain, simple heuristic (last two labels; three for co.uk style). */
export function registrable(host) {
	const p = host.toLowerCase().replace(/^www\./, '').split('.');
	if (p.length >= 3 && p[p.length - 1].length === 2 && ['co', 'com', 'org', 'ac', 'gov'].includes(p[p.length - 2])) return p.slice(-3).join('.');
	return p.slice(-2).join('.');
}

const toks = (s) => fold(s).replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length >= 3);
/** Fuzzy: most of the title's words appear in the page text. */
export function titleOnPage(title, pageNorm) {
	const t = toks(title);
	if (!t.length) return false;
	const hit = t.filter((w) => pageNorm.includes(w)).length;
	return hit / t.length >= 0.75;
}
const validDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && new Date(d + 'T00:00:00Z').toISOString().slice(0, 10) === d;

/**
 * Verify extracted events of one scrape page.
 * `page`: { text, links: [{text,url}], url (page address), curated, cityHint }. Returns { accepted: [...], counts }.
 */
export function verifyExtracted(items, page, ctx, counts = new Counter()) {
	const accepted = [];
	if (!Array.isArray(items)) { counts.add('extract:invalid:not-a-list'); return { accepted, counts }; }
	const linkSet = new Set(page.links.map((l) => l.url));
	const pageNorm = fold(page.text);
	const pageHost = registrable(new URL(page.url).hostname);
	const horizon = addDays(ctx.today, ctx.windowDays);
	for (const item of items) {
		if (!item || typeof item !== 'object' || Array.isArray(item)) { counts.add('extract:invalid:not-an-object'); continue; }
		const errs = validateNode(SCHEMA.definitions.extractedEvent, item);
		if (errs.length) { counts.add('extract:invalid:' + reasonOf(errs)); continue; }
		if (['title', 'organiser', 'venue', 'blurb'].some((k) => containsUrl(item[k])) || item.topics.some(containsUrl)) { counts.add('extract:invalid:url-in-text'); continue; }
		let u;
		try { u = new URL(item.url); } catch { counts.add('extract:invalid:bad-url'); continue; }
		if (!/^https?:$/.test(u.protocol)) { counts.add('extract:invalid:bad-url'); continue; }
		if (!linkSet.has(item.url) && registrable(u.hostname) !== pageHost) { counts.add('extract:invalid:url-not-on-page'); continue; }
		if (!validDate(item.date) || (item.endDate && !validDate(item.endDate))) { counts.add('extract:invalid:bad-date'); continue; }
		const end = item.endDate ?? item.date;
		if (item.date < ctx.today || item.date > horizon || end < item.date) { counts.add('extract:invalid:out-of-window'); continue; }
		if (!page.curated && daysBetween(item.date, end) > MAX_EVENT_DAYS) { counts.add('extract:invalid:too-long'); continue; }
		if (!titleOnPage(item.title, pageNorm)) { counts.add('extract:invalid:title-not-on-page'); continue; }
		const city = checkCity(item.city) ?? checkCity(page.cityHint, true);
		if (!city) { counts.add('extract:invalid:no-city'); continue; }
		accepted.push({ ...item, city, cost: checkCost(item.cost) ?? 'Not listed', end });
	}
	return { accepted, counts };
}
