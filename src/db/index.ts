import { drizzle } from 'drizzle-orm/postgres-js';
import { gt, or } from 'drizzle-orm';
import postgres from 'postgres';
import { personalInfo, location } from './schema';
import * as schema from './schema';
import ollama from 'ollama';
import { cosineDistance, sql } from 'drizzle-orm';

const queryClient = postgres(
	'postgresql://postgres:mysecretpassword@localhost:5432/postgres'
);
const db = drizzle(queryClient, { schema });

export const generateEmbeddings = async (value: string): Promise<number[]> => {
	const input = value.replaceAll('\n', ' ');
	const data = await ollama.embeddings({
		model: 'nomic-embed-text',
		prompt: input
	});
	return data.embedding;
};

export const findSimilarLocations = async (
	city: string,
	state: string,
	country: string
): Promise<string[]> => {
	const cityVector = await generateEmbeddings(city);
	const stateVector = await generateEmbeddings(state);
	const countryVector = await generateEmbeddings(country);

	const citySimilarity = sql<number>`1 - (${cosineDistance(
		location.cityVector,
		cityVector
	)})`;

	const stateSimilarity = sql<number>`1 - (${cosineDistance(
		location.stateVector,
		stateVector
	)})`;

	const countrySimilarity = sql<number>`1 - (${cosineDistance(
		location.countryVector,
		countryVector
	)})`;

	const results = await db
		.select()
		.from(location)
		.where(
			or(
				gt(citySimilarity, 0.9),
				gt(stateSimilarity, 0.9),
				gt(countrySimilarity, 0.9)
			)
		)
		.orderBy(countrySimilarity, stateSimilarity, citySimilarity)
		.limit(5);

	return results.map((result) => {
		return `${result.city}, ${result.state}, ${result.country}`;
	});
};

export default db;
