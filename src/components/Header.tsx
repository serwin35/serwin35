import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import avatarImg from '../assets/images/avatar.jpg';

interface HeaderProps {
  onNavigate: (id: string) => void;
}

const ROLES = [
  'Full-Stack Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Laravel Specialist',
];

function useTypingEffect(words: readonly string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  // Stable ref so words array reference doesn't break the effect
  const wordsRef = useRef(words);

  useEffect(() => {
    const wList = wordsRef.current;
    const current = wList[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % wList.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, speed, pause]);

  return displayed;
}

function calcYearsOfExp(): number {
  return new Date().getFullYear() - 2008;
}

export default function Header({ onNavigate }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const yearsExp = calcYearsOfExp();
  const typedRole = useTypingEffect(ROLES);

  const stats = [
    { value: `${yearsExp}+`, label: t('header.yearsExp') },
    { value: '90+', label: t('header.projects') },
    { value: 'Full-Stack', label: '& DevOps' },
    { value: t('header.remote'), label: 'Available' },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-12"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(139,92,246,0.06) 0%, transparent 60%)',
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          className="relative inline-block mb-8"
        >
          {/* Spinning gradient ring */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="avatar-ring" />
            <div className="avatar-ring-mask" />
            <div className="relative w-32 h-32 rounded-full overflow-hidden z-10 ring-2 ring-[rgba(59,130,246,0.2)]">
              <img
                src={avatarImg}
                alt="Mateusz Serwinowski"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online badge */}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="absolute bottom-1 right-1 z-20 flex items-center justify-center w-6 h-6 rounded-full border-2 border-[var(--color-bg-base)]"
              style={{ background: '#10b981' }}
            >
              <span
                className="absolute w-full h-full rounded-full opacity-75 pulse-dot"
                style={{ background: '#10b981' }}
              />
              <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </motion.span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-4"
          key={i18n.language}
        >
          <span className="gradient-text">{t('header.title')}</span>
        </motion.h1>

        {/* Typed role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6 h-10"
        >
          <span
            className="text-xl md:text-2xl font-semibold"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            I&apos;m a{' '}
          </span>
          <span
            className="text-xl md:text-2xl font-bold"
            style={{ color: 'var(--color-accent-light)' }}
          >
            {typedRole}
            <span
              className="inline-block w-0.5 h-6 ml-0.5 align-middle animate-pulse"
              style={{ background: 'var(--color-accent)' }}
            />
          </span>
        </motion.div>

        {/* Location + firefighter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm mb-10"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <span className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
              style={{ color: 'var(--color-accent)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {t('header.cityAndCountry')}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
          <span className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
            {t('header.firefighter')}
          </span>
        </motion.div>

        {/* Stat badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
          key={`stats-${i18n.language}`}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="flex flex-col items-center px-5 py-3 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="text-xl font-bold"
                style={{ color: 'var(--color-accent-light)' }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs mt-0.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <a
            href="mailto:mateusz.serwinowski@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105 hover-glow"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6d28d9)',
              boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            {t('header.contact')}
          </a>
          <a
            href="https://github.com/serwin35"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--color-text-primary)',
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mateusz-serwin-serwinowski/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--color-text-primary)',
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Scroll down indicator — outside content container, pinned to bottom of hero */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        onClick={() => onNavigate('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-20"
        style={{ color: 'var(--color-text-muted)' }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-medium group-hover:text-[var(--color-accent)] transition-colors">
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--color-accent)' }}
          />
        </div>
      </motion.button>
    </div>
  );
}
