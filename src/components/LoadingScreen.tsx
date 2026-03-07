import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LINES = [
  'Initializing portfolio...',
  'Loading projects...',
  'Connecting to AWS...',
  'Ready.',
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 24);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const thresholds = [0, 30, 65, 90];
    const idx = thresholds.filter((t) => progress >= t).length - 1;
    setLineIdx(Math.min(idx, LINES.length - 1));
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.06) 0%, #050810 60%)',
      }}
    >
      {/* Logo with pulsing glow */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="relative mb-8"
      >
        {/* Outer ring pulsing */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(59,130,246,0.4)',
              '0 0 0 16px rgba(59,130,246,0)',
              '0 0 0 0 rgba(59,130,246,0)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
        />
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl text-white select-none"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #6d28d9 100%)',
            boxShadow:
              '0 0 40px rgba(59,130,246,0.4), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          MS
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-2xl font-bold mb-1"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Mateusz Serwinowski
      </motion.h1>

      {/* Staggered subtitle reveal */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm mb-10"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Full-Stack Developer &amp; DevOps Engineer
      </motion.p>

      {/* Terminal-style status lines */}
      <div className="w-72 mb-6 min-h-[5rem]">
        {LINES.slice(0, lineIdx + 1).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 mb-1.5"
          >
            <span className="text-emerald-400 text-xs font-mono">{'>'}</span>
            <span
              className="text-xs font-mono"
              style={{
                color:
                  i === lineIdx
                    ? 'var(--color-text-secondary)'
                    : 'var(--color-text-muted)',
              }}
            >
              {line}
            </span>
            {i === lineIdx && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-1.5 h-3.5 rounded-sm"
                style={{ background: 'var(--color-accent)' }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-72">
        <div
          className="w-full h-0.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              boxShadow: '0 0 8px rgba(59,130,246,0.5)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Loading
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--color-accent)' }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
