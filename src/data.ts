import { ProjectData, CertificateData } from './types';

export const projectsData: ProjectData[] = [
  {
    id: 'playstation_system',
    title: 'PLAYSTATION SYSTEM',
    description: 'Front-end dashboard for gaming-center operations, including session management, billing, inventory, shifts, and reporting workflows. Built with React and integrated with secure APIs and PostgreSQL-backed services.',
    tags: ['React 19', 'TypeScript', 'Express 5', 'Neon + Drizzle'],
    version: 'Production',
    icon: 'sports_esports'
  },
  {
    id: 'horas_shop',
    title: 'HORAS Clothing Store',
    description: 'Front-end e-commerce experience for a clothing brand, with responsive product collections, search, cart management, admin content workflows, and database-connected features.',
    tags: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL'],
    version: 'Production',
    icon: 'shopping_cart'
  },
  {
    id: 'horas_electronics',
    title: 'HORAS Electronics Store',
    description: 'A bilingual electronics store with responsive product browsing, search and filtering, wishlist, persistent cart, customer accounts, cash-on-delivery orders, and an admin dashboard.',
    tags: ['Next.js 16.3', 'React 19.2', 'TypeScript', 'Prisma 7', 'Neon PostgreSQL'],
    version: 'Production',
    icon: 'devices'
  },
  {
    id: 'salman_immigration',
    title: 'SALMAN-IMMIGRATION & TRANSLATION',
    description: 'Responsive front-end website for an immigration and translation office, with bilingual routing, localized navigation, service pages, contact integrations, and SEO-focused content.',
    tags: ['Next.js 15.5', 'React 19.1', 'next-intl', 'CSS Modules'],
    version: 'Production',
    icon: 'translate'
  }
];

export const certificatesData: CertificateData[] = [
  {
    id: 'cert_1',
    code: '285222255345',
    title: 'Front-end Web Development Diploma (React JS)',
    issuer: 'SEF Academy (Software Engineering Future)',
    date: 'April 9, 2026',
    icon: 'school',
    colorClass: 'text-primary-container',
    verificationUrl: 'https://drive.google.com/file/d/1BThBGT2SXtDv3aX32EF3_6BQitHU1p9r/view?usp=drive_link',
    duration: '5 Months',
    score: '98.28%',
    studentId: '285222255345'
  },
  {
    id: 'cert_2',
    code: 'ID-SPR-6145C8',
    title: 'Sprints x Microsoft Summer Camp - Web Development',
    issuer: 'Sprints & Microsoft',
    date: 'September 2025',
    icon: 'workspace_premium',
    colorClass: 'text-secondary',
    verificationUrl: 'https://drive.google.com/file/d/1CP12AOcoicQNj-ml_Y8k4LuE-iWCkyAh/view?usp=drive_link',
    workload: '40 Hours'
  },
  {
    id: 'cert_3',
    code: '9300040',
    title: 'Introduction to Front End Development',
    issuer: 'Simplilearn SkillUP',
    date: 'November 2, 2025',
    icon: 'developer_mode',
    colorClass: 'text-surface-tint',
    verificationUrl: 'https://drive.google.com/file/d/1VevrC-5TmH3hax6QpFmdmuhGdJ4iGi75/view?usp=drive_link'
  },
  {
    id: 'cert_4',
    code: '502b9f6d',
    title: 'Front End Developer Interface Designer',
    issuer: 'M3aarf Platform (معارف)',
    date: 'October 24, 2025',
    icon: 'layers',
    colorClass: 'text-primary-container',
    verificationUrl: 'https://drive.google.com/file/d/1NP6hlPLTrCzTt4OWx6Fny2oL4l8DitGL/view?usp=drive_link'
  },
  {
    id: 'cert_5',
    code: 'dfcf3e13',
    title: 'User Interface User Experience (UI/UX)',
    issuer: 'M3aarf Platform (معارف)',
    date: 'October 24, 2025',
    icon: 'palette',
    colorClass: 'text-secondary',
    verificationUrl: 'https://drive.google.com/file/d/1WuPsmm5p-w1G6L7k5dgguDqCl3sV1EUs/view?usp=drive_link'
  },
  {
    id: 'cert_6',
    code: 'u7180010',
    title: 'Web Development & JavaScript Certificate Bundle',
    issuer: 'Cursa Platform',
    date: 'November 2025',
    icon: 'view_in_ar',
    colorClass: 'text-surface-tint',
    verificationUrl: 'https://drive.google.com/file/d/1VM4KeyeES6OCr5BcrRitL9gW3Ou4q-uY/view?usp=drive_link',
    studentId: 'u7180010',
    subCourses: [
      'JavaScript by The Net Ninja (Completed: Nov 3, 2025)',
      'React JS for Beginners by Giraffe Academy (Completed: Nov 3, 2025)',
      'Web Development for Beginners by LearnCode.academy (Completed: Nov 3, 2025)',
      'HTML by EJ Media (Completed: Nov 1, 2025)'
    ]
  }
];

export const initSysLogs = [
  '> INITIATING QUERY: USER_PROFILE',
  '> [OK] DATA STREAM SECURED.',
  'NAME: MOAZ MOHAMED',
  'STATUS: ONLINE [ACTIVE]',
  'LOCATION: MENOUFIA, EGYPT'
];
