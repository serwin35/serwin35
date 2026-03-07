import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

interface GitHubUser {
  public_repos: number;
}

interface GitHubSearchResult {
  total_count: number;
}

function calcAge(): number {
  const birth = new Date(1991, 9, 18);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function calcYearsOfExp(): number {
  return new Date().getFullYear() - 2008;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const HIGHLIGHT_TERMS = [
  'Laravel',
  'PHP',
  'Vue.js',
  'React',
  'AWS',
  'Docker',
  'CI/CD',
  'DevOps',
  'CRM/ERP',
  'Livewire',
];

/** Split bio text into highlighted React segments — no innerHTML */
function HighlightedBio({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${HIGHLIGHT_TERMS.map((t) => t.replace(/[.+]/g, '\\$&')).join('|')})`,
    'g',
  );
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        HIGHLIGHT_TERMS.includes(part) ? (
          <span
            key={i}
            style={{ color: 'var(--color-accent-light)', fontWeight: 500 }}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function About() {
  const { t } = useTranslation();
  const age = calcAge();
  const yearsExp = calcYearsOfExp();

  const { data: ghUser } = useSWR<GitHubUser>(
    'https://api.github.com/users/serwin35',
    fetcher,
    { revalidateOnFocus: false },
  );
  const { data: ghCommits } = useSWR<GitHubSearchResult>(
    'https://api.github.com/search/commits?q=author:serwin35&per_page=1',
    fetcher,
    { revalidateOnFocus: false },
  );
  const { data: ghPRs } = useSWR<GitHubSearchResult>(
    'https://api.github.com/search/issues?q=author:serwin35+type:pr&per_page=1',
    fetcher,
    { revalidateOnFocus: false },
  );

  const stats = [
    { value: `${yearsExp}+`, label: t('about.statYears'), accent: '#3b82f6' },
    { value: '90+', label: t('about.statProjects'), accent: '#8b5cf6' },
    { value: '5', label: t('about.statCompanies'), accent: '#10b981' },
    { value: `${age}`, label: t('about.yearsOld'), accent: '#f59e0b' },
  ];

  const ghStats = [
    { value: ghUser?.public_repos ?? '—', label: t('about.ghRepos') },
    {
      value:
        ghCommits?.total_count != null
          ? `${ghCommits.total_count.toLocaleString()}+`
          : '—',
      label: t('about.ghCommits'),
    },
    {
      value:
        ghPRs?.total_count != null
          ? `${ghPRs.total_count.toLocaleString()}+`
          : '—',
      label: t('about.ghPRs'),
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="text-[var(--color-text-primary)]"
    >
      <motion.h2 variants={fadeUp} custom={0} className="section-title">
        {t('About Me')} <span>.</span>
      </motion.h2>

      {/* Bento grid */}
      <div className="bento-grid mb-8">
        {/* Bio cell — wide */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="bento-cell-wide glass-card p-6 flex flex-col justify-between"
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              About Me
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <HighlightedBio text={t('about.bio')} />
            </p>
          </div>
        </motion.div>

        {/* Stat cells — narrow column */}
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i + 2}
            className="bento-cell-narrow glass-card p-5 flex flex-col items-center justify-center text-center"
            style={{ minHeight: '110px' }}
          >
            <span
              className="text-3xl font-black mb-1"
              style={{ color: stat.accent }}
            >
              {stat.value}
            </span>
            <span
              className="text-xs leading-tight"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}

        {/* GitHub card — full width */}
        <motion.div
          variants={fadeUp}
          custom={6}
          className="bento-cell-full glass-card p-6"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <svg
              className="w-5 h-5"
              style={{ color: 'var(--color-accent)' }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span
              className="font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              GitHub — serwin35
            </span>
            <a
              href="https://github.com/serwin35"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs px-3 py-1 rounded-lg transition-colors hover:bg-[var(--color-accent-muted)]"
              style={{
                color: 'var(--color-accent)',
                border: '1px solid var(--color-accent-border)',
              }}
            >
              View Profile
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
            {ghStats.map((item, i) => (
              <div
                key={i}
                className="text-center rounded-xl py-3 px-2"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span
                  className="block text-xl font-bold"
                  style={{ color: 'var(--color-accent-light)' }}
                >
                  {item.value}
                </span>
                <span
                  className="text-xs"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <img
              src="https://ghchart.rshah.org/3b82f6/serwin35"
              alt="GitHub contribution chart"
              className="w-full h-auto block"
              style={{ opacity: 0.85 }}
            />
          </div>
        </motion.div>

        {/* Personal info — half */}
        <motion.div
          variants={fadeUp}
          custom={7}
          className="bento-cell-half glass-card p-6"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--color-violet)' }}
          >
            {t('Personal Information')}
          </p>
          <div className="space-y-4">
            {[
              {
                label: 'E-mail',
                value: 'mateusz.serwinowski@gmail.com',
                href: 'mailto:mateusz.serwinowski@gmail.com',
              },
              {
                label: t('Phone'),
                value: '+48 576-721-998',
                href: 'tel:+48576721998',
              },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="text-xs mb-1 uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-[var(--color-accent)] break-all"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Location card — half */}
        <motion.div
          variants={fadeUp}
          custom={8}
          className="bento-cell-half glass-card p-6 flex flex-col justify-between"
          style={{
            background:
              'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.04) 100%)',
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-accent)' }}
          >
            Location &amp; Status
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
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
              <span
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Lodz, Poland
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm text-emerald-400 font-medium">
                Open to work
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
              </svg>
              <span
                className="text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Volunteer Firefighter
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
