import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	dialect: 'postgresql', // "mysql" | "sqlite" | "postgresql"
	schema: './src/db/schema.ts',
	out: './drizzle',
	dbCredentials: {
		url: 'postgresql://postgres:mysecretpassword@localhost:5432/postgres'
	}
});
