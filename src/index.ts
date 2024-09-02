import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { zValidator } from '@hono/zod-validator';
import { type ResumeDetails, resumeDetailsSchema } from './types';
import pdfGen from './pdfGen';
import locationRoutes from './routes/location';
import resumeBuilderRoutes from './routes/resumeBuilder';
import { z } from 'zod';

const app = new Hono();

// app.use(logger());

app.get('/', (c) => {
	return c.text('PDF gen service online!');
});

app.get('/health', (c) => {
	return c.text('OK');
});

app.route('/', locationRoutes);
app.route('/', resumeBuilderRoutes);

app.get(
	'/generate',
	//  zValidator('json', resumeDetailsSchema),
	async (c) => {
		// const resumeDetails = c.req.valid('json') as ResumeDetails;
		// const pdf = await pdfGen(resumeDetails);
		const pdf = await pdfGen();
		// build a Response object with the PDF blob
		const resp = new Response(pdf, {
			headers: {
				'Content-Type': 'application/pdf'
			}
		});
		return resp;
	}
);

console.log('Starting server on http://localhost:5000');

serve({
	fetch: app.fetch,
	port: 5000
});
