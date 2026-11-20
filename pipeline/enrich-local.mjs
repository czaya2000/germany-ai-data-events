// pipeline:enrich-local - run the Claude step locally, one unit (chunk) at a time, with the `claude` CLI.
// That is Claude Code using its own login: this script never calls an API and never touches a token.
//
//   npm run pipeline:enrich-local -- --limit 10        first 10 candidates of the first chunk (a small test batch)
//   npm run pipeline:enrich-local                      every chunk (and the page task), skipping units already answered
//   options: --chunk N | --force | --dry-run | --model haiku | --max-turns 8 | --timeout-min 10
//
// Each unit gets its own TASK.md next to its input, so Claude only needs Read and Write:
//   work/chunk-NN/{input.json, TASK.md} -> work/chunk-NN/enrichment.json
//   work/{TASK.md, candidates.json, pages/} -> work/enrichment.json  (daily mode, or the pages-only unit in bootstrap mode)
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE_SCOPE } from '../config/country.mjs';
import { renderTask } from './lib/work.mjs';
import { parseEnrichment } from './lib/verify.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const WORK = join(ROOT, 'work');

export function parseArgs(argv) {
	const o = { limit: 0, chunk: 0, force: false, dry: false, model: process.env.CLAUDE_MODEL || 'haiku', maxTurns: 8, timeoutMin: 10 };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--limit') o.limit = Number(argv[++i]);
		else if (a === '--chunk') o.chunk = Number(argv[++i]);
		else if (a === '--force') o.force = true;
		else if (a === '--dry-run') o.dry = true;
		else if (a === '--model') o.model = argv[++i];
		else if (a === '--max-turns') o.maxTurns = Number(argv[++i]);
		else if (a === '--timeout-min') o.timeoutMin = Number(argv[++i]);
		else throw new Error(`unknown option ${a}`);
	}
	if (!Number.isInteger(o.limit) || o.limit < 0) throw new Error('--limit needs a positive integer');
	return o;
}

const rel = (p) => p.slice(ROOT.length).replaceAll('\\', '/');
const readJson = (p, d) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : d);

/** Work out the units to run from what prepare left in work/. */
export function planUnits(work, opts) {
	const chunks = existsSync(work) ? readdirSync(work).filter((n) => /^chunk-\d+$/.test(n)).sort() : [];
	const pages = existsSync(join(work, 'pages'))
		? readdirSync(join(work, 'pages')).filter((n) => n.endsWith('.txt')).map((n) => n.slice(0, -4))
		: [];
	const units = [];
	if (chunks.length) {
		for (const c of chunks) units.push({ name: c, dir: join(work, c), cands: readJson(join(work, c, 'candidates.json'), []), pages: [] });
		if (pages.length) units.push({ name: 'pages', dir: work, cands: [], pages });
	} else {
		const cands = readJson(join(work, 'candidates.json'), []);
		if (cands.length || pages.length) units.push({ name: 'work', dir: work, cands, pages });
	}
	if (opts.limit) {
		// Test batch: the first unit that has candidates, first N of them, no page work.
		const u = units.find((x) => x.cands.length);
		return u ? [{ ...u, cands: u.cands.slice(0, opts.limit), pages: [], limited: true }] : [];
	}
	if (opts.chunk) return units.filter((u) => u.name === `chunk-${String(opts.chunk).padStart(2, '0')}`);
	return units;
}

/** Write the unit's input and TASK.md; returns { taskPath, outPath }. */
export function writeUnit(u) {
	const inputPath = u.dir === WORK && !u.limited ? join(u.dir, 'candidates.json') : join(u.dir, 'input.json');
	const outPath = join(u.dir, 'enrichment.json');
	if (inputPath.endsWith('input.json')) writeFileSync(inputPath, JSON.stringify(u.cands));
	const task = renderTask({
		scope: SITE_SCOPE,
		candidatesFile: u.cands.length ? rel(inputPath) : null,
		count: u.cands.length,
		outputFile: rel(outPath),
		pages: u.pages,
	});
	const taskPath = join(u.dir, 'TASK.md');
	writeFileSync(taskPath, task);
	return { taskPath, outPath };
}

export const promptFor = (taskPath, outPath) =>
	`Read ${rel(taskPath)} and follow it. Write only ${rel(outPath)}. Do not edit, create or delete any other file. Do not run commands.`;

export const claudeArgs = (o) => ['-p', '--model', o.model, '--max-turns', String(o.maxTurns), '--allowedTools', 'Read,Write', '--output-format', 'json'];

/** Spawn `claude` directly (no shell). On Windows Node resolves claude.exe via PATH/PATHEXT; the native installer ships an .exe, not a .cmd shim. */
export const claudeCommand = (args) => ['claude', args];

/** Run `claude -p` with the prompt on stdin (no shell quoting issues). Resolves { code, json, stderr, ms }. */
export function runClaude(prompt, o) {
	return new Promise((resolve) => {
		const t0 = Date.now();
		const [cmd, cmdArgs] = claudeCommand(claudeArgs(o));
		const child = spawn(cmd, cmdArgs, { cwd: ROOT, stdio: ['pipe', 'pipe', 'pipe'] });
		let out = '', err = '';
		const timer = setTimeout(() => child.kill(), o.timeoutMin * 60000);
		child.stdout.on('data', (d) => (out += d));
		child.stderr.on('data', (d) => (err += d));
		child.on('error', (e) => { clearTimeout(timer); resolve({ code: -1, stderr: String(e.message), ms: Date.now() - t0 }); });
		child.on('close', (code) => {
			clearTimeout(timer);
			let json = null;
			try { json = JSON.parse(out); } catch { /* keep raw */ }
			resolve({ code, json, raw: out.slice(0, 300), stderr: err.slice(0, 300), ms: Date.now() - t0 });
		});
		child.stdin.end(prompt);
	});
}

async function main() {
	const o = parseArgs(process.argv.slice(2));
	const units = planUnits(WORK, o);
	if (!units.length) {
		console.log('Nothing to do: run `npm run pipeline:prepare` first (work/ has no candidates or pages).');
		return;
	}
	let ok = 0, failed = 0;
	for (const u of units) {
		const { taskPath, outPath } = writeUnit(u);
		const label = `${u.name}${u.limited ? ` (first ${u.cands.length})` : ''}: ${u.cands.length} candidate(s), ${u.pages.length} page(s)`;
		if (!o.limit && !o.force && existsSync(outPath) && !parseEnrichment(readFileSync(outPath, 'utf8')).error) {
			console.log(`${label} -> already answered, skipped (use --force to redo)`);
			continue;
		}
		const prompt = promptFor(taskPath, outPath);
		if (o.dry) {
			console.log(`${label}\n  would run: claude ${claudeArgs(o).join(' ')}\n  prompt: ${prompt}\n  task: ${rel(taskPath)}`);
			continue;
		}
		console.log(`${label} ...`);
		const r = await runClaude(prompt, o);
		const parsed = existsSync(outPath) ? parseEnrichment(readFileSync(outPath, 'utf8')) : { error: 'no output file', results: [] };
		const turns = r.json?.num_turns, cost = r.json?.total_cost_usd;
		console.log(`  exit ${r.code}, ${Math.round(r.ms / 1000)} s${turns != null ? `, ${turns} turns` : ''}${cost != null ? `, reported cost ${cost} USD` : ''}; ` +
			(parsed.error ? `OUTPUT PROBLEM: ${parsed.error}${r.stderr ? ' | ' + r.stderr : ''}` : `${parsed.results.length} result(s), ${Object.keys(parsed.extracted ?? {}).length} page(s) written`));
		if (parsed.error) failed++; else ok++;
	}
	if (!o.dry) console.log(`Done: ${ok} unit(s) answered, ${failed} failed. Next: npm run pipeline:apply`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch((e) => {
		console.error('enrich-local failed:', e.message);
		process.exit(1);
	});
}
