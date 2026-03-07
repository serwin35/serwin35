import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import About from "./components/About"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Skills from "./components/Skills"
import Portfolio from "./components/Portfolio"
import Languages from "./components/Languages"
import Certifications from "./components/Certifications"
import Interests from "./components/Interests"
import Footer from "./components/Footer"
import LanguageSwitcher from "./components/LanguageSwitcher"
import LoadingScreen from "./components/LoadingScreen"
import NeuralBackground from "./components/NeuralBackground"
import CursorGlow from "./components/CursorGlow"
import { useLoading } from "./hooks/useLoading"

const SECTIONS = [
    "hero",
    "about",
    "experience",
    "education",
    "skills",
    "portfolio",
    "languages",
    "certifications",
    "interests",
]

function App() {
    const [activeSection, setActiveSection] = useState("hero")
    const isLoading = useLoading(2400)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        if (isLoading) return

        const handleIntersect: IntersectionObserverCallback = (entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
            if (visible.length > 0) {
                setActiveSection(visible[0].target.id)
            }
        }

        observerRef.current = new IntersectionObserver(handleIntersect, {
            threshold: [0.2, 0.5],
            rootMargin: "-10% 0px -40% 0px",
        })

        SECTIONS.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observerRef.current?.observe(el)
        })

        return () => observerRef.current?.disconnect()
    }, [isLoading])

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    return (
        <>
            <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

            {!isLoading && (
                <div className="relative min-h-screen">
                    <NeuralBackground />
                    <CursorGlow />

                    {/* Fixed sidebar */}
                    <Sidebar
                        activeSection={activeSection}
                        onNavigate={scrollToSection}
                    />

                    {/* Language switcher — fixed top right */}
                    <div className="fixed top-5 right-6 z-30">
                        <LanguageSwitcher />
                    </div>

                    {/* Main scrollable content */}
                    <main className="relative z-10 pl-16 md:pl-20">
                        {/* Hero */}
                        <section id="hero">
                            <Header onNavigate={scrollToSection} />
                        </section>

                        {/* Content sections */}
                        <div className="max-w-5xl mx-auto px-6 md:px-10">
                            <section id="about" className="section-wrapper">
                                <About />
                            </section>

                            <div className="gradient-divider my-2" />

                            <section id="experience" className="section-wrapper">
                                <Experience />
                            </section>

                            <div className="gradient-divider my-2" />

                            <section id="education" className="section-wrapper">
                                <Education />
                            </section>

                            <div className="gradient-divider my-2" />

                            <section id="skills" className="section-wrapper">
                                <Skills />
                            </section>

                            <div className="gradient-divider my-2" />

                            <section id="portfolio" className="section-wrapper">
                                <Portfolio />
                            </section>

                            <div className="gradient-divider my-2" />

                            <section id="languages" className="section-wrapper">
                                <Languages />
                            </section>

                            <div className="gradient-divider my-2" />

                            <section id="certifications" className="section-wrapper">
                                <Certifications />
                            </section>

                            <div className="gradient-divider my-2" />

                            <section id="interests" className="section-wrapper">
                                <Interests />
                            </section>
                        </div>

                        <Footer />
                    </main>
                </div>
            )}
        </>
    )
}

export default App
