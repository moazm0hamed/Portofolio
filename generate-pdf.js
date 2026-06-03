import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure public/cv directory exists
const publicDir = path.join(__dirname, 'public', 'cv');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Moaz_Mohamed_CV.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 }
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Styles and Colors
const primaryColor = '#0f172a'; // slate-900
const secondaryColor = '#00838f'; // teal-800
const textColor = '#334155'; // slate-700
const lightTextColor = '#64748b'; // slate-500
const dividerColor = '#cbd5e1'; // slate-300

// Helper functions for layouts
function drawHeader() {
  doc.fillColor(primaryColor)
     .font('Helvetica-Bold')
     .fontSize(26)
     .text('Moaz Mohamed', { paragraphGap: 2 });
  
  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Front-End Developer', { paragraphGap: 8 });

  doc.fillColor(textColor)
     .font('Helvetica')
     .fontSize(9.5)
     .text('moazhoras@gmail.com  •  +201148823888  •  Menoufia, Egypt', { paragraphGap: 4 });

  doc.fillColor(secondaryColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text('LinkedIn: linkedin.com/in/moazhoras  •  GitHub: github.com/moazmOhamed', { paragraphGap: 12 });

  // Divider line
  doc.strokeColor(dividerColor)
     .lineWidth(1)
     .moveTo(45, doc.y)
     .lineTo(550, doc.y)
     .stroke();
  
  doc.moveDown(0.8);
}

function drawSectionHeading(title) {
  doc.moveDown(0.4);
  doc.fillColor(primaryColor)
     .font('Helvetica-Bold')
     .fontSize(13)
     .text(title.toUpperCase(), { paragraphGap: 4 });
  
  // Underline section heading slightly
  doc.strokeColor(secondaryColor)
     .lineWidth(1.5)
     .moveTo(45, doc.y)
     .lineTo(120, doc.y)
     .stroke();
  
  doc.moveDown(0.6);
}

// Draw Header
drawHeader();

// --- PROFILE ---
drawSectionHeading('Profile');
doc.fillColor(textColor)
   .font('Helvetica')
   .fontSize(9.5)
   .text(
     'Front-End Developer with practical experience in building interactive, high-performance web applications. ' +
     'Specializing in modern UI/UX trends, dark mode aesthetics, and immersive 3D web animations. Experienced in ' +
     'creating responsive, accessible, and maintainable codebases with a strong focus on clean UI. Skilled in ' +
     'integrating AI Agents into web systems to automate business operations and enhance efficiency. Actively ' +
     'seeking remote or full-time opportunities to deliver innovative, user-centric web experiences.',
     { align: 'justify', paragraphGap: 12, lineGap: 2 }
   );

// --- EDUCATION ---
drawSectionHeading('Education');
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(10.5)
   .text('Bachelor of Computer Science', { continued: true })
   .font('Helvetica')
   .text(' at Arab Open University (AOU), El Shorouk, Egypt', { continued: false });

doc.fillColor(lightTextColor)
   .font('Helvetica-Oblique')
   .fontSize(9)
   .text('September 2023 - September 2027', { align: 'right', paragraphGap: 4 });

// Move cursor back for content
doc.y -= 12;

doc.fillColor(textColor)
   .font('Helvetica')
   .fontSize(9.5)
   .list([
     'Studying core computer science methodologies, software engineering principles, algorithms, and OOP.',
     'Successfully balanced rigorous academic coursework while independently mastering modern front-end technologies and developing production-ready applications.'
   ], { bulletRadius: 2, textIndent: 12, paragraphGap: 4, lineGap: 1.5 });

doc.moveDown(0.5);

// --- EXPERIENCE ---
drawSectionHeading('Experience');
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(10.5)
   .text('Freelance Front-End Developer', { continued: true })
   .font('Helvetica')
   .text(' at Self-Employed (Freelance), Remote / Menofeia, Egypt', { continued: false });

doc.fillColor(lightTextColor)
   .font('Helvetica-Oblique')
   .fontSize(9)
   .text('May 2025 - May 2026', { align: 'right', paragraphGap: 4 });

doc.y -= 12;

doc.fillColor(textColor)
   .font('Helvetica')
   .fontSize(9.5)
   .list([
     'Developed and enhanced 10+ responsive, high-performance front-end interfaces using React.js, Tailwind CSS, and Bootstrap, improving cross-device loading speeds by 25%.',
     'Integrated robust full-stack workflows, connecting React frontends with PHP Laravel backends, relational databases, and custom AI Agents to automate business logic.',
     'Implemented cutting-edge visual experiences, leveraging modern animation libraries like Three.js and Swiper.js to deliver immersive interactive web designs.',
     'Maintained clean, scalable, and reusable codebases using Git and GitHub for version control, focusing heavily on web performance optimization and accessibility.'
   ], { bulletRadius: 2, textIndent: 12, paragraphGap: 4, lineGap: 1.5 });


// Page 2 setup
doc.addPage();
drawHeader();

// --- SKILLS ---
drawSectionHeading('Skills');
const skills = [
  { label: 'Core Technologies', val: 'HTML5, CSS3, JavaScript (ES6+), React.js' },
  { label: 'Styling & Frameworks', val: 'Tailwind CSS, Bootstrap, Responsive Web Design' },
  { label: '3D & Animations', val: 'Three.js, Spline.js, Swiper.js, WOW.js, GSAP' },
  { label: 'Version Control & Tools', val: 'Git, GitHub' },
  { label: 'Best Practices', val: 'Clean UI, Web Performance Optimization, Accessibility, Maintainable Code, Local Storage Integration, AI Agent Integration' }
];

skills.forEach(s => {
  doc.fillColor(primaryColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(`${s.label}: `, { continued: true })
     .fillColor(textColor)
     .font('Helvetica')
     .text(s.val, { paragraphGap: 4, lineGap: 1 });
});

doc.moveDown(0.5);

// --- PROJECTS ---
drawSectionHeading('Projects');

// Project 1
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(10.5)
   .text('HORAS Factory Management System (ERP)', { continued: false });

doc.fillColor(lightTextColor)
   .font('Helvetica-Oblique')
   .fontSize(9)
   .text('December 2025 - February 2026', { align: 'right', paragraphGap: 4 });

doc.y -= 12;

doc.fillColor(textColor)
   .font('Helvetica')
   .fontSize(9.5)
   .list([
     'Engineered interactive analytical dashboards providing real-time visibility into profit and loss, improving financial tracking efficiency by 40%.',
     'Led the frontend technical integration of the brand identity, executing precise icon placements for the finalized "HORAS" logo across all modules.',
     'Designed a responsive, user-friendly interface tailored for complex data entry, reducing operational confusion for staff by 35%.',
     'Architected a comprehensive AI Agent integration utilizing React for the frontend and PHP Laravel for the backend to automate workflows and prevent operational overlaps.'
   ], { bulletRadius: 2, textIndent: 12, paragraphGap: 4, lineGap: 1.5 });

doc.moveDown(0.4);

// Project 2
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(10.5)
   .text('PlayStation (PS) Management System', { continued: false });

doc.fillColor(lightTextColor)
   .font('Helvetica-Oblique')
   .fontSize(9)
   .text('March 2026 - April 2026', { align: 'right', paragraphGap: 4 });

doc.y -= 12;

doc.fillColor(textColor)
   .font('Helvetica')
   .fontSize(9.5)
   .list([
     'Developed a comprehensive management interface tailored for gaming centers to monitor daily operations, track inventory, and manage active sessions.',
     'Integrated an AI Agent to automate core business logic, handling 100+ customer reservations weekly and automatically generating billing invoices.',
     'Designed an intuitive, high-performance user interface (UI) that simplified administrative tasks, significantly improving operational efficiency by 30%.'
   ], { bulletRadius: 2, textIndent: 12, paragraphGap: 4, lineGap: 1.5 });

doc.moveDown(0.4);

// Project 3
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(10.5)
   .text('Interactive E-Commerce Platform (HORAS Online Shop)', { continued: false });

doc.fillColor(lightTextColor)
   .font('Helvetica-Oblique')
   .fontSize(9)
   .text('May 2026 - May 2026', { align: 'right', paragraphGap: 4 });

doc.y -= 12;

doc.fillColor(textColor)
   .font('Helvetica')
   .fontSize(9.5)
   .list([
     'Engineered a fully functional e-commerce frontend architecture utilizing JavaScript and Local Storage to seamlessly manage product catalogs and preserve shopping cart state without a backend.',
     'Implemented modern UI/UX design trends, incorporating high-contrast themes and engaging interactive elements to boost user retention by 20%.',
     'Resolved complex layout rendering issues by engineering precise CSS Flexbox alignment solutions to fix shopping cart item behaviors, ensuring elements aligned perfectly to the top of the container.',
     'Streamlined the platform for responsiveness and performance, adapting perfectly across all mobile and desktop devices with a 95+ Lighthouse performance score.'
   ], { bulletRadius: 2, textIndent: 12, paragraphGap: 4, lineGap: 1.5 });

doc.moveDown(0.5);

// --- LANGUAGES ---
drawSectionHeading('Languages');
doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(9.5)
   .text('Arabic: ', { continued: true })
   .fillColor(textColor)
   .font('Helvetica')
   .text('Native', { paragraphGap: 3 });

doc.fillColor(primaryColor)
   .font('Helvetica-Bold')
   .fontSize(9.5)
   .text('English: ', { continued: true })
   .fillColor(textColor)
   .font('Helvetica')
   .text('Conversational', { paragraphGap: 10 });

doc.moveDown(0.4);

// --- CERTIFICATES ---
drawSectionHeading('Certificates');
const certs = [
  { name: 'Front-end Web Development Diploma (React JS) from SEF Academy', date: 'April 2026', desc: 'Successfully completed an intensive 5-month frontend development diploma (score 98.28%). Covered advanced React.js applications.' },
  { name: 'JavaScript, React JS, and HTML Web Development from Cursa', date: 'November 2025', desc: 'Completed a comprehensive 15-hour specialized track focused on modern front-end technologies.' },
  { name: 'Introduction to Front End Development from Simplilearn SkillUP', date: 'November 2025', desc: 'Completed a multi-course specialized track including JavaScript, React JS for Beginners.' },
  { name: 'Sprints x Microsoft Summer Camp - Web Development from Sprints x Microsoft', date: 'September 2025', desc: 'Successfully completed 40 hours of intensive technical training in web development.' }
];

certs.forEach(c => {
  doc.fillColor(primaryColor)
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(c.name, { continued: false });
  doc.fillColor(lightTextColor)
     .font('Helvetica-Oblique')
     .fontSize(8.5)
     .text(c.date, { align: 'right', paragraphGap: 2 });
  doc.y -= 10;
  doc.fillColor(textColor)
     .font('Helvetica')
     .fontSize(9)
     .text(c.desc, { paragraphGap: 5, lineGap: 1 });
});

doc.end();

writeStream.on('finish', () => {
  console.log('PDF Generated successfully at ' + outputPath);
});

