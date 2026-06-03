import { ProjectData, CertificateData } from './types';

export const projectsData: ProjectData[] = [
  {
    id: 'ps_system',
    title: 'PlayStation Management System',
    description: 'Developed management interface for gaming centers to monitor operations and track inventory; Integrated an AI Agent handling 100+ customer reservations weekly and auto-billing.',
    tags: ['React.js', 'Local Storage', 'AI Agent Integration', 'Tailwind CSS'],
    version: 'v1.4.0',
    icon: 'sports_esports'
  },
  {
    id: 'horas_erp',
    title: 'HORAS Factory Management System (ERP)',
    subtitle: 'Enterprise Resource Planning Module',
    description: 'Engineered interactive analytical dashboards providing real-time visibility into profit/loss, designed responsive UI for complex data entry, and architected comprehensive AI Agent integration.',
    tags: ['React.js', 'Node.js', 'PHP Laravel', 'PostgreSQL'],
    version: 'v4.5.1',
    icon: 'verified'
  },
  {
    id: 'horas_shop',
    title: 'Interactive E-Commerce Platform (HORAS Online Shop)',
    description: 'Engineered frontend architecture with Local Storage for cart state persistence, implemented high-contrast themes boosting retention by 20%, and optimized for 95+ Lighthouse score.',
    tags: ['JavaScript', 'Local Storage', 'CSS Flexbox', 'Tailwind CSS'],
    version: 'v1.0.2',
    icon: 'shopping_cart'
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
    workload: '40 Hours'
  },
  {
    id: 'cert_3',
    code: '9300040',
    title: 'Introduction to Front End Development',
    issuer: 'Simplilearn SkillUP',
    date: 'November 2, 2025',
    icon: 'developer_mode',
    colorClass: 'text-surface-tint'
  },
  {
    id: 'cert_4',
    code: '502b9f6d',
    title: 'Front End Developer Interface Designer',
    issuer: 'M3aarf Platform (معارف)',
    date: 'October 24, 2025',
    icon: 'layers',
    colorClass: 'text-primary-container'
  },
  {
    id: 'cert_5',
    code: 'dfcf3e13',
    title: 'User Interface User Experience (UI/UX)',
    issuer: 'M3aarf Platform (معارف)',
    date: 'October 24, 2025',
    icon: 'palette',
    colorClass: 'text-secondary'
  },
  {
    id: 'cert_6',
    code: 'u7180010',
    title: 'Web Development & JavaScript Certificate Bundle',
    issuer: 'Cursa Platform',
    date: 'November 2025',
    icon: 'view_in_ar',
    colorClass: 'text-surface-tint',
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
