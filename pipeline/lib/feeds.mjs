// RSS 2.0 and Atom parsing with fast-xml-parser.
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '@_',
	textNodeName: '#text',
	cdataPropName: '#cdata',
	processEntities: true,
	trimValues: true,
});

const arr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
function text(x) {
	if (x == null) return '';
	if (typeof x === 'string' || typeof x === 'number') return String(x);
	if (x['#cdata'] != null) return text(x['#cdata']);
	if (x['#text'] != null) return String(x['#text']);
	return '';
}

/** -> [{ title, link, guid, pubDate, description, categories }] */
export function parseRss(xml) {
	let doc;
	try { doc = parser.parse(xml); } catch { return []; }
	const items = arr(doc?.rss?.channel?.item);
	return items.map((it) => ({
		title: text(it.title),
		link: text(it.link),
		guid: text(it.guid),
		pubDate: text(it.pubDate),
		description: text(it.description),
		categories: arr(it.category).map(text),
	}));
}

/** -> [{ title, link, published, updated, id, summary, content }] */
export function parseAtom(xml) {
	let doc;
	try { doc = parser.parse(xml); } catch { return []; }
	return arr(doc?.feed?.entry).map((e) => {
		const links = arr(e.link);
		const alt = links.find((l) => (l['@_rel'] ?? 'alternate') === 'alternate') ?? links[0];
		return {
			title: text(e.title),
			link: alt?.['@_href'] ?? '',
			published: text(e.published),
			updated: text(e.updated),
			id: text(e.id),
			summary: text(e.summary),
			content: text(e.content),
		};
	});
}
