import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ExperienceItem {
  periodKey: string;
  title: string;
  company: string;
  descriptionKey: string;
  tags: string[];
  current?: boolean;
  accent?: string;
}

const experiences: ExperienceItem[] = [
  {
    periodKey: 'exp.period1',
    title: 'Full-Stack Developer & DevOps Engineer',
    company: 'Kuchnia Vikinga sp. z o.o.',
    descriptionKey: 'exp.desc1',
    tags: [
      'Laravel',
      'Vue.js',
      'React',
      'Livewire',
      'Docker',
      'Proxmox',
      'AWS',
      'CI/CD',
      'Tailwind CSS',
    ],
    current: true,
    accent: '#3b82f6',
  },
  {
    periodKey: 'exp.period2',
    title: 'Full-Stack Developer & DevOps Engineer',
    company: 'DMservice sp. z o.o.',
    descriptionKey: 'exp.desc2',
    tags: [
      'Laravel',
      'Livewire',
      'PrestaShop',
      'Linux',
      'Docker',
      'Proxmox',
      'AWS',
    ],
    current: true,
    accent: '#8b5cf6',
  },
  {
    periodKey: 'exp.period3',
    title: 'Full-Stack Developer',
    company: 'MyBit Poland sp. z o.o.',
    descriptionKey: 'exp.desc3',
    tags: [
      'Laravel',
      'Vue.js',
      'React',
      'Livewire',
      'Inertia.js',
      'Tailwind CSS',
    ],
    accent: '#10b981',
  },
  {
    periodKey: 'exp.period4',
    title: 'Full-Stack Developer',
    company: 'Amsterdam Standard sp. z o.o. (d. HighSolutions)',
    descriptionKey: 'exp.desc4',
    tags: ['Laravel', 'Vue.js', 'React', 'Inertia.js', 'Bootstrap'],
    accent: '#f59e0b',
  },
  {
    periodKey: 'exp.period5',
    title: 'Full-Stack Developer',
    company: 'HighSolutions sp. z o.o.',
    descriptionKey: 'exp.desc5',
    tags: ['Laravel', 'Vue.js', 'Livewire', 'Tailwind CSS'],
    accent: '#ec4899',
  },
  {
    periodKey: 'exp.period6',
    title: 'Full-Stack Developer & Founder',
    company: 'Blue-NET',
    descriptionKey: 'exp.desc6',
    tags: ['PrestaShop', 'WordPress', 'CodeIgniter', 'Yii', 'Laravel'],
    accent: '#6366f1',
  },
];

export default function Experience() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="text-[var(--color-text-primary)]"
    >
      <h2 className="section-title">
        {t('Experience')} <span>.</span>
      </h2>

      <div className="relative pl-8">
        {/* Animated timeline line */}
        <div
          className="absolute top-2 bottom-2 timeline-line-animated"
          style={{ left: '12px' }}
        />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative mb-4 sm:mb-6 last:mb-0"
          >
            {/* Timeline dot — centered on the line */}
            <div
              className="absolute w-3 h-3 rounded-full border-2 z-10"
              style={{
                left: '-26px',
                top: '20px',
                background: exp.accent ?? '#3b82f6',
                boxShadow: `0 0 12px ${exp.accent ?? '#3b82f6'}60`,
                borderColor: 'var(--color-bg-base)',
              }}
            />

            {/* Card */}
            <div
              className="group glass-card p-4 sm:p-5 cursor-default"
              style={{
                borderLeft: `2px solid ${exp.accent ?? '#3b82f6'}40`,
              }}
            >
              {/* Top row */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-sm sm:text-base font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {exp.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm font-medium mt-0.5"
                    style={{ color: exp.accent ?? 'var(--color-accent)' }}
                  >
                    {exp.company}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap justify-end">
                  {exp.current && (
                    <span
                      className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.25)',
                        color: '#34d399',
                      }}
                    >
                      <span className="relative flex w-1.5 h-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      {t('exp.current')}
                    </span>
                  )}
                  <span
                    className="text-xs font-mono px-2 sm:px-2.5 py-1 rounded-lg"
                    style={{
                      color: 'var(--color-text-muted)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {t(exp.periodKey)}
                  </span>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t(exp.descriptionKey)}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
