// Markdown run report.
const row = (cells) => '| ' + cells.join(' | ') + ' |';
const table = (head, rows) => [row(head), row(head.map(() => '---')), ...rows.map(row)].join('\n');

export function buildReport(r) {
	const L = [];
	L.push('# Prepare run report', '');
	L.push(`- Date: ${r.today} (window ${r.windowDays} days), mode: ${r.bootstrap ? 'bootstrap' : 'daily'}${r.limit ? `, --limit ${r.limit}` : ''}`);
	L.push(`- Feed sources: ${r.feedOk}/${r.feedTotal} reachable (${r.feedTotal ? Math.round((100 * r.feedOk) / r.feedTotal) : 0}%)`);
	L.push(`- Totals: fetched ${r.totals.fetched}, in-window German ${r.totals.inWindow}, after keyword filter ${r.totals.kept}, after dedupe ${r.totals.clusters}, known ${r.totals.known}, new ${r.totals.new}, sent to Claude ${r.totals.sent}, deferred by cap ${r.totals.deferred}`);
	L.push(`- Ledger: ${r.ledgerEntries} entries, ${r.pruned} pruned`);
	L.push('');
	L.push('## Per source (feed)', '');
	L.push('Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.', '');
	L.push(table(
		['source', 'trust', 'fetched', 'in-window DE', 'kept', 'dedupe', 'primary', 'errors', 'ms', 'status'],
		r.sources.map((s) => [s.id, s.trust, s.fetched, s.inWindow, s.kept, s.inClusters, s.primary, s.error ? 1 : 0, s.ms, s.error ? 'FAILED: ' + s.error : s.fetched === 0 ? 'empty' : 'ok']),
	));
	L.push('');
	if (r.scrape.length) {
		L.push('## Scrape sources', '');
		L.push(table(['source', 'status', 'text chars', 'links', 'detail'], r.scrape.map((s) => [s.id, s.status, s.chars ?? '', s.links ?? '', s.detail ?? ''])));
		L.push('');
	}
	L.push('## Per city (after dedupe)', '');
	L.push(table(['city group', 'clusters', 'known', 'new'], r.cities.map((c) => [c.city, c.total, c.known, c.new])));
	L.push('');
	L.push('Places inside "Other Germany" (after dedupe): ' + (r.otherPlaces.map((p) => `${p.city} ${p.n}`).join(', ') || 'none'));
	L.push('');
	L.push('## Dropped by filters (all sources)', '');
	L.push(table(['reason', 'count'], Object.entries(r.drops).map(([k, v]) => [k, v])));
	L.push('');
	L.push('## 10 largest dedupe clusters', '');
	L.push(table(['members', 'title', 'sources'], r.topClusters.map((c) => [c.n, c.title.replace(/\|/g, '/'), c.sources.join(', ')])));
	L.push('');
	L.push('## Failed or empty sources', '');
	L.push(r.problems.length ? r.problems.map((p) => `- ${p}`).join('\n') : '- none');
	L.push('');
	if (r.discovered.length) {
		L.push('## Meetup group discovery', '');
		L.push(r.discovered.map((d) => `- ${d.group}: ${d.icsOk ? 'ICS ok' : 'no ICS'}`).join('\n'));
		L.push('');
	}
	if (r.notes.length) L.push('## Notes', '', ...r.notes.map((n) => `- ${n}`), '');
	return L.join('\n');
}
