import { Hono } from 'hono';
import db, { findSimilarLocations, generateEmbeddings } from '../db';
import { location } from '../db/schema';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

async function insertLocation(
	city: string,
	state: string,
	country: string
) {
	// check if location already exists
	const locationRec = await db.query.location.findFirst({
		where: (location, { eq, and }) =>
			and(
				eq(location.city, city),
				eq(location.state, state),
				eq(location.country, country)
			)
	});
	if (locationRec) {
		return locationRec;
	} else {
		// compute embeddings
		const [cityVec, stateVec, countryVec] = await Promise.all([
			generateEmbeddings(city),
			generateEmbeddings(state),
			generateEmbeddings(country)
		]);
		return db.insert(location).values({
			city,
			state,
			country,
			cityVector: cityVec,
			stateVector: stateVec,
			countryVector: countryVec
		});
	}
}

const insertLocationSchema = z.object({
	city: z.string(),
	state: z.string(),
	country: z.string()
});

const testLoc = {
	city: 'Madras',
	state: 'Tamil Nadu',
	country: 'India'
};

app.post(
	'/insertLocation',
	zValidator('json', insertLocationSchema),
	async (c) => {
		const { city, state, country } = c.req.valid('json');
		const locationRec = await insertLocation(city, state, country);
		// check if location simiar to testLoc
		const similarLocations = await findSimilarLocations(city, state, country);
		return c.json({
			locationRec,
			similarLocations
		});
	}
);

export default app;
