import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface EducationItem {
  periodKey: string;
  titleKey: string;
  institutionKey: string;
  descriptionKey: string;
  type: 'university' | 'highschool';
  accent: string;
}

const educations: EducationItem[] = [
  {
    periodKey: 'edu.period1',
    titleKey: 'edu.title1',
    institutionKey: 'edu.institution1',
    descriptionKey: 'edu.desc1',
    type: 'university',
    accent: '#3b82f6',
  },
  {
    periodKey: 'edu.period2',
    titleKey: 'edu.title2',
    institutionKey: 'edu.institution2',
    descriptionKey: 'edu.desc2',
    type: 'highschool',
    accent: '#8b5cf6',
  },
];

function UniversityIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
      />
    </svg>
  );
}

function HighschoolIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

export default function Education() {
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
        {t('Education')} <span>.</span>
      </h2>

      <div className="relative" style={{ paddingLeft: '40px' }}>
        <div
          className="absolute top-2 bottom-2 timeline-line-animated"
          style={{ left: '14px' }}
        />

        {educations.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative mb-6 last:mb-0"
          >
            {/* Timeline dot — centered on the line */}
            <div
              className="absolute w-3 h-3 rounded-full border-2 z-10"
              style={{
                left: '-31px',
                top: '20px',
                background: edu.accent,
                boxShadow: `0 0 12px ${edu.accent}60`,
                borderColor: 'var(--color-bg-base)',
              }}
            />

            <div
              className="glass-card p-5"
              style={{ borderLeft: `2px solid ${edu.accent}40` }}
            >
              <div className="flex items-start gap-4">
                {/* Icon badge */}
                <div
                  className="mt-0.5 w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${edu.accent}15`,
                    border: `1px solid ${edu.accent}30`,
                    color: edu.accent,
                  }}
                >
                  {edu.type === 'university' ? (
                    <UniversityIcon />
                  ) : (
                    <HighschoolIcon />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-1 mb-1">
                    <h3
                      className="text-base font-semibold"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {t(edu.titleKey)}
                    </h3>
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-lg shrink-0"
                      style={{
                        color: 'var(--color-text-muted)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {t(edu.periodKey)}
                    </span>
                  </div>
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: edu.accent }}
                  >
                    {t(edu.institutionKey)}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {t(edu.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
