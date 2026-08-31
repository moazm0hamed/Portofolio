export type Language = 'en' | 'ar';

export type ActiveTab = 'home' | 'about' | 'projects' | 'certificates' | 'contact';

export interface TranslationSet {
  navHome: string;
  navAbout: string;
  navProjects: string;
  navCertifications: string;
  navSkills: string;
  navContact: string;
  role: string;
  heroTitle: string;
  heroSupporting: string;
  firstName: string;
  lastName: string;
  bio: string;
  btnViewMatrix: string;
  btnSystemAccess: string;
  statusOnline: string;
  locationLabel: string;
  locationVal: string;
  
  // About
  missionSys: string;
  missionHeading: string;
  missionHeadingHighlight: string;
  missionP1: string;
  missionP2: string;
  timelineSys: string;
  yearsLabel: string;
  projectsLabel: string;
  certsLabel: string;
  availableLabel: string;
  contactBtn: string;
  downloadCvBtn: string;
  activeStatus: string;
  readyHeading: string;
  readyDesc: string;
  initiateBtn: string;

  // Projects
  projectNexus: string;
  projectSub: string;
  horasSubtitle: string;
  horasDesc: string;
  btnDeploy: string;
  btnViewLogs: string;
  btnAccessData: string;
  efficiencyLabel: string;
  horasActiveLabel: string;

  // Skills & Vault
  systemActiveBadge: string;
  technicalArsenal: string;
  vaultTitle: string;
  vaultSub: string;
  neuralMatrix: string;
  primaryDirective: string;
  executionVelocity: string;
  velocityDesc: string;
  backendSystems: string;
  stylingUi: string;
  tooling: string;
  encryptedVault: string;
  recordsCount: string;
  hoverDecrypt: string;
  viewCertificate: string;
  decrypted: string;

  // Contact
  secureLink: string;
  secureSub: string;
  senderName: string;
  senderPlaceholder: string;
  commEmail: string;
  emailPlaceholder: string;
  subjectProtocol: string;
  subjectPlaceholder: string;
  dataPayload: string;
  payloadPlaceholder: string;
  latencyText: string;
  initiateTransBtn: string;
  transmittingBtn: string;
  transmittedBtn: string;
  toastSuccess: string;
  toastError: string;
  commChannels: string;
  commChannelsSub: string;
  linkedinLabel: string;
  githubLabel: string;
  whatsappLabel: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  version: string;
  icon: string;
}

export interface CertificateData {
  id: string;
  code: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  verificationUrl?: string;
  colorClass: string;
  duration?: string;
  score?: string;
  studentId?: string;
  workload?: string;
  subCourses?: string[];
}

export interface SysLogLine {
  text: string;
  type: 'incoming' | 'info' | 'success' | 'warning';
}
