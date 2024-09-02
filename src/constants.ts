export const candidateDetails = {
	name: {
		first: 'Abishek',
		last: 'Devendran'
	},
	contact: {
		email: 'abishekdevendran@gmail.com',
		phone: '+91 9514121213',
		address: {
			city: 'Chennai',
			state: 'Tamil Nadu',
			country: 'India'
		},
		socials: {
			linkedin: 'https://www.linkedin.com/in/abishekdevendran',
			github: 'https://github.com/abishekdevendran'
		}
	},
	skills: {
		languages: ['Javascript', 'Typescript', 'Python', 'C/C++', 'SQL'],
		libraries: [
			'ReactJS',
			'Pandas',
			'SciKitLearn',
			'Framer Motion',
			'Socket.io',
			'Zod'
		],
		frameworks: ['NextJS', 'TailwindCSS', 'ExpressJS', 'Sveltekit'],
		software: ['Blender3D', 'Figma', 'Postman', 'Neo4J'],
		misc: ['CI/CD', 'Time Management', 'Git/Github', 'SEO']
	},
	experience: [
		{
			company: 'Randomwalk.AI',
			location: 'Chennai, Tamil Nadu',
			position: 'Junior Software Engineer',
			startDate: '01/2024',
			endDate: 'Present',
			description: [
				'Built an LLM based orchestration pipeline using bleeding edge technologies like Langgraph and LlamaIndex using FAISS, Pinecone and Neo4J for semantic vector embeddings and indexing, Postgres for user data, SQLite for in-memory ondemand data processing, and Redis for caching responses.',
				'Built various iterations of this project for various customer requirements and use-cases, from strictly structured data to ambiguously semi-structured data.',
				'As a bilevel optimization problem between response times+token usage vs response quality, the final DAG nodes were optimized to deliver results within 5 seconds, with >95% precision and recall.',
				'Worked on a multitude of stacks including but not limited to React+NextJS, Svelte+Kit, FastAPI, Flask, Hono, Python, NodeJS, Typescript, Postgres, Langchain(both Py and TS), IPYNB, Tesseract OCR, Neo4J for KGs, docker-compose for microservices, Github Actions for CI/CD, etc.'
			]
		},
		{
			company: 'OruPhones',
			location: 'Alwar, Rajasthan',
			position: 'Full Stack Development Intern',
			startDate: '05/2023',
			endDate: '11/2023',
			description: [
				'Pioneered incremental upgrades to cutting-edge technologies, ensuring seamless integration and error-free operation',
				'Transformed Core Web Vitals, achieving all greens and boosting performance by approximately 25% across the board.',
				'Revamped codebase to bolster security and performance, resulting in a 50% reduction in JS client bundle size and 40% faster server API response time.',
				'Achieved 100% server uptime through flawless error handling and adoption of cookie and Redis session-based authentication.',
				'Spearheaded the adoption of TypeScript and Zod validation, fortifying backend and frontend security',
				'Improved Developer Experience (DX) with a streamlined file structure and increased TypeScript integration (backend 20%, frontend 45%).',
				'Led a small team of frontend engineers to rebuild the frontend from scratch, including payment functionality and accessibility audits.'
			]
		}
	],
	projects: [
		{
			name: 'LL(1)/LR Parsers',
			description: 'Coursework in advanced C.',
			techStack: []
		},
		{
			name: 'Chain Reaction Multiplayer',
			description:
				'Using web sockets and vanilla SPA ReactJS hosted on an ExpressJS server to make a multiplayer online board game.',
			techStack: ['web sockets', 'ReactJS', 'ExpressJS']
		},
		{
			name: 'Human Activity Recognition with Smartphones',
			description:
				'EDA and Comparative model analysis after Data Cleaning and Reduction steps.',
			techStack: []
		},
		{
			name: 'IoT Mining Helmet',
			description:
				'Product Design project involving incorporating smart dynamic sensor nodes as part of a mesh network with MQTT pub/sub support. Prototyped with Arduino and ESP01S.',
			techStack: ['MQTT', 'Arduino', 'ESP01S']
		}
	],
	education: [
		{
			institution: 'Indian Institute of Information Technology, D&M.',
			degree: 'B.Tech in Computer Science and Engineering',
			endDate: '06/2024',
			location: 'Chennai, Tamil Nadu',
			description: 'CGPA : 8.1'
		}
	]
};
