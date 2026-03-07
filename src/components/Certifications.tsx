import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface CertItem {
  titleKey: string;
  issuerKey: string;
  dateKey: string;
  icon: string;
  accentColor: string;
}

const certs: CertItem[] = [
  {
    titleKey: 'certifications.title1',
    issuerKey: 'certifications.issuer1',
    dateKey: 'certifications.date1',
    icon: '☁️',
    accentColor: '#f97316',
  },
  {
    titleKey: 'certifications.title2',
    issuerKey: 'certifications.issuer2',
    dateKey: 'certifications.date2',
    icon: '🔴',
    accentColor: '#ef4444',
  },
  {
    titleKey: 'certifications.title3',
    issuerKey: 'certifications.issuer3',
    dateKey: 'certifications.date3',
    icon: '🐳',
    accentColor: '#3b82f6',
  },
];

export default function Certifications() {
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
        {t('Certifications')} <span>.</span>
      </h2>

      {/* Placeholder notice */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-4 mb-6 flex items-center gap-3"
        style={{ borderColor: 'rgba(245,158,11,0.2)' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm"
          style={{
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.2)',
          }}
        >
          ⏳
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {t('certifications.placeholder')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certs.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            className="glass-card p-5 group"
            style={{
              background: `linear-gradient(135deg, ${cert.accentColor}06 0%, rgba(10,15,30,0.6) 100%)`,
            }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              style={{
                background: `${cert.accentColor}12`,
                border: `1px solid ${cert.accentColor}25`,
              }}
            >
              {cert.icon}
            </div>

            {/* Title */}
            <h3
              className="text-sm font-bold mb-1 leading-snug"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t(cert.titleKey)}
            </h3>

            {/* Issuer */}
            <p className="text-xs mb-3" style={{ color: cert.accentColor }}>
              {t(cert.issuerKey)}
            </p>

            {/* Date badge */}
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)',
                color: '#fbbf24',
              }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {t(cert.dateKey)}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
