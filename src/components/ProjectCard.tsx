import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import type { Language } from '../types';
import type { Project } from '../projectData';

type ProjectCardProps = {
  key?: string;
  project: Project;
  lang: Language;
  isLoading?: boolean;
  progress?: number;
  deployLabel: string;
  logsLabel: string;
  onPrimaryAction?: () => void;
  onViewLogs?: () => void;
  onFeedback: () => void;
};

export default function ProjectCard({
  project,
  lang,
  isLoading = false,
  progress = 0,
  deployLabel,
  logsLabel,
  onPrimaryAction,
  onViewLogs,
  onFeedback,
}: ProjectCardProps) {
  const [copiedCredential, setCopiedCredential] = useState<'email' | 'password' | 'username' | null>(null);
  const reduceMotion = useReducedMotion();
  const isPurple = project.accent === 'purple';
  const accentText = isPurple ? 'text-secondary' : 'text-primary-container';
  const accentBorder = isPurple ? 'border-secondary/45' : 'border-primary-container/35';
  const accentGlow = isPurple
    ? 'hover:shadow-[0_14px_42px_rgba(112,0,255,0.18)]'
    : 'hover:shadow-[0_14px_42px_rgba(0,240,255,0.16)]';

  const actionContent = (
    <>
      <span>{isLoading ? `${progress}%` : project.cta[lang]}</span>
      <span className="material-symbols-outlined text-base" aria-hidden="true">
        {isLoading ? 'sync' : 'arrow_forward'}
      </span>
    </>
  );

  const actionClass = `min-h-11 w-full rounded-lg border font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b0d] ${
    project.featured
      ? 'border-primary-container bg-primary-container text-background hover:bg-primary-container/90 focus-visible:ring-primary-container'
      : isPurple
        ? 'border-secondary/70 bg-secondary/10 text-secondary hover:bg-secondary/20 focus-visible:ring-secondary'
        : 'border-primary-container/65 bg-primary-container/5 text-primary-container hover:bg-primary-container/15 focus-visible:ring-primary-container'
  }`;

  const copyCredential = async (field: 'email' | 'password' | 'username', value: string) => {
    const confirmCopy = () => {
      setCopiedCredential(field);
      window.setTimeout(() => setCopiedCredential((current) => current === field ? null : current), 1800);
    };

    try {
      await navigator.clipboard.writeText(value);
      confirmCopy();
    } catch {
      const fallbackInput = document.createElement('textarea');
      fallbackInput.value = value;
      fallbackInput.setAttribute('readonly', '');
      fallbackInput.style.position = 'fixed';
      fallbackInput.style.opacity = '0';
      document.body.appendChild(fallbackInput);
      fallbackInput.select();
      const copied = document.execCommand('copy');
      fallbackInput.remove();

      if (copied) confirmCopy();
    }
  };

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
      className={`group glass-panel flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-surface-dim/80 p-4 sm:p-5 ${accentBorder} ${accentGlow} ${
        project.featured ? 'shadow-[0_0_26px_rgba(0,240,255,0.1)]' : ''
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={`material-symbols-outlined text-2xl ${accentText}`} aria-hidden="true">
          {project.icon}
        </span>
        <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${accentText}`}>
          {project.version}
        </span>
      </div>

      <div className={`relative mb-5 aspect-video overflow-hidden rounded-lg border bg-surface-lowest ${accentBorder}`}>
        <img
          src={project.image}
          alt={project.imageAlt[lang]}
          width={project.imageWidth}
          height={project.imageHeight}
          loading="lazy"
          decoding="async"
          className={`h-full w-full transition-transform duration-500 ${
            project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
          } ${reduceMotion ? '' : 'group-hover:scale-[1.025]'}`}
        />
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-lowest/90 p-5 backdrop-blur-md">
            <span className={`material-symbols-outlined mb-3 text-3xl animate-spin ${accentText}`} aria-hidden="true">sync</span>
            <span className={`mb-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] ${accentText}`}>
              {deployLabel}
            </span>
            <div className="h-1.5 w-36 max-w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full transition-[width] ${isPurple ? 'bg-secondary' : 'bg-primary-container'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <div className="mb-3">
          <span className={`inline-flex max-w-full rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] ${accentBorder} ${accentText}`}>
            {project.type[lang]}
          </span>
        </div>

        <h3 className={`mb-3 break-words text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl ${
          project.id === 'horas-store' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]' : 'text-white'
        }`}>
          {project.title}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-on-surface-variant">
          {project.description[lang]}
        </p>

        <dl className="mb-5 grid grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-black/20">
          {project.metrics.map((metric, index) => (
            <div key={metric.label.en} className={`min-w-0 px-1.5 py-3 text-center sm:px-2 ${index > 0 ? 'border-s border-white/10' : ''}`}>
              <dd className={`break-words font-mono text-xs font-black sm:text-sm ${accentText}`}>{metric.value}</dd>
              <dt className="mt-1 break-words font-mono text-[7px] uppercase leading-tight tracking-[0.08em] text-on-surface-variant sm:text-[8px]">
                {metric.label[lang]}
              </dt>
            </div>
          ))}
        </dl>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <span key={technology} className={`rounded-full border px-2 py-1 font-mono text-[8px] uppercase tracking-wide ${accentBorder} ${accentText}`}>
              {technology}
            </span>
          ))}
        </div>

        {project.demoAccess && (
          <div className="mb-4 rounded-lg border border-white/10 bg-black/20 p-2.5 text-left rtl:text-right">
            <h4 className={`font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${accentText}`}>{project.demoAccess.title[lang]}</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">{project.demoAccess.description[lang]}</p>
            <div className="mt-2 grid grid-cols-1 gap-1.5 font-mono text-[9px] text-white/70 sm:grid-cols-2">
              {([
                { field: 'username' as const, label: lang === 'en' ? 'Username' : 'اسم المستخدم', value: project.demoAccess.username },
                { field: 'password' as const, label: lang === 'en' ? 'Password' : 'كلمة المرور', value: project.demoAccess.password },
              ]).map((credential) => (
                <div key={credential.field} className="flex min-w-0 items-center justify-between gap-2 rounded border border-white/10 px-2 py-1.5">
                  <span className="min-w-0 break-all"><span className="text-on-surface-variant">{credential.label}: </span>{credential.value}</span>
                  <button
                    type="button"
                    onClick={() => void copyCredential(credential.field, credential.value)}
                    aria-label={lang === 'en' ? `Copy ${credential.label}` : `نسخ ${credential.label}`}
                    className={`shrink-0 rounded border px-1.5 py-1 font-mono text-[8px] font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 ${accentBorder} ${accentText}`}
                  >
                    {copiedCredential === credential.field ? (lang === 'en' ? 'COPIED' : 'تم النسخ') : (lang === 'en' ? 'COPY' : 'نسخ')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {project.adminAccess && (
          <div className="mb-5 rounded-lg border border-white/10 bg-black/20 p-3 text-left rtl:text-right">
            <h4 className={`font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${accentText}`}>{project.adminAccess.title[lang]}</h4>
            <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{project.adminAccess.description[lang]}</p>
            <div className="mt-2 grid grid-cols-1 gap-2 font-mono text-[9px] text-white/70 sm:grid-cols-2">
              {([
                { field: 'email' as const, label: lang === 'en' ? 'Demo Email' : 'البريد الإلكتروني التجريبي', value: project.adminAccess.demoEmail },
                { field: 'password' as const, label: lang === 'en' ? 'Demo Password' : 'كلمة المرور التجريبية', value: project.adminAccess.demoPassword },
              ]).map((credential) => (
                <div key={credential.field} className="flex min-w-0 items-center justify-between gap-2 rounded border border-white/10 px-2 py-1.5">
                  <span className="min-w-0 break-all"><span className="text-on-surface-variant">{credential.label}: </span>{credential.value}</span>
                  <button
                    type="button"
                    onClick={() => void copyCredential(credential.field, credential.value)}
                    aria-label={lang === 'en' ? `Copy ${credential.label}` : `نسخ ${credential.label}`}
                    className={`shrink-0 rounded border px-1.5 py-1 font-mono text-[8px] font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 ${accentBorder} ${accentText}`}
                  >
                    {copiedCredential === credential.field ? (lang === 'en' ? 'COPIED' : 'تم النسخ') : (lang === 'en' ? 'COPY' : 'نسخ')}
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[9px] text-on-surface-variant">{project.adminAccess.note[lang]}</p>
          </div>
        )}

        <div className="mt-auto space-y-3">
          {onViewLogs ? (
            <button
              type="button"
              onClick={() => { onFeedback(); onViewLogs(); }}
              className={`min-h-11 w-full rounded-lg border border-white/10 bg-white/[0.025] font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 ${isPurple ? 'focus-visible:ring-secondary' : 'focus-visible:ring-primary-container'}`}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">terminal</span>
                {logsLabel}
              </span>
            </button>
          ) : null}

          {project.url ? (
            <>
              <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={onFeedback} className={actionClass}>
                {actionContent}
              </a>
              {project.adminCta && (
                project.adminUrl?.startsWith('http') ? (
                  <a href={project.adminUrl} target="_blank" rel="noopener noreferrer" onClick={onFeedback} className="min-h-11 w-full rounded-lg border border-white/10 bg-white/[0.025] px-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container flex items-center justify-center">
                    {project.adminCta[lang]}
                  </a>
                ) : (
                  <button type="button" disabled title={lang === 'en' ? 'Admin URL required' : 'رابط لوحة التحكم مطلوب'} className="min-h-11 w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/[0.025] px-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-on-surface-variant/60 flex items-center justify-center">
                    {project.adminCta[lang]}
                  </button>
                )
              )}
            </>
          ) : (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => { onFeedback(); onPrimaryAction?.(); }}
              className={`${actionClass} disabled:cursor-wait disabled:opacity-80`}
            >
              {actionContent}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
