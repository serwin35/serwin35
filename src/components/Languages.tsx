import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Language {
  nameKey: string;
  level: string;
  proficiency: number;
  flag: string;
  cefrDesc: string;
  accent: string;
}

const CEFR_LABELS: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Mastery',
};

const languages: Language[] = [
  {
    nameKey: 'Polish',
    level: 'Native',
    proficiency: 100,
    flag: '🇵🇱',
    cefrDesc: 'C2 — Native Speaker',
    accent: '#ef4444',
  },
  {
    nameKey: 'English',
    level: 'B2',
    proficiency: 72,
    flag: '🇬🇧',
    cefrDesc: 'B2 — Upper Intermediate',
    accent: '#3b82f6',
  },
];

function CircleProgress({
  value,
  color,
  size = 80,
}: {
  value: number;
  color: string;
  size?: number;
}) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={6}
      />
      {/* Progress */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
      />
    </svg>
  );
}

export default function Languages() {
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
        {t('Languages')} <span>.</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
        {languages.map((lang, index) => {
          const levelLabel =
            lang.level === 'Native'
              ? t('Native')
              : `${lang.level} — ${CEFR_LABELS[lang.level] ?? ''}`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card p-6"
              style={{
                background: `linear-gradient(135deg, ${lang.accent}08 0%, rgba(10,15,30,0.6) 100%)`,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Circle progress */}
                <div className="relative shrink-0">
                  <CircleProgress
                    value={lang.proficiency}
                    color={lang.accent}
                    size={80}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl">{lang.flag}</span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {t(lang.nameKey)}
                  </h3>
                  <p className="text-sm" style={{ color: lang.accent }}>
                    {lang.cefrDesc}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {levelLabel}
                  </p>
                </div>
              </div>

              {/* Proficiency bar */}
              <div className="mt-4">
                <div
                  className="w-full h-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${lang.accent}, ${lang.accent}80)`,
                      boxShadow: `0 0 8px ${lang.accent}50`,
                    }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {t('Level')}
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: lang.accent }}
                  >
                    {lang.proficiency}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
