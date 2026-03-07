import type React from "react"
import { useEffect, useRef } from "react"

const CursorGlow: React.FC = () => {
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Only render the effect on devices with a fine pointer (non-touch)
        if (!window.matchMedia("(pointer: fine)").matches) return

        const el = divRef.current
        if (!el) return

        // Show the element now that we know we have a fine pointer
        el.style.display = "block"

        const handleMouseMove = (e: MouseEvent) => {
            el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(59,130,246,0.04), transparent 70%)`
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    // Check synchronously on first render to avoid flash on touch devices.
    // We start hidden and reveal in the effect only when pointer: fine is confirmed.
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
        return null
    }

    return (
        <div
            ref={divRef}
            aria-hidden="true"
            style={{
                display: "none",
                position: "fixed",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
                transition: "background 0.05s ease",
            }}
        />
    )
}

export default CursorGlow
