import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SkillCategory {
  nameKey: string;
  icon: string;
  skills: { name: string; weight: 'primary' | 'secondary' | 'tertiary' }[];
  accentColor: string;
}

const skillCategories: SkillCategory[] = [
  {
    nameKey: 'Programming languages',
    icon: '{ }',
    accentColor: '#3b82f6',
    skills: [
      { name: 'PHP', weight: 'primary' },
      { name: 'JavaScript', weight: 'primary' },
      { name: 'TypeScript', weight: 'secondary' },
      { name: 'Python', weight: 'tertiary' },
      { name: 'HTML / CSS', weight: 'primary' },
    ],
  },
  {
    nameKey: 'Framework PHP',
    icon: '🐘',
    accentColor: '#8b5cf6',
    skills: [
      { name: 'Laravel', weight: 'primary' },
      { name: 'Livewire', weight: 'primary' },
      { name: 'CodeIgniter', weight: 'secondary' },
      { name: 'Symfony', weight: 'tertiary' },
    ],
  },
  {
    nameKey: 'Framework JavaScript',
    icon: '⚡',
    accentColor: '#f59e0b',
    skills: [
      { name: 'Vue.js', weight: 'primary' },
      { name: 'React', weight: 'primary' },
      { name: 'Inertia.js', weight: 'primary' },
      { name: 'Alpine.js', weight: 'secondary' },
    ],
  },
  {
    nameKey: 'Framework CSS',
    icon: '🎨',
    accentColor: '#06b6d4',
    skills: [
      { name: 'Tailwind CSS', weight: 'primary' },
      { name: 'Bootstrap', weight: 'secondary' },
      { name: 'Sass / SCSS', weight: 'secondary' },
    ],
  },
  {
    nameKey: 'Databases',
    icon: '🗄️',
    accentColor: '#10b981',
    skills: [
      { name: 'MySQL', weight: 'primary' },
      { name: 'PostgreSQL', weight: 'secondary' },
      { name: 'SQLite', weight: 'secondary' },
      { name: 'MSSQL', weight: 'tertiary' },
      { name: 'Redis', weight: 'secondary' },
    ],
  },
  {
    nameKey: 'DevOps and Systems',
    icon: '🛠️',
    accentColor: '#ec4899',
    skills: [
      { name: 'Docker', weight: 'primary' },
      { name: 'Proxmox VE', weight: 'secondary' },
      { name: 'Linux', weight: 'primary' },
      { name: 'Nginx', weight: 'secondary' },
      { name: 'Git', weight: 'primary' },
      { name: 'CI/CD', weight: 'primary' },
      { name: 'Ansible', weight: 'tertiary' },
      { name: 'Terraform', weight: 'tertiary' },
      { name: 'Cloudflare', weight: 'secondary' },
    ],
  },
  {
    nameKey: 'Cloud AWS',
    icon: '☁️',
    accentColor: '#f97316',
    skills: [
      { name: 'EC2', weight: 'secondary' },
      { name: 'S3', weight: 'secondary' },
      { name: 'RDS', weight: 'secondary' },
      { name: 'Route 53', weight: 'secondary' },
      { name: 'CloudFront', weight: 'tertiary' },
      { name: 'ECS', weight: 'tertiary' },
    ],
  },
  {
    nameKey: 'Tools and others',
    icon: '🔧',
    accentColor: '#6366f1',
    skills: [
      { name: 'n8n', weight: 'secondary' },
      { name: 'Node-RED', weight: 'tertiary' },
      { name: 'Jira', weight: 'secondary' },
      { name: 'ClickUp', weight: 'secondary' },
      { name: 'Figma', weight: 'tertiary' },
      { name: 'Postman', weight: 'secondary' },
    ],
  },
  {
    nameKey: 'Additional',
    icon: '🛒',
    accentColor: '#64748b',
    skills: [
      { name: 'PrestaShop', weight: 'primary' },
      { name: 'WordPress', weight: 'secondary' },
      { name: 'WooCommerce', weight: 'secondary' },
    ],
  },
];

const weightStyle: Record<string, { opacity: number; scale: string }> = {
  primary: { opacity: 1, scale: 'text-sm' },
  secondary: { opacity: 0.75, scale: 'text-xs' },
  tertiary: { opacity: 0.5, scale: 'text-xs' },
};

export default function Skills() {
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
        {t('Skills')} <span>.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, catIdx) => (
          <motion.div
            key={catIdx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: catIdx * 0.06, duration: 0.45 }}
            className="glass-card p-5 group"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono font-bold shrink-0"
                style={{
                  background: `${category.accentColor}15`,
                  border: `1px solid ${category.accentColor}30`,
                  color: category.accentColor,
                }}
              >
                {category.icon}
              </div>
              <h3
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t(category.nameKey)}
              </h3>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => {
                const ws = weightStyle[skill.weight];
                return (
                  <span
                    key={skill.name}
                    className={`skill-pill ${skill.weight === 'primary' ? 'primary' : skill.weight === 'secondary' ? 'secondary' : ''} ${ws.scale}`}
                    style={{ opacity: ws.opacity }}
                  >
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex flex-wrap items-center gap-3 sm:gap-6 text-xs"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <span className="flex items-center gap-2">
          <span className="skill-pill primary text-xs">Primary</span>
          Core expertise
        </span>
        <span className="flex items-center gap-2">
          <span
            className="skill-pill secondary text-xs"
            style={{ opacity: 0.75 }}
          >
            Secondary
          </span>
          Proficient
        </span>
        <span className="flex items-center gap-2">
          <span className="skill-pill text-xs" style={{ opacity: 0.5 }}>
            Tertiary
          </span>
          Familiar
        </span>
      </motion.div>
    </motion.div>
  );
}
