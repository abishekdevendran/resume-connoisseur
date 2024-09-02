CREATE TABLE IF NOT EXISTS "achievements_milestones" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"date" date,
	"context" text,
	"title_embedding" vector(768),
	"description_embedding" vector(768)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"degree" text NOT NULL,
	"institution" text NOT NULL,
	"location" text,
	"graduation_date" date,
	"gpa" real,
	"relevant_coursework" text,
	"relevant_coursework_embedding" vector(768)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interests_hobbies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"hobby_name_embedding" vector(768),
	"hobby_description_embedding" vector(768)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"city_embedding" vector(768),
	"state_embedding" vector(768),
	"country_embedding" vector(768)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "personal_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"middle_name" text,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"linkedin" text,
	"github" text,
	"location_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"technologies" text,
	"outcome" text,
	"start_date" date,
	"end_date" date,
	"project_name_embedding" vector(768),
	"project_description_embedding" vector(768),
	"project_technologies_embedding" vector(768)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"proficiency_level" text,
	"experience_level" text,
	"name_embedding" vector(768),
	"category_embedding" vector(768)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "work_experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_title" text NOT NULL,
	"company" text NOT NULL,
	"location" text,
	"start_date" date NOT NULL,
	"end_date" date,
	"responsibilities" text,
	"achievements" text,
	"job_title_embedding" vector(768),
	"company_embedding" vector(768),
	"achievements_embedding" vector(768),
	"embedding" vector(768)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_embedding_index" ON "achievements_milestones" USING hnsw ("title_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "description_embedding_index" ON "achievements_milestones" USING hnsw ("description_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "relevant_coursework_embedding_index" ON "education" USING hnsw ("relevant_coursework_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hobby_name_embedding_index" ON "interests_hobbies" USING hnsw ("hobby_name_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hobby_description_embedding_index" ON "interests_hobbies" USING hnsw ("hobby_description_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "city_embedding_index" ON "location" USING hnsw ("city_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "state_embedding_index" ON "location" USING hnsw ("state_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "country_embedding_index" ON "location" USING hnsw ("country_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_name_embedding_index" ON "projects" USING hnsw ("project_name_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_description_embedding_index" ON "projects" USING hnsw ("project_description_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "project_technologies_embedding_index" ON "projects" USING hnsw ("project_technologies_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_embedding_index" ON "skills" USING hnsw ("name_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_embedding_index" ON "skills" USING hnsw ("category_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "job_title_embedding_index" ON "work_experience" USING hnsw ("job_title_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_embedding_index" ON "work_experience" USING hnsw ("company_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "responsibilities_embedding_index" ON "work_experience" USING hnsw ("achievements_embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "achievements_embedding_index" ON "work_experience" USING hnsw ("embedding" vector_cosine_ops);