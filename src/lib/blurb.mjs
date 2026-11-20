// Which blurb to show for a locale (plain .mjs so the offline tests can import it without Astro).
// 'de' uses blurb_de and falls back to the English text; 'en' uses blurb_en, then the legacy blurb.
// Returns { text, lang } where lang is the language the text is actually in.
export function blurbFor(event, locale) {
	if (locale === 'de' && event.blurb_de) return { text: event.blurb_de, lang: 'de' };
	return { text: event.blurb_en ?? event.blurb ?? '', lang: 'en' };
}
