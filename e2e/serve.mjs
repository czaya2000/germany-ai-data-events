// Playwright webServer: builds the site from the fixture events with "today" frozen
// (SITE_TODAY) into dist-e2e/, then serves that build with `astro preview`.
// Nothing here touches dist/ or src/data/.
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const port = process.argv[2] || '4329';
const root = fileURLToPath(new URL('..', import.meta.url));
const env = {
	...process.env,
	E2E_EVENTS: 'e2e/fixtures/events.json',
	E2E_OUT: './dist-e2e',
	SITE_TODAY: '2026-11-18', // a Wednesday; Monday 16 .. Sunday 22 is "this week"
};
const astro = ['node_modules/astro/bin/astro.mjs'];

if (!process.env.E2E_SKIP_BUILD) {
	const b = spawnSync(process.execPath, [...astro, 'build'], { cwd: root, env, stdio: 'inherit' });
	if (b.status !== 0) process.exit(b.status ?? 1);
}
if (process.argv.includes('--build-only')) process.exit(0);
const p = spawn(process.execPath, [...astro, 'preview', '--port', port, '--host', '127.0.0.1'], {
	cwd: root,
	env,
	stdio: 'inherit',
});
p.on('exit', (c) => process.exit(c ?? 0));
