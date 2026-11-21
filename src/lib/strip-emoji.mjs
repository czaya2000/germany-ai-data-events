// Strip emoji and pictographic symbols from an event title. Organisers decorate titles with them;
// we remove them everywhere. Do NOT use \p{Emoji} alone: it also matches digits, # and *.
const EMOJI = /[\p{Extended_Pictographic}\p{Emoji_Presentation}\u{FE0F}\u{FE0E}\u{200D}\u{20E3}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}]/gu;
const HAS_EMOJI = new RegExp(EMOJI.source, 'u');

/** Title without emoji; whitespace collapsed, dangling leading/trailing separators removed. Idempotent;
    a title with no emoji is returned untouched. Non-strings pass through. */
export function stripEmoji(title) {
	if (typeof title !== 'string' || !HAS_EMOJI.test(title)) return title;
	return title
		.replace(EMOJI, ' ')
		.replace(/\s+/g, ' ')
		.replace(/^[\s\-–—|:·•,;/]+/, '')
		.replace(/[\s\-–—|:·•,;/]+$/, '')
		.trim();
}
