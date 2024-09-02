# Resume Crafter

-[ ] Create a preliminary Structured data to resume builder

# Commands
- `docker run --name pgvector-db -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 pgvector/pgvector:pg16`
- `npx drizzle-kit generate --custom` for the beginning empty migration file to add `CREATE EXTENSION vector;` to
- Using `nomic-embed-text` supports dimensions from `64` to `768`, with a context size of `8192`
