import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

interface InterestItem {
    key: string
    icon: string
    accentColor: string
}

const interests: InterestItem[] = [
    { key: "interests.item1", icon: "🚒", accentColor: "#ef4444" },
    { key: "interests.item2", icon: "🔧", accentColor: "#3b82f6" },
    { key: "interests.item3", icon: "☁️", accentColor: "#8b5cf6" },
    { key: "interests.item4", icon: "🏔️", accentColor: "#10b981" },
    { key: "interests.item5", icon: "📚", accentColor: "#f59e0b" },
]

export default function Interests() {
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
                {t("Interests")} <span>.</span>
            </h2>

            <div className="flex flex-wrap gap-3">
                {interests.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                        whileHover={{ scale: 1.04, y: -2 }}
                        className="glass-card px-5 py-4 flex items-center gap-3 cursor-default"
                        style={{
                            background: `linear-gradient(135deg, ${item.accentColor}08 0%, rgba(10,15,30,0.6) 100%)`,
                        }}
                    >
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                            style={{
                                background: `${item.accentColor}15`,
                                border: `1px solid ${item.accentColor}30`,
                            }}
                        >
                            {item.icon}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                            {t(item.key)}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
