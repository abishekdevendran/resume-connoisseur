import type { CoverLetterDetails, ResumeDetails } from './types';
import { jsPDF } from 'jspdf';
import dummyData from './../exJson.json';
import dummyCoverLetter from './../exCoverLetter.json';
import { font } from './assets/OpenSans-Regular-normal';

function generateCoverLetter(doc: jsPDF, data: CoverLetterDetails) {
	console.log('Data: ', data);
	const margin = 20;
	const pageWidth = doc.internal.pageSize.width;
	const usableWidth = pageWidth - 2 * margin;
	let currentY = margin;

	// Sender's Address
	doc.setFontSize(10);
	doc.setFont('OpenSans', 'normal');
	doc.text(data.senderAddress.join('\n'), margin, currentY);
	currentY += 10 * data.senderAddress.length;

	// Date
	currentY += 10;
	doc.text(data.date, margin, currentY);
	currentY += 10;

	// Recipient's Address
	doc.text(data.recipientAddress.join('\n'), margin, currentY);
	currentY += 10 * data.recipientAddress.length;

	// Salutation
	currentY += 10;
	doc.text(data.salutation, margin, currentY);
	currentY += 10;

	// Body paragraphs
	doc.setFontSize(11);
	data.body.forEach((paragraph) => {
		const lines = doc.splitTextToSize(paragraph, usableWidth);
		doc.text(lines, margin, currentY);
		currentY += 6 * lines.length;
	});

	// Closing
	currentY += 10;
	doc.text(data.closing, margin, currentY);
	currentY += 20;

	// Signature
	doc.text(data.signature, margin, currentY);
}

export default async function pdfGen(
	data: ResumeDetails = dummyData,
	coverLetterData: CoverLetterDetails = dummyCoverLetter,
	margin: number = 15
): Promise<Blob> {
	const doc = new jsPDF();
	// Add font
	doc.addFileToVFS('OpenSans-Regular.ttf', font);
	doc.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');
	doc.setFont('OpenSans');

	// Page settings
	const pageWidth = doc.internal.pageSize.width;
	const pageHeight = doc.internal.pageSize.height;
	const usableWidth = pageWidth - 2 * margin;
	const usableHeight = pageHeight - 2 * margin;
	let currentY = margin;

	// Helper functions
	const addSection = (title: string | string[]) => {
		checkAndAddPage(margin);
		doc.setFontSize(16);
		doc.setFont('OpenSans', 'bold');
		doc.text(title, margin, currentY);
		doc.setLineWidth(0.5);
		doc.line(margin, currentY + 1, pageWidth - margin, currentY + 1);
		doc.setFont('OpenSans', 'normal');
		doc.setFontSize(10);
		currentY += 10;
	};

	const addBulletPoint = (text: string) => {
		checkAndAddPage(5);
		doc.circle(margin + 2, currentY - 1, 0.5, 'F');
		const lines = doc.splitTextToSize(text, usableWidth - 10);
		doc.text(lines, margin + 5, currentY);
		currentY += 5 * lines.length;
	};

	const checkAndAddPage = (requiredSpace: number) => {
		if (currentY + requiredSpace > pageHeight - margin) {
			doc.addPage();
			currentY = margin;
		}
	};

	// Header
	doc.setFontSize(24);
	doc.setFont('OpenSans', 'bold');
	doc.text(
		`${data.name.first} ${data.name.middle ? data.name.middle + ' ' : ''}${
			data.name.last
		}`,
		margin,
		currentY
	);
	currentY += 10;

	doc.setFontSize(10);
	doc.setFont('OpenSans', 'normal');
	doc.text(data.contact.email, margin, currentY);
	doc.text(data.contact.phone, pageWidth / 2, currentY);
	currentY += 5;
	doc.text(
		`${data.contact.address.city}, ${data.contact.address.state}, ${data.contact.address.country}`,
		margin,
		currentY
	);
	currentY += 5;
	doc.text(data.contact.socials.linkedin, margin, currentY);
	if (data.contact.socials.github) {
		doc.text(data.contact.socials.github, pageWidth / 2, currentY);
	}
	currentY += 10;

	// Summary (if provided)
	if (data.summary) {
		addSection('Summary');
		const lines = doc.splitTextToSize(data.summary, usableWidth);
		checkAndAddPage(5 * lines.length);
		doc.text(lines, margin, currentY);
		currentY += 5 * lines.length + 5;
	}

	// Skills
	addSection('Skills');
	Object.entries(data.skills).forEach(([category, skills]) => {
		checkAndAddPage(5);
		doc.setFont('OpenSans', 'bold');
		doc.text(`${category}: `, margin, currentY);
		doc.setFont('OpenSans', 'normal');
		const skillText = skills.join(', ');
		const lines = doc.splitTextToSize(
			skillText,
			usableWidth - doc.getTextWidth(`${category}: `)
		);
		doc.text(lines, margin + doc.getTextWidth(`${category}: `), currentY);
		currentY += 5 * lines.length;
	});
	currentY += 5;

	// Experience
	addSection('Experience');
	data.experience.forEach((exp) => {
		checkAndAddPage(margin);
		doc.setFont('OpenSans', 'bold');
		doc.text(exp.company, margin, currentY);
		doc.setFont('OpenSans', 'normal');
		doc.text(exp.location, pageWidth / 2, currentY);
		currentY += 5;
		doc.text(exp.position, margin, currentY);
		doc.text(
			`${exp.startDate} - ${exp.endDate || 'Present'}`,
			pageWidth / 2,
			currentY
		);
		currentY += 5;
		exp.description.forEach((desc) => {
			addBulletPoint(desc);
		});
		currentY += 5;
	});

	// Projects
	addSection('Projects');
	data.projects.forEach((project) => {
		checkAndAddPage(margin);
		doc.setFont('OpenSans', 'bold');
		doc.text(project.name, margin, currentY);
		currentY += 5;
		doc.setFont('OpenSans', 'normal');
		const descLines = doc.splitTextToSize(project.description, usableWidth);
		doc.text(descLines, margin, currentY);
		currentY += 5 * descLines.length;
		const techStackLines = doc.splitTextToSize(
			`Tech Stack: ${project.techStack.join(', ')}`,
			usableWidth
		);
		doc.text(techStackLines, margin, currentY);
		currentY += 5 * techStackLines.length;
		if (project.github) {
			checkAndAddPage(5);
			doc.text(`GitHub: ${project.github}`, margin, currentY);
			currentY += 5;
		}
		if (project.demo) {
			checkAndAddPage(5);
			doc.text(`Demo: ${project.demo}`, margin, currentY);
			currentY += 5;
		}
		currentY += 5;
	});

	// Education
	addSection('Education');
	data.education.forEach((edu) => {
		checkAndAddPage(margin);
		doc.setFont('OpenSans', 'bold');
		doc.text(edu.institution, margin, currentY);
		doc.setFont('OpenSans', 'normal');
		doc.text(edu.location, pageWidth / 2, currentY);
		currentY += 5;
		doc.text(edu.degree, margin, currentY);
		doc.text(edu.endDate, pageWidth / 2, currentY);
		currentY += 5;
		const descLines = doc.splitTextToSize(edu.description, usableWidth);
		doc.text(descLines, margin, currentY);
		currentY += 5 * descLines.length + 5;
	});

	// Add a new page for the cover letter
	doc.addPage();
	currentY = margin;

	// Generate Cover Letter
	generateCoverLetter(doc, coverLetterData);

	// Save the PDF
	doc.save('resume_and_cover_letter.pdf');

	return doc.output('blob');
}
