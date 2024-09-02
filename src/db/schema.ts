import { relations } from 'drizzle-orm';
import {
	pgTable,
	text,
	integer,
	real,
	date,
	vector,
	index,
	serial
} from 'drizzle-orm/pg-core';

// Personal Information
export const personalInfo = pgTable('personal_info', {
	id: serial('id').primaryKey(),
	firstName: text('first_name').notNull(),
	middleName: text('middle_name'),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	phone: text('phone'),
	linkedIn: text('linkedin'),
	github: text('github'),
	locationId: integer('location_id').references(() => location.id)
});

// Location
export const location = pgTable(
	'location',
	{
		id: serial('id').primaryKey(),
		city: text('city').notNull(),
		state: text('state').notNull(),
		country: text('country').notNull(),
		cityVector: vector('city_embedding', { dimensions: 768 }),
		stateVector: vector('state_embedding', { dimensions: 768 }),
		countryVector: vector('country_embedding', { dimensions: 768 })
	},
	(table) => ({
		cityIndex: index('city_embedding_index').using(
			'hnsw',
			table.cityVector.op('vector_cosine_ops')
		),
		stateIndex: index('state_embedding_index').using(
			'hnsw',
			table.stateVector.op('vector_cosine_ops')
		),
		countryIndex: index('country_embedding_index').using(
			'hnsw',
			table.countryVector.op('vector_cosine_ops')
		)
	})
);

export const locationsRelationship = relations(personalInfo, ({ one }) => {
	return {
		location: one(location, {
			fields: [personalInfo.locationId],
			references: [location.id]
		})
	};
});

// Education
export const education = pgTable(
	'education',
	{
		id: serial('id').primaryKey(),
		degree: text('degree').notNull(),
		institution: text('institution').notNull(),
		location: text('location'),
		graduationDate: date('graduation_date'),
		gpa: real('gpa'),
		relevantCoursework: text('relevant_coursework'),
		relevantCourseworkVector: vector('relevant_coursework_embedding', {
			dimensions: 768
		})
	},
	(table) => ({
		relevantCourseworkIndex: index('relevant_coursework_embedding_index').using(
			'hnsw',
			table.relevantCourseworkVector.op('vector_cosine_ops')
		)
	})
);

// Work Experience
export const workExperience = pgTable(
	'work_experience',
	{
		id: serial('id').primaryKey(),
		jobTitle: text('job_title').notNull(),
		company: text('company').notNull(),
		location: text('location'),
		startDate: date('start_date').notNull(),
		endDate: date('end_date'),
		responsibilities: text('responsibilities'),
		achievements: text('achievements'),
		jobTitleVector: vector('job_title_embedding', { dimensions: 768 }),
		companyVector: vector('company_embedding', { dimensions: 768 }),
		responsibilitiesVector: vector('achievements_embedding', {
			dimensions: 768
		}),
		achievementsVector: vector('embedding', { dimensions: 768 })
	},
	(table) => ({
		jobTitleIndex: index('job_title_embedding_index').using(
			'hnsw',
			table.jobTitleVector.op('vector_cosine_ops')
		),
		companyIndex: index('company_embedding_index').using(
			'hnsw',
			table.companyVector.op('vector_cosine_ops')
		),
		responsibilitiesIndex: index('responsibilities_embedding_index').using(
			'hnsw',
			table.responsibilitiesVector.op('vector_cosine_ops')
		),
		achievementsIndex: index('achievements_embedding_index').using(
			'hnsw',
			table.achievementsVector.op('vector_cosine_ops')
		)
	})
);

// Skills
export const skills = pgTable(
	'skills',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		category: text('category'), // e.g., 'technical', 'soft', 'language'
		proficiencyLevel: text('proficiency_level'),
		experienceLevel: text('experience_level'),
		nameVector: vector('name_embedding', { dimensions: 768 }),
		categoryVector: vector('category_embedding', { dimensions: 768 })
	},
	(table) => ({
		nameIndex: index('name_embedding_index').using(
			'hnsw',
			table.nameVector.op('vector_cosine_ops')
		),
		categoryIndex: index('category_embedding_index').using(
			'hnsw',
			table.categoryVector.op('vector_cosine_ops')
		)
	})
);

// Projects
export const projects = pgTable(
	'projects',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		description: text('description'),
		technologies: text('technologies'),
		outcome: text('outcome'),
		startDate: date('start_date'),
		endDate: date('end_date'),
		projectNameVector: vector('project_name_embedding', {
			dimensions: 768
		}),
		projectDescriptionVector: vector('project_description_embedding', {
			dimensions: 768
		}),
		projectTechnologiesVector: vector('project_technologies_embedding', {
			dimensions: 768
		})
	},
	(table) => ({
		nameIndex: index('project_name_embedding_index').using(
			'hnsw',
			table.projectNameVector.op('vector_cosine_ops')
		),
		descriptionIndex: index('project_description_embedding_index').using(
			'hnsw',
			table.projectDescriptionVector.op('vector_cosine_ops')
		),
		technologiesIndex: index('project_technologies_embedding_index').using(
			'hnsw',
			table.projectTechnologiesVector.op('vector_cosine_ops')
		)
	})
);

// Achievements and Milestones
export const achievementsMilestones = pgTable(
	'achievements_milestones',
	{
		id: serial('id').primaryKey(),
		title: text('title').notNull(),
		description: text('description'),
		date: date('date'),
		context: text('context'),
		titleVector: vector('title_embedding', { dimensions: 768 }),
		descriptionVector: vector('description_embedding', {
			dimensions: 768
		})
	},
	(table) => ({
		titleIndex: index('title_embedding_index').using(
			'hnsw',
			table.titleVector.op('vector_cosine_ops')
		),
		descriptionIndex: index('description_embedding_index').using(
			'hnsw',
			table.descriptionVector.op('vector_cosine_ops')
		)
	})
);

// Interests and Hobbies
export const interestsHobbies = pgTable(
	'interests_hobbies',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		description: text('description'),
		hobbyNameVector: vector('hobby_name_embedding', { dimensions: 768 }),
		hobbyDescriptionVector: vector('hobby_description_embedding', {
			dimensions: 768
		})
	},
	(table) => ({
		nameIndex: index('hobby_name_embedding_index').using(
			'hnsw',
			table.hobbyNameVector.op('vector_cosine_ops')
		),
		descriptionIndex: index('hobby_description_embedding_index').using(
			'hnsw',
			table.hobbyDescriptionVector.op('vector_cosine_ops')
		)
	})
);
