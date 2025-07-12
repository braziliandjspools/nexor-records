"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Loader() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => {
      setTimeout(() => setLoading(false), 500)
    }

    window.addEventListener("beforeunload", handleStart)
    window.addEventListener("load", handleComplete)

    return () => {
      window.removeEventListener("beforeunload", handleStart)
      window.removeEventListener("load", handleComplete)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }, [pathname])

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 z-[9999] transition-transform duration-300 ease-in-out ${
        loading ? "transform-none" : "transform-gpu -translate-y-full"
      }`}
    >
      <div className="h-full w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-loader shadow-md"></div>
    </div>
  )
}
