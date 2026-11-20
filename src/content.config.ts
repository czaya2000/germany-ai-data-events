import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const eventSchema = z.object({
	title: z.string(),
	date: z.string(),
	endDate: z.string().optional(),
	time: z.string().optional(),
	city: z.string(),
	venue: z.string().optional(),
	format: z.enum(['Meetup', 'Conference', 'Workshop', 'Networking', 'Webinar']),
	topics: z.array(z.string()),
	organiser: z.string(),
	cost: z.string(),
	url: z.string().url(),
	source: z.string(),
	blurb: z.string(),
	blurb_en: z.string().optional(),
	blurb_de: z.string().optional(),
	firstSeen: z.string(),
});

const events = defineCollection({
	// E2E_EVENTS: test builds read fixture events instead (see AGENTS.md "End-to-end tests").
	loader: file(process.env.E2E_EVENTS || 'src/data/events.json'),
	schema: eventSchema,
});

/* Ended events, moved here by scripts/archive-past.mjs. They keep their
   page (marked as a past event) but never appear in listings or feeds. */
const archive = defineCollection({
	loader: file('src/data/archive.json'),
	schema: eventSchema,
});

export const collections = { events, archive };
