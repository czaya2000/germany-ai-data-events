import { defineConfig, devices } from '@playwright/test';

/* The e2e suite runs against a separate build of fixture events (e2e/fixtures/events.json)
   with "today" frozen at build time (SITE_TODAY) and in the browser (page.clock).
   See AGENTS.md "End-to-end tests". */
const PORT = 4329;
export default defineConfig({
	testDir: 'e2e',
	timeout: 20_000,
	fullyParallel: true,
	reporter: [['list']],
	outputDir: 'test-results',
	use: {
		baseURL: `http://localhost:${PORT}`,
		// Deliberately not Europe/Berlin: the site must not depend on the visitor's time zone.
		timezoneId: 'America/Los_Angeles',
		locale: 'en-GB',
		trace: 'retain-on-failure',
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
		{
			name: 'mobile',
			use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, hasTouch: true },
		},
	],
	webServer: {
		command: `node e2e/serve.mjs ${PORT}`,
		url: `http://localhost:${PORT}/`,
		reuseExistingServer: !process.env.CI,
		timeout: 240_000,
	},
});
