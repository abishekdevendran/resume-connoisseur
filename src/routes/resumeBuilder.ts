import { Hono } from 'hono';
import ollama from 'ollama';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { ResumeDetails } from '../types';
import { candidateDetails } from '../constants';

const app = new Hono();

const chat = async (sys_prompt: string, msg: string) => {
	const response = await ollama.chat({
		model: 'mistral-nemo',
		messages: [
			{
				role: 'system',
				content: sys_prompt
			},
			{
				role: 'user',
				content: msg
			}
		],
		options: {
			temperature: 0.1
		}
	});
	return response.message.content;
};

const check = async ({
	companyName,
	jobTitle,
	location,
	jobDescription
}: {
	companyName: string;
	jobTitle: string;
	location: string;
	jobDescription: string;
	candidateDetails: ResumeDetails;
}) => {
	const sys_prompt = `Given the following information about a job posting, and the following preferences and qualifications of the user, check if the user is a good fit for the job. Do not hallucinate. Think about it step by step. Pay attention to all details in the job description and ensure there are no deal breakers on either side.

  Today's date for context: ${new Date().toLocaleDateString()}

  Respond only in the following format:
  Reasoning:
  <Detailed Reasoning>
  Match Percentage: <0-100%>
  Final Verdict: <Yes/No>
  `;
	const user_prompt = `<JobInfo>
    <CompanyName>${companyName}</CompanyName>
    <JobTitle>${jobTitle}</JobTitle>
    <Location>${location}</Location>
    <JobDescription>${jobDescription}</JobDescription>
  </JobInfo>
  
  <UserDetails>
    <Name>${candidateDetails.name.first} ${candidateDetails.name.last}</Name>
    <Skills>
      <Languages>${candidateDetails.skills.languages.join(', ')}</Languages>
      <Libraries>${candidateDetails.skills.libraries.join(', ')}</Libraries>
      <Frameworks>${candidateDetails.skills.frameworks.join(', ')}</Frameworks>
      <Software>${candidateDetails.skills.software.join(', ')}</Software>
      <Misc>${candidateDetails.skills.misc.join(', ')}</Misc>
    </Skills>
    <Experience>
      ${candidateDetails.experience.map((exp) => {
				return `
        <Company>${exp.company}</Company>
        <Location>${exp.location}</Location>
        <Position>${exp.position}</Position>
        <StartDate>${exp.startDate}</StartDate>
        <EndDate>${exp.endDate}</EndDate>
        <Description>${exp.description.join(', ')}</Description>
        `;
			})}
    </Experience>
    <Education>
      ${candidateDetails.education.map((edu) => {
				return `
        <Institution>${edu.institution}</Institution>
        <Location>${edu.location}</Location>
        <Degree>${edu.degree}</Degree>
        <EndDate>${edu.endDate}</EndDate>
        <Description>${edu.description}</Description>
        `;
			})}
    </Education>
    <Projects>
      ${candidateDetails.projects.map((proj) => {
				return `
        <Name>${proj.name}</Name>
        <Description>${proj.description}</Description>
        <TechStack>${proj.techStack.join(', ')}</TechStack>
        `;
			})}
    </Projects>`;
	const response = await chat(sys_prompt, user_prompt);
	// const response =
	// 	"**Reasoning:**\nThe user has experience in software engineering roles and has worked with various technologies including Langchain, NextJS, ExpressJS, ReactJS, Python, NodeJS, Typescript, Postgres, Neo4J, etc. The job posting requires deep subject matter expertise in Engineering fields but does not require prior AI/machine learning expertise. The user's experience includes working on Large Language Models (LLMs) and optimizing them for performance and precision.\n\nThe location of the job is In-Office Chennai, which matches with the user's current location and preferred work environment based on their previous experiences.\n\nHowever, there are no specific mention of the user's English language proficiency or critical thinking skills in the provided information. The pay starts at Rs. 800 per hour, which might vary depending on the project.\n\n**Match Percentage:** 75%\n\n**Final Verdict:** Yes";
	// strip response string of "**", and get only last line
	const slim = response
		.split('\n')
		.filter((line) => line !== '')
		.slice(-2)
		.map((line) => line.replace(/\*\*/g, ''))
		.map((line) => line.split(':')[1].trim());
	console.log('Slim: ', slim);
	return {
		response: response,
		matchPercentage: slim[0],
		verdict: slim[1]
	};
};

app.get(
	'/resumeBuilder',
	zValidator(
		'query',
		z.object({
			companyName: z.string(),
			jobTitle: z.string(),
			location: z.string(),
			jobDescription: z.string()
		})
	),
	async (c) => {
		const query = c.req.valid('query');
		const resp = await check({
			...query,
			candidateDetails: candidateDetails
		});
		return c.json({
			response: resp
		});
	}
);

export default app;
