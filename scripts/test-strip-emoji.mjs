// Unit checks for stripEmoji. Usage: node scripts/test-strip-emoji.mjs
import assert from 'node:assert/strict';
import { stripEmoji } from '../src/lib/strip-emoji.mjs';

const cases = [
	["\u{1F965} ConUt - Paris : Tous artistes avec L'IA ?", "ConUt - Paris : Tous artistes avec L'IA ?"],
	['\u{1F680}\u{1F680} AI Meetup \u{1F389}\u{1F389}\u{1F389}', 'AI Meetup'],
	['Data & AI #3 – München 2026', 'Data & AI #3 – München 2026'],
	['Café IA \u{1F375}\u{1F375}\u{1F375}  Lyon', 'Café IA Lyon'],
	["DatApéro #18 : Maman, j'ai raté une intrusion \u{1F631}\u{1F384}!", "DatApéro #18 : Maman, j'ai raté une intrusion !"],
	['\u{1F1EB}\u{1F1F7} Paris | AI \u{1F44D}\u{1F3FD} ❤️ | ', 'Paris | AI'],
	['\u{1F468}‍\u{1F4BB} Dev Day - ', 'Dev Day'],
	['1️⃣ Keycap 2026 *new* #1', '1 Keycap 2026 *new* #1'],
	['Plain title 2026', 'Plain title 2026'],
	['Ärzte öffnen über ßtraße été ñ + / & #', 'Ärzte öffnen über ßtraße été ñ + / & #'],
];
let fail = 0;
for (const [input, want] of cases) {
	const got = stripEmoji(input);
	try { assert.equal(got, want); assert.equal(stripEmoji(got), got); console.log('ok   ' + JSON.stringify(want)); }
	catch { fail++; console.log(`FAIL ${JSON.stringify(input)} -> ${JSON.stringify(got)} (want ${JSON.stringify(want)})`); }
}
console.log(`${cases.length - fail}/${cases.length} passed`);
process.exit(fail ? 1 : 0);
