/* English UI strings. This file defines the shape: de.ts is typed as the same
   `Messages`, so a key missing from either language is a type error.
   Strings with variables are functions. Product name: see SITE_NAME in
   config/country.mjs (kept in English in both languages for now). */

export const en = {
	site: {
		tagline:
			"Upcoming AI and data events across Germany: conferences, meetups and workshops in one place, each checked daily against the organiser's page.",
		headline: 'Discover AI & Data Events Across Germany',
		subheadline: 'Conferences, meetups and workshops in one place, checked daily.',
		scope: (name: string) =>
			`${name} is a curated list of upcoming AI and data events in Germany: ` +
			'meetups, conferences, workshops, networking evenings and webinars about machine learning, generative AI, ' +
			'data engineering, analytics, data platforms (Databricks, Snowflake, Microsoft Fabric), data governance and applied AI. ' +
			"Every listing links to the organiser's own page, and the list is refreshed every day. " +
			"Registration always happens on the organiser's site.",
		homeTitle: (name: string) => `${name} — AI & data events across Germany`,
		countryName: 'Germany',
		feedTitle: (name: string) => `${name}: upcoming AI and data events in Germany`,
	},

	/** Stored place names (as in events.json) that display differently. Others show as stored. */
	placeNames: { 'Online (DE)': 'Online' } as Record<string, string>,

	base: {
		rssTitle: 'upcoming events',
		jsonTitle: 'events (JSON)',
	},

	nav: {
		home: 'Home',
		calendarOpen: 'Save to my calendar',
		contact: 'Contact',
		linkedin: 'Connect on LinkedIn',
		langSwitch: 'Language',
		langName: { de: 'Deutsch', en: 'English' },
	},

	footer: {
		backToAll: 'Back to all events',
		dataFeeds: 'Data & feeds',
		dataFeedsSuffix: ' for apps and AI agents',
		privacy: 'Privacy',
		impressum: 'Legal notice',
		germanOnly: (name: string) => `${name} — Germany only, AI and data focus for now.`,
		submit: 'Submit an event',
		weeklyDigest: 'Weekly digest',
		sponsor: 'Reach German data leaders? Get in touch',
		linksAria: 'Site',
	},

	listing: {
		search: 'Search',
		searchPlaceholder: 'Search title, organiser, topic…',
		city: 'City',
		format: 'Format',
		cities: 'Cities',
		formats: 'Formats',
		clear: 'Clear',
		saveCal: 'Save to my calendar',
		timeRange: 'Time range',
		all: 'All',
		thisWeek: 'This week',
		thisMonth: 'This month',
		breadcrumb: 'Breadcrumb',
		allEvents: 'All events',
		newSr: '(new)',
		through: (day: number, month: string) => `to ${day} ${month}`,
		today: 'Today',
		runsUntil: (day: number | string, month: string) => `until ${day} ${month}`,
		countOne: '1 event',
		countMany: '{n} events',
		shown: 'shown',
		lastScanned: (when: string) => `Last scanned ${when}.`,
		browseAria: 'Browse events by city and type',
		byCity: 'By city',
		otherCities: 'Other cities',
		byType: 'By type',
		otherTypes: 'Other types',
		digestDefault: 'Every Monday, the next two weeks of events in your inbox.',
		digestOnline: 'Every Monday, the next two weeks of online events in your inbox.',
		digestCity: (label: string) => `Every Monday, the next two weeks of ${label} events in your inbox.`,
		digestFormat: (many: string) => `Every Monday, the next two weeks of ${many} in your inbox.`,
		emptyHub: (many: string, where: string) =>
			`No upcoming ${many} ${where} right now. The weekly digest will tell you when one is added.`,
		emptyAll:
			'No events listed yet. The list fills in after the daily refresh has run; the weekly digest will say when it does.',
		emptyFiltered: 'No events match those filters.',
	},

	hub: {
		h1City: (label: string) => `AI & Data Events in ${label}`,
		h1Online: 'Online AI & Data Events in Germany',
		h1Other: 'AI & Data Events in Other German Cities',
		h1Format: (plural: string) => `AI & Data ${plural} in Germany`,
		whereCity: (label: string) => `in ${label}`,
		whereOnline: 'online',
		whereOther: 'in other German cities',
		whereFormat: 'across Germany',
		noneNow: (many: string, where: string) => `No upcoming ${many} ${where} right now.`,
		subCity: (n: number, noun: string, where: string) =>
			`${n} upcoming ${noun} ${where}: conferences, meetups and workshops, checked daily.`,
		subFormat: (n: number, noun: string, where: string) => `${n} upcoming ${noun} ${where}, checked daily.`,
		/** Noun for a city hub's count line (singular, plural). */
		cityNoun: ['event', 'events'] as [string, string],
		intro: (nearby: string) => `This page also covers ${nearby}.`,
		metaCity: (where: string) =>
			`Upcoming AI and data events ${where}: conferences, meetups and workshops, each checked daily against the organiser's page.`,
		metaFormat: (many: string) =>
			`Upcoming AI and data ${many} across Germany, each checked daily against the organiser's page.`,
		/** Smaller places folded into a city hub. */
		nearby: {
			berlin: 'Potsdam',
			munich: 'Garching and Ingolstadt',
			hamburg: 'Norderstedt',
			frankfurt: 'Darmstadt, Mainz, Wiesbaden, Königstein and Kaiserslautern',
			cologne: 'Bonn, Düsseldorf, Duisburg and Königswinter',
			stuttgart: 'Tübingen and Ludwigsburg',
			online: '',
			'other-germany': 'Leipzig, Dresden, Nuremberg, Karlsruhe, Heidelberg, Münster, Ulm, Kassel and more',
		} as Record<string, string>,
		/** Per event type (keys are the stored enum values). */
		formats: {
			Meetup: { label: 'Meetup', plural: 'Meetups', one: 'meetup', many: 'meetups', link: 'Meetups', upOne: 'meetup', upMany: 'meetups' },
			Conference: { label: 'Conference', plural: 'Conferences', one: 'conference', many: 'conferences', link: 'Conferences', upOne: 'conference', upMany: 'conferences' },
			Workshop: { label: 'Workshop', plural: 'Workshops', one: 'workshop', many: 'workshops', link: 'Workshops', upOne: 'workshop', upMany: 'workshops' },
			Networking: { label: 'Networking', plural: 'Networking Events', one: 'networking event', many: 'networking events', link: 'Networking', upOne: 'networking event', upMany: 'networking events' },
			Webinar: { label: 'Webinar', plural: 'Webinars', one: 'webinar', many: 'webinars', link: 'Webinars', upOne: 'webinar', upMany: 'webinars' },
		} as Record<string, { label: string; plural: string; one: string; many: string; link: string; upOne: string; upMany: string }>,
	},

	event: {
		pastPrefix: 'Past event: ',
		pastDescription: (date: string, where: string, format: string, blurb: string) =>
			`This event took place on ${date} · ${where} · ${format}. ${blurb}`,
		allEvents: '← All events',
		onlineEvents: 'Online events',
		eventsIn: (label: string) => `Events in ${label}`,
		breadcrumb: 'Breadcrumb',
		endedTitle: 'This event has ended.',
		endedNote: (date: string) => `It took place on ${date}. The details below are kept for reference.`,
		dates: 'Dates',
		time: 'Time',
		city: 'City',
		venue: 'Venue',
		organiser: 'Organiser',
		organiserNotListed: 'Not listed',
		format: 'Format',
		cost: 'Cost',
		topics: 'Topics',
		verifiedVia: 'Verified via',
		registerTitle: 'Register with the organiser',
		registerNote: (source: string) =>
			`Registration is handled on ${source}. We do not sell tickets or take a commission.`,
		goTo: (source: string) => `Go to ${source} ↗`,
		disclosure: (name: string) =>
			`Every listing on ${name} is checked against its original source page before publishing. Details can change on the organiser's side — always confirm on the link above before you go.`,
		upcomingIn: (city: string) => `Upcoming in ${city}`,
		upcomingEvents: 'Upcoming events',
		seeAllUpcoming: 'See all upcoming events',
	},

	subscribe: {
		defaultNote: 'Every Monday, the next two weeks of events in your inbox.',
		emailLabel: 'Email address',
		emailPlaceholder: 'you@company.com',
		open: 'Get weekly digest',
		dialogTitle: 'Your weekly digest',
		close: 'Close',
		intro: 'Pick cities and event types, or leave them blank to get everything.',
		language: 'Email language',
		languageHelp: 'The language of your weekly email. The events are the same.',
		cities: 'Cities',
		types: 'Event types',
		submit: 'Subscribe',
		confirmBefore: "We'll send a confirmation email to ",
		confirmAfter: '.',
	},

	calendar: {
		title: 'Save to my calendar',
		close: 'Close',
		intro: 'Subscribe once and new events matching your choice appear in your calendar.',
		city: 'City',
		allCities: 'All cities',
		format: 'Format',
		allFormats: 'All formats',
		google: 'Google Calendar',
		apple: 'Apple / other apps',
		outlook: 'Outlook.com',
		office: 'Microsoft 365',
		linkLabel: 'Calendar link',
		copy: 'Copy link',
		copied: 'Copied',
		pressCtrlC: 'Press Ctrl+C',
		note: 'Your calendar updates automatically. Google may take up to 24 h to show changes.',
		none: 'No upcoming events match. Try "All" for one of the filters.',
		one: '1 upcoming event matches',
		many: '{n} upcoming events match',
		feedName: (site: string, parts: string[]) => [site, ...parts].join(' – '),
	},

	ics: {
		calDesc: (country: string, host: string) => `Upcoming AI and data events in ${country}, from ${host}`,
		runsUntil: (date: string) => `Runs until ${date} — see the event page for session dates.`,
		organiser: (name: string) => `Organiser: ${name}`,
		details: (url: string) => `Details and registration: ${url}`,
		online: 'Online',
	},

	submit: {
		title: (name: string) => `Submit an event — ${name}`,
		description:
			'Organising an AI or data event in Germany? Send it in — every listing is checked against the organiser’s page before it goes live.',
		h1: 'Submit an event',
		intro:
			'Organising an AI or data event in Germany? Send it in. Listing is free. Every event is checked against its original page before it goes live, so please link to the page where people actually register.',
		scope:
			"What fits: conferences, meetups, workshops, webinars and networking events for AI and data professionals, held in Germany or run by a German organiser. What doesn't: generic business networking, syndicated global webinars, vendor sales pitches without a real agenda.",
		subject: (name: string) => `Event submission — ${name}`,
		legendEvent: 'The event',
		legendYou: 'You',
		eventTitle: 'Event title',
		startDate: 'Start date',
		endDate: 'End date',
		endDateHint: '(if multi-day)',
		city: 'City',
		cityPlaceholder: 'Berlin, Munich, Online…',
		venue: 'Venue',
		optional: '(optional)',
		format: 'Format',
		choose: 'Choose…',
		cost: 'Cost',
		costPlaceholder: 'Free, EUR 150, …',
		url: 'Registration page URL',
		blurb: 'One-paragraph description',
		blurbHint: "(what it is, who it's for)",
		organiser: 'Organiser',
		name: 'Your name',
		email: 'Email',
		featured:
			"I'd be interested in a featured placement or the weekly digest for this event — tell me more.",
		send: 'Send for review',
		invalid: {
			required: 'Please fill in this field.',
			email: 'Please enter a valid email address.',
			url: 'Please enter a full web address, starting with https://',
			date: 'Please choose a date.',
			choose: 'Please choose an option.',
			endBeforeStart: 'The end date cannot be before the start date.',
		},
		thanksTitle: (name: string) => `Event received — ${name}`,
		thanksDescription: 'Thanks for submitting an event.',
		thanksH1: 'Thanks — received.',
		thanksText:
			"I check every submission against the original page before it goes live, usually within a couple of days. You'll hear from me either way.",
	},

	contact: {
		title: (name: string) => `Contact — ${name}`,
		description: 'Suggest an event, flag a wrong detail, or just say hi.',
		h1: 'Contact',
		introBefore:
			"Spotted a wrong date, know an event that should be listed, or just want to say hi? Send a note — it goes straight to my inbox. Organisers: there's a ",
		introLink: 'dedicated form',
		introAfter: ' for new events.',
		introSponsor:
			"Want to put your company, product or conference in front of Germany's data and AI leaders? Tell me a little about what you're after and I'll come back with what's possible — featured listings, a slot in the weekly digest, or something we haven't thought of yet.",
		subject: (name: string) => `New message from ${name}`,
		subjectSponsor: (name: string) => `Sponsor enquiry — ${name}`,
		name: 'Name',
		email: 'Email',
		message: 'Message',
		send: 'Send message',
		linkedinBefore: 'Prefer LinkedIn? ',
		linkedinLink: 'Connect with me there',
		linkedinAfter: ' instead.',
		thanksTitle: (name: string) => `Message sent — ${name}`,
		thanksDescription: 'Thanks for reaching out.',
		thanksH1: 'Thanks — message sent.',
		thanksText: "I'll get back to you as soon as I can.",
	},

	thanks: {
		backToAll: '← Back to all events',
		seeAll: 'See all events →',
		inboxTitle: (name: string) => `Check your inbox — ${name}`,
		inboxDescription: 'Confirm your subscription to the weekly digest.',
		inboxH1: 'Check your inbox.',
		inboxText:
			"We've sent you a confirmation email. Click the link in it and you're on the list. The digest goes out on Monday mornings, and every email has a link to change your cities and event types.",
		confirmedTitle: (name: string) => `You're subscribed — ${name}`,
		confirmedDescription: 'Your weekly digest subscription is confirmed.',
		confirmedH1: "You're on the list.",
		confirmedText:
			'Your first digest arrives on Monday morning: the next two weeks of events, plus new additions. Every email has a link to change your cities and event types.',
	},

	notFound: {
		title: (name: string) => `Page not found — ${name}`,
		description: 'This page does not exist. See all upcoming AI and data events in Germany.',
		h1: 'Page not found.',
		text: 'There is nothing at this address. The event may have been renamed, or the link may be mistyped.',
		seeAll: 'See all upcoming events',
		orCity: 'Or go to a city: ',
	},

	data: {
		title: (name: string) => `Data & feeds — ${name}`,
		description: (name: string) =>
			`The ${name} event list as JSON, RSS, iCalendar and plain markdown (llms.txt), for apps, feed readers and AI agents.`,
		h1: 'Data & feeds',
		intro: (name: string) =>
			`The event list is free to use in apps, newsletters, calendars and AI assistants. Everything below is rebuilt every day with the site, from the same data. Only upcoming events are included: an event leaves the list the day after it ends. Please link to the event's page on ${name} when you reuse a listing.`,
		endpoints: 'Endpoints',
		eventsJson: ': every upcoming event as JSON.',
		rss: ': RSS feed in German, newest listings first.',
		rssEn: ': RSS feed in English.',
		llms: ': a short markdown guide for AI agents, with links to the lists below.',
		llmsFull: ': every upcoming event as markdown, one line each.',
		mdLists: "One markdown list per city and event type, at the page's English address with ",
		ics: ': iCalendar feed to subscribe to, with German text. The English version: ',
		calendarFeeds: 'Calendar feeds',
		calendarIntro: 'Subscribe by URL in Google Calendar, Outlook or Apple Calendar. Times are Europe/Berlin.',
		allEvents: 'All events',
		fieldsIn: 'Fields in ',
		notes: 'Notes',
		fields: [
			['id', 'Stable identifier. Never changes, even if the title or date is corrected.'],
			['title', 'Event name as the organiser publishes it.'],
			['start, end', 'ISO 8601. A date-time with the Berlin offset (e.g. 2026-10-29T17:30:00+01:00) when the time is known, otherwise a date.'],
			['allDay', 'True when start and end are plain dates.'],
			['dateLabel, time', 'Human-readable date range and the original time text.'],
			['city, region', 'The exact place, and the main city it belongs to (e.g. Garching → Munich).'],
			['online', 'True for online-only events.'],
			['venue', 'Venue name, or null.'],
			['format', 'One of Meetup, Conference, Workshop, Networking, Webinar.'],
			['topics', 'Short topic tags.'],
			['cost, free', 'Price as published, and whether it is free.'],
			['organiser', 'Who runs the event.'],
			['description', 'One-sentence summary written by us (English; same as blurb_en).'],
			['blurb_en, blurb_de', 'The same summary in English and in German (blurb_de is null where not written yet).'],
			['url', 'The event page on this site.'],
			['registrationUrl', "The organiser's page, where people register."],
			['verifiedVia', 'Where the details were checked.'],
			['firstSeen', 'Date the event was first listed here.'],
			['calendarFeed', "iCalendar feed for the event's city."],
		] as [string, string][],
		note1:
			"Every listing is checked against the organiser's own page, but details can change on their side, so point people to the organiser's page before they go. Fields may be added over time; existing ones are not renamed or removed without changing ",
		note1After: '.',
		note2a: 'A series or course that runs on several dates is one entry: ',
		note2b: ' is its first day and ',
		note2c: ' its last, and ',
		note2d: " applies to each session. The organiser's page has the individual dates.",
		note3a: ' in ',
		note3b: ', and the first lines of the markdown files, say when the list was last checked. If that is more than two days ago, you have a cached copy.',
		note4: 'The JSON, markdown and RSS data is language-neutral except where noted: field values are English, with the German summary in blurb_de.',
	},

	jsonld: {
		areaServed: 'Germany',
	},
};

export type Messages = typeof en;
