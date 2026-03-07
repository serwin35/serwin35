import { useState, useEffect } from "react"

export function useLoading(initialDelay = 2000) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, initialDelay)

        return () => clearTimeout(timer)
    }, [initialDelay])

    return isLoading
}

