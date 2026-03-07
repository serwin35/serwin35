import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

interface Project {
    title: string
    descriptionKey: string
    projectUrl: string
    tags: string[]
    status: "live" | "private" | "wip"
    gradient: string
}

const projects: Project[] = [
    {
        title: "SklepStrazacki.pl",
        descriptionKey: "portfolio.desc1",
        projectUrl: "https://sklepstrazacki.pl",
        tags: ["PrestaShop", "PHP", "CSS"],
        status: "live",
        gradient: "from-blue-500/10 to-cyan-500/5",
    },
    {
        title: "WF-Chart CRM/ERP",
        descriptionKey: "portfolio.desc2",
        projectUrl: "http://wolffire.pl",
        tags: ["Laravel", "Livewire", "Flux UI", "Tailwind CSS"],
        status: "live",
        gradient: "from-violet-500/10 to-purple-500/5",
    },
    {
        title: "Blue-NET",
        descriptionKey: "portfolio.desc3",
        projectUrl: "http://blue-net.pl",
        tags: ["Web Dev", "Hosting", "WordPress"],
        status: "live",
        gradient: "from-emerald-500/10 to-teal-500/5",
    },
    {
        title: "DevOps Handbook",
        descriptionKey: "portfolio.desc4",
        projectUrl: "https://github.com/serwin35/devops-handbook",
        tags: ["TypeScript", "Docker", "DevOps", "CI/CD"],
        status: "wip",
        gradient: "from-amber-500/10 to-orange-500/5",
    },
    {
        title: "Docker Laravel",
        descriptionKey: "portfolio.desc5",
        projectUrl: "https://github.com/serwin35/docker-laravel",
        tags: ["Docker", "Laravel", "Nginx", "PHP"],
        status: "live",
        gradient: "from-sky-500/10 to-blue-500/5",
    },
    {
        title: "Daybreak",
        descriptionKey: "portfolio.desc6",
        projectUrl: "https://github.com/serwin35/daybreak",
        tags: ["PHP", "Timesheets", "SaaS"],
        status: "private",
        gradient: "from-pink-500/10 to-rose-500/5",
    },
]

const statusConfig = {
    live: {
        bg: "rgba(16,185,129,0.1)",
        border: "rgba(16,185,129,0.25)",
        color: "#34d399",
        dot: "#10b981",
    },
    private: {
        bg: "rgba(100,116,139,0.1)",
        border: "rgba(100,116,139,0.2)",
        color: "#94a3b8",
        dot: "#64748b",
    },
    wip: {
        bg: "rgba(245,158,11,0.1)",
        border: "rgba(245,158,11,0.2)",
        color: "#fbbf24",
        dot: "#f59e0b",
    },
}

export default function Portfolio() {
    const { t } = useTranslation()

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-[var(--color-text-primary)]"
        >
            <h2 className="section-title">
                {t("Portfolio")} <span>.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => {
                    const sc = statusConfig[project.status]
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: index * 0.08, duration: 0.45 }}
                            className="gradient-border-card group flex flex-col overflow-hidden"
                        >
                            {/* Gradient header strip */}
                            <div
                                className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`}
                                style={{
                                    background: `linear-gradient(90deg, ${sc.dot}60, transparent)`,
                                }}
                            />

                            <div className="p-5 flex flex-col flex-1">
                                {/* Top row */}
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    {/* Folder icon */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{
                                            background: `${sc.dot}15`,
                                            border: `1px solid ${sc.dot}25`,
                                        }}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            style={{ color: sc.dot }}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                        </svg>
                                    </div>

                                    {/* Status badge */}
                                    <span
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
                                        style={{
                                            background: sc.bg,
                                            border: `1px solid ${sc.border}`,
                                            color: sc.color,
                                        }}
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: sc.dot }}
                                        />
                                        {t(`portfolio.status.${project.status}`)}
                                    </span>
                                </div>

                                {/* Title & description */}
                                <h3
                                    className="text-base font-bold mb-1.5 group-hover:text-[var(--color-accent-light)] transition-colors"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    {project.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed flex-1 mb-4"
                                    style={{ color: "var(--color-text-secondary)" }}
                                >
                                    {t(project.descriptionKey)}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="tech-tag">{tag}</span>
                                    ))}
                                </div>

                                {/* Link */}
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/link"
                                    style={{ color: "var(--color-accent)" }}
                                >
                                    {t("View project")}
                                    <svg
                                        className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-150"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
