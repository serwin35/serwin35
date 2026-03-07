import {
    UserIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    WrenchScrewdriverIcon,
    FolderIcon,
    LanguageIcon,
    ShieldCheckIcon,
    SparklesIcon,
    HomeIcon,
} from "@heroicons/react/24/outline"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"

interface SidebarProps {
    activeSection: string
    onNavigate: (id: string) => void
}

const menuItems = [
    { id: "hero",           icon: HomeIcon,               labelKey: "nav.home" },
    { id: "about",          icon: UserIcon,               labelKey: "nav.about" },
    { id: "experience",     icon: BriefcaseIcon,          labelKey: "nav.experience" },
    { id: "education",      icon: AcademicCapIcon,        labelKey: "nav.education" },
    { id: "skills",         icon: WrenchScrewdriverIcon,  labelKey: "nav.skills" },
    { id: "portfolio",      icon: FolderIcon,             labelKey: "nav.portfolio" },
    { id: "languages",      icon: LanguageIcon,           labelKey: "nav.languages" },
    { id: "certifications", icon: ShieldCheckIcon,        labelKey: "nav.certifications" },
    { id: "interests",      icon: SparklesIcon,           labelKey: "nav.interests" },
]

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
    const { t } = useTranslation()

    return (
        <nav
            aria-label="Main navigation"
            className="fixed left-0 top-0 h-full w-16 md:w-20 flex flex-col items-center justify-center py-8 gap-2 z-20"
            style={{
                background: "linear-gradient(to right, rgba(5,8,16,0.98) 60%, rgba(5,8,16,0.4))",
                borderRight: "1px solid rgba(255,255,255,0.04)",
            }}
        >
            {/* Logo mark */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="absolute top-5 cursor-pointer select-none"
                onClick={() => onNavigate("hero")}
            >
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-lg"
                    style={{
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        boxShadow: "0 0 20px rgba(59,130,246,0.35)",
                    }}
                >
                    MS
                </div>
            </motion.div>

            {/* Nav items */}
            <div className="flex flex-col items-center gap-0.5 mt-8">
                {menuItems.map((item, index) => {
                    const isActive = activeSection === item.id
                    return (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            title={t(item.labelKey)}
                            aria-label={t(item.labelKey)}
                            aria-current={isActive ? "page" : undefined}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => onNavigate(item.id)}
                            className="relative p-2.5 rounded-xl transition-all duration-200 group"
                            style={
                                isActive
                                    ? {
                                          background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))",
                                          border: "1px solid rgba(59,130,246,0.35)",
                                      }
                                    : {
                                          background: "transparent",
                                          border: "1px solid transparent",
                                      }
                            }
                        >
                            {/* Active glow */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-glow"
                                        className="absolute inset-0 rounded-xl"
                                        style={{
                                            boxShadow: "0 0 16px rgba(59,130,246,0.3)",
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </AnimatePresence>

                            <item.icon
                                className="w-5 h-5 relative z-10 transition-colors duration-200"
                                style={{
                                    color: isActive ? "#60a5fa" : "rgba(148,163,184,0.5)",
                                }}
                                aria-hidden="true"
                            />

                            {/* Active indicator dot */}
                            {isActive && (
                                <span
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                                    style={{ background: "#60a5fa" }}
                                />
                            )}

                            {/* Tooltip */}
                            <span
                                className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl"
                                style={{
                                    background: "rgba(13,18,32,0.95)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "#f1f5f9",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                {t(item.labelKey)}
                            </span>
                        </motion.button>
                    )
                })}
            </div>
        </nav>
    )
}
