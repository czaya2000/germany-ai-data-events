// One-shot, idempotent data migration: junk organiser values -> cleaned / url domain, and city precedence
// (venue, then url, beats a conflicting feed city). Applies to src/data/events.json and archive.json.
// Usage: node scripts/fix-existing-data.mjs [--dry-run]
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { organiserOrDomain } from '../pipeline/lib/normalize.mjs';
import { resolveCity } from '../pipeline/lib/city.mjs';

const dry = process.argv.includes('--dry-run');
const files = ['events.json', 'archive.json'].map((f) => fileURLToPath(new URL('../src/data/' + f, import.meta.url)));
const orgChanges = [];
const cityChanges = [];

for (const file of files) {
	if (!existsSync(file)) continue;
	const raw = readFileSync(file, 'utf8');
	const list = JSON.parse(raw);
	if (!Array.isArray(list)) continue;
	let touched = false;
	for (const ev of list) {
		const organiser = organiserOrDomain(ev.organiser, ev.url);
		// Also turns an aggregator domain stored by the old fallback (aieventlist.ai, luma.com, ...) into "Not listed".
		if (organiser && organiser !== ev.organiser) {
			orgChanges.push(`${ev.id}: "${ev.organiser}" -> "${organiser}"`);
			ev.organiser = organiser;
			touched = true;
		}
		const city = resolveCity({ city: ev.city, venue: ev.venue, url: ev.url });
		if (city && city !== ev.city) {
			cityChanges.push(`${ev.id}: ${ev.city} -> ${city} (${ev.title})`);
			if (ev.venue === ev.city) ev.venue = city; // venue was only the old city name echoed
			ev.city = city;
			touched = true;
		}
	}
	// Keep the file's existing indentation (tabs or two spaces) and trailing newline.
	const indent = /^\[\s*\n\t/.test(raw) ? '\t' : 2;
	if (touched && !dry) writeFileSync(file, JSON.stringify(list, null, indent) + (raw.endsWith('\n') ? '\n' : ''));
}

console.log(`Organiser fixed: ${orgChanges.length}`);
for (const l of orgChanges) console.log('  ' + l);
console.log(`City changed: ${cityChanges.length}`);
for (const l of cityChanges) console.log('  ' + l);
if (dry) console.log('(dry run, nothing written)');
