import type React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const langs = [
    { code: 'pl', label: 'PL' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)]"
      role="group"
      aria-label="Language switcher"
    >
      {langs.map((lang) => {
        const isActive = i18n.language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            aria-pressed={isActive}
            className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
              isActive
                ? 'text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="lang-indicator"
                className="absolute inset-0 rounded-md bg-[var(--color-accent)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
