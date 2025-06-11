"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Code } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Đảm bảo component chỉ render ở client side để tránh hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  // Kích thước logo dựa trên prop size
  const dimensions = {
    sm: { width: 32, height: 32, fontSize: "text-lg", iconSize: 16 },
    md: { width: 40, height: 40, fontSize: "text-xl", iconSize: 20 },
    lg: { width: 48, height: 48, fontSize: "text-2xl", iconSize: 24 },
  }

  const { width, height, fontSize, iconSize } = dimensions[size]

  return (
    <Link href="/" className="flex items-center space-x-2">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 360 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center"
        style={{ width, height }}
      >
        {/* Hình lục giác nền */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
        >
          <path
            d="M40 0L74.6 20V60L40 80L5.4 60V20L40 0Z"
            fill={isDark ? "#1f1f1f" : "#f9f9f9"}
            stroke="url(#gradient)"
            strokeWidth="2"
          />
          {/* Gradient định nghĩa */}
          <defs>
            <linearGradient id="gradient" x1="5.4" y1="0" x2="74.6" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#CBD5E1" />
              <stop offset="0.5" stopColor="#94A3B8" />
              <stop offset="1" stopColor="#64748B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Biểu tượng code từ Lucide */}
        <Code className="relative z-10" size={iconSize} strokeWidth={2.5} color={isDark ? "#CBD5E1" : "#64748B"} />
      </motion.div>

      {showText && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`font-bold ${fontSize} bg-clip-text text-transparent bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500`}
        >
          CodeSpiceAI
        </motion.span>
      )}
    </Link>
  )
}
