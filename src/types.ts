import { z } from 'zod';

// export type ResumeDetails = {
// 	name: {
// 		first: string;
// 		middle?: string;
// 		last: string;
// 	};
// 	contact: {
// 		email: string;
// 		phone: string;
// 		address: {
// 			city: string;
// 			state: string;
// 			country: string;
// 		};
// 		socials: {
// 			linkedin: string;
// 			github?: string;
// 		};
// 	};
// 	summary?: string;
// 	skills: {
// 		[key: string]: string[];
// 	}[];
// 	experience: {
// 		company: string;
// 		location: string;
// 		position: string;
// 		startDate: string;
// 		endDate?: string;
// 		description: string[];
// 	}[];
// 	projects: {
// 		name: string;
// 		description: string;
// 		techStack: string[];
// 		github: string;
// 		demo?: string;
// 	}[];
// 	education: {
// 		institution: string;
// 		location: string;
// 		degree: string;
// 		endDate: string;
// 		description: string[];
// 	}[];
// };

// zod schema for ResumeDetails
export const resumeDetailsSchema = z.object({
	name: z.object({
		first: z.string(),
		middle: z.string().optional(),
		last: z.string()
	}),
	contact: z.object({
		email: z.string().email(),
		phone: z.string().min(10),
		address: z.object({
			city: z.string(),
			state: z.string(),
			country: z.string()
		}),
		socials: z.object({
			linkedin: z.string().url(),
			github: z.string().url().optional()
		})
	}),
	summary: z.string().optional(),
	skills: z.record(z.string(), z.array(z.string())),
	experience: z.array(
		z.object({
			company: z.string(),
			location: z.string(),
			position: z.string(),
			startDate: z.string(),
			endDate: z.string().optional(),
			description: z.array(z.string())
		})
	),
	projects: z.array(
		z.object({
			name: z.string(),
			description: z.string(),
			techStack: z.array(z.string()),
			github: z.string().url().optional(),
			demo: z.string().url().optional()
		})
	),
	education: z.array(
		z.object({
			institution: z.string(),
			location: z.string(),
			degree: z.string(),
			endDate: z.string(),
			description: z.string()
		})
	)
});

export const coverLetterDetailsSchema = z.object({
	senderAddress: z.array(z.string()),
	date: z.string(),
	recipientAddress: z.array(z.string()),
	salutation: z.string(),
	body: z.array(z.string()),
	closing: z.string(),
	signature: z.string()
});

export type ResumeDetails = z.infer<typeof resumeDetailsSchema>;
export type CoverLetterDetails = z.infer<typeof coverLetterDetailsSchema>;
