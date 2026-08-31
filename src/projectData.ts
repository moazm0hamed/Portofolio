import playstationSystem from './assets/images/playstation_system.webp';
import horasStorefront from './assets/images/horas_storefront.webp';
import horasOnlineStore from './assets/images/horas_online_store.webp';
import salmanImmigration from './assets/images/salman_immigration.webp';

export type ProjectCategory = 'all' | 'enterprise' | 'ecommerce' | 'management';
export type ProjectId = 'ps-management' | 'horas-store' | 'horas-electronics' | 'salman-immigration';

type LocalizedText = {
  en: string;
  ar: string;
};

export type AdminAccess = {
  title: LocalizedText;
  description: LocalizedText;
  demoEmail: string;
  demoPassword: string;
  note: LocalizedText;
};

export type DemoAccess = {
  title: LocalizedText;
  description: LocalizedText;
  username: string;
  password: string;
};

export type ProjectMetric = {
  value: string;
  label: LocalizedText;
};

export type Project = {
  id: ProjectId;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  version: string;
  icon: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageFit?: 'cover' | 'contain';
  imageAlt: LocalizedText;
  type: LocalizedText;
  description: LocalizedText;
  metrics: ProjectMetric[];
  technologies: string[];
  accent: 'cyan' | 'purple';
  featured?: boolean;
  hasLogs?: boolean;
  url?: string;
  cta: LocalizedText;
  adminUrl?: string;
  adminCta?: LocalizedText;
  adminAccess?: AdminAccess;
  demoAccess?: DemoAccess;
};

export const projectFilters: Array<{
  id: ProjectCategory;
  label: LocalizedText;
  icon: string;
}> = [
  { id: 'all', label: { en: 'ALL PROJECTS', ar: 'كل المشاريع' }, icon: 'apps' },
  { id: 'enterprise', label: { en: 'BUSINESS WEBSITES', ar: 'مواقع الأعمال' }, icon: 'database' },
  { id: 'ecommerce', label: { en: 'E-COMMERCE', ar: 'التجارة الإلكترونية' }, icon: 'shopping_cart' },
  { id: 'management', label: { en: 'DASHBOARDS', ar: 'لوحات التحكم' }, icon: 'monitoring' },
];

export const projects: Project[] = [
  {
    id: 'ps-management',
    title: 'PlayStation Session Manager',
    category: 'management',
    version: 'PRODUCTION',
    icon: 'sports_esports',
    image: playstationSystem,
    imageWidth: 1536,
    imageHeight: 1024,
    imageFit: 'contain',
    imageAlt: {
      en: 'PlayStation session management system dashboards',
      ar: 'واجهات نظام إدارة جلسات البلايستيشن',
    },
    type: { en: 'SESSION MANAGEMENT SYSTEM', ar: 'نظام إدارة الجلسات' },
    description: {
      en: 'Front-end dashboard for gaming-center operations, including session management, billing, inventory, shifts, and reporting workflows. Built with React and integrated with secure APIs and PostgreSQL-backed services.',
      ar: 'لوحة تحكم أمامية لإدارة عمليات مراكز الألعاب، تشمل الجلسات والفوترة والمخزون والورديات وتقارير التشغيل. بُنيت باستخدام React ومتكاملة مع واجهات API آمنة وخدمات مدعومة بـ PostgreSQL.',
    },
    metrics: [
      { value: 'UI', label: { en: 'RESPONSIVE DASHBOARD', ar: 'لوحة تحكم متجاوبة' } },
      { value: 'API', label: { en: 'API INTEGRATION', ar: 'تكامل API' } },
      { value: 'DATA', label: { en: 'DATABASE-CONNECTED FEATURES', ar: 'ميزات متصلة بقاعدة البيانات' } },
    ],
    technologies: ['React 19', 'TypeScript', 'Express 5', 'Neon + Drizzle'],
    accent: 'cyan',
    hasLogs: false,
    url: 'https://playstation-session-manager.vercel.app/',
    cta: { en: 'LIVE DEMO', ar: 'المعاينة المباشرة' },
    demoAccess: {
      title: { en: 'SYSTEM ACCESS', ar: 'الدخول إلى النظام' },
      description: {
        en: 'Use the demo credentials below to explore the PlayStation Session Manager.',
        ar: 'استخدم بيانات الدخول التجريبية دي لتجربة نظام إدارة جلسات البلايستيشن.',
      },
      username: 'moaz',
      password: 'moaz2411',
    },
  },
  {
    id: 'horas-store',
    title: 'HORAS Clothing Store',
    category: 'ecommerce',
    version: 'PRODUCTION',
    icon: 'shopping_cart',
    image: horasStorefront,
    imageWidth: 1536,
    imageHeight: 1024,
    imageFit: 'contain',
    imageAlt: {
      en: 'HORAS fashion storefront homepage',
      ar: 'الصفحة الرئيسية لمتجر هوراس للأزياء',
    },
    type: { en: 'E-COMMERCE PLATFORM', ar: 'منصة تجارة إلكترونية' },
    description: {
      en: 'Front-end e-commerce experience for a clothing brand, with responsive product collections, search, cart management, admin content workflows, and database-connected features.',
      ar: 'تجربة تجارة إلكترونية أمامية لعلامة أزياء، تتضمن مجموعات منتجات متجاوبة والبحث وإدارة السلة وتدفقات إدارة المحتوى وميزات متصلة بقاعدة البيانات.',
    },
    metrics: [
      { value: 'SHOP', label: { en: 'ONLINE STORE', ar: 'متجر إلكتروني' } },
      { value: 'MOBILE', label: { en: 'MOBILE-FRIENDLY INTERFACE', ar: 'واجهة مناسبة للموبايل' } },
      { value: 'ADMIN', label: { en: 'ADMIN TOOLS', ar: 'أدوات إدارية' } },
    ],
    technologies: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL'],
    accent: 'purple',
    url: 'https://horas-store.vercel.app/',
    cta: { en: 'LIVE DEMO', ar: 'المعاينة المباشرة' },
    adminUrl: 'https://horas-store.vercel.app/admin',
    adminCta: { en: 'OPEN ADMIN DASHBOARD', ar: 'فتح لوحة التحكم' },
    adminAccess: {
      title: { en: 'ADMIN DASHBOARD PREVIEW', ar: 'معاينة لوحة التحكم' },
      description: {
        en: 'Explore the protected dashboard used to manage products, inventory, orders, customers, and store settings.',
        ar: 'يمكنك تجربة لوحة التحكم المستخدمة لإدارة المنتجات والمخزون والطلبات والعملاء وإعدادات المتجر.',
      },
      demoEmail: 'admin@horas.com',
      demoPassword: 'horasstore123',
      note: { en: 'Demo credentials are provided for portfolio review only.', ar: 'بيانات الدخول متاحة لمراجعة المشروع فقط.' },
    },
  },
  {
    id: 'horas-electronics',
    title: 'HORAS Electronics Store',
    category: 'ecommerce',
    version: 'PRODUCTION',
    icon: 'devices',
    image: horasOnlineStore,
    imageWidth: 1536,
    imageHeight: 1024,
    imageFit: 'contain',
    imageAlt: {
      en: 'HORAS electronics online store across desktop and mobile screens',
      ar: 'متجر هوراس للإلكترونيات على شاشات الكمبيوتر والموبايل',
    },
    type: { en: 'E-COMMERCE PLATFORM', ar: 'منصة تجارة إلكترونية' },
    description: {
      en: 'A modern bilingual e-commerce platform for electronics, featuring product browsing, search, filtering, cart management, wishlist, customer accounts, cash-on-delivery orders, and a protected admin dashboard.',
      ar: 'متجر إلكترونيات متكامل ومتجاوب، تقدر تتصفح المنتجات وتبحث عنها وتفلترها وتضيفها للسلة أو المفضلة، مع حسابات للعملاء وطلبات الدفع عند الاستلام ولوحة تحكم محمية.',
    },
    metrics: [
      { value: 'SHOP', label: { en: 'RESPONSIVE E-COMMERCE', ar: 'متجر إلكتروني متجاوب' } },
      { value: 'RTL', label: { en: 'ARABIC / ENGLISH RTL', ar: 'العربية والإنجليزية RTL' } },
      { value: 'ADMIN', label: { en: 'ADMIN DASHBOARD', ar: 'لوحة التحكم' } },
    ],
    technologies: ['Next.js 16.3', 'React 19.2', 'TypeScript', 'Tailwind CSS 4', 'Prisma 7', 'Neon PostgreSQL', 'NextAuth v5', 'Argon2', 'next-intl', 'Motion', 'Lucide React'],
    accent: 'purple',
    hasLogs: false,
    url: 'https://horas-electronics-store.vercel.app/',
    cta: { en: 'LIVE DEMO', ar: 'عرض الموقع' },
    adminUrl: 'https://horas-electronics-store.vercel.app/admin',
    adminCta: { en: 'OPEN ADMIN DASHBOARD', ar: 'فتح لوحة التحكم' },
    adminAccess: {
      title: { en: 'Admin Dashboard Preview', ar: 'معاينة لوحة التحكم' },
      description: {
        en: 'Explore the protected dashboard used to manage products, inventory, orders, customers, coupons, reviews, and store settings.',
        ar: 'يمكنك تجربة لوحة التحكم المستخدمة لإدارة المنتجات والمخزون والطلبات والعملاء والكوبونات والمراجعات وإعدادات المتجر.',
      },
      demoEmail: 'horasadmin@gmail.com',
      demoPassword: 'horasadmin12',
      note: { en: 'Demo credentials are provided for portfolio review only.', ar: 'بيانات الدخول متاحة لمراجعة المشروع فقط.' },
    },
  },
  {
    id: 'salman-immigration',
    title: 'SALMAN-IMMIGRATION & TRANSLATION',
    category: 'enterprise',
    version: 'NEXT 15.5',
    icon: 'translate',
    image: salmanImmigration,
    imageWidth: 1536,
    imageHeight: 1024,
    imageFit: 'contain',
    imageAlt: {
      en: 'SALMAN Immigration and Translation website across desktop and mobile screens',
      ar: 'موقع سلمان للهجرة والترجمة على شاشات الكمبيوتر والموبايل',
    },
    type: { en: 'IMMIGRATION & TRANSLATION SERVICES', ar: 'خدمات الهجرة والترجمة' },
    description: {
      en: 'Responsive front-end website for an immigration and translation office, with bilingual routing, localized navigation, service pages, contact integrations, and SEO-focused content.',
      ar: 'موقع أمامي متجاوب لمكتب هجرة وترجمة، مع مسارات ثنائية اللغة وتنقل محلي وصفحات خدمات وتكاملات تواصل ومحتوى يراعي تحسين الظهور في محركات البحث.',
    },
    metrics: [
      { value: 'MOBILE', label: { en: 'MOBILE-FRIENDLY INTERFACE', ar: 'واجهة مناسبة للموبايل' } },
      { value: 'API', label: { en: 'API INTEGRATION', ar: 'تكامل API' } },
      { value: 'ADMIN', label: { en: 'ADMIN TOOLS', ar: 'أدوات إدارية' } },
    ],
    technologies: ['Next.js 15.5', 'React 19.1', 'next-intl', 'CSS Modules'],
    accent: 'cyan',
    hasLogs: false,
    url: 'https://salman-immigration-translation-omega.vercel.app/',
    cta: { en: 'LIVE DEMO', ar: 'المعاينة المباشرة' },
  },
];
