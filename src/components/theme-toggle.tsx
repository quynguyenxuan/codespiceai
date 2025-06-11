"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Monitor } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Đảm bảo component chỉ render ở client side để tránh hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            {theme === "light" ? (
              <Sun className="h-5 w-5 text-primary-500" />
            ) : theme === "dark" ? (
              <Moon className="h-5 w-5 text-primary-500" />
            ) : (
              <Monitor className="h-5 w-5 text-primary-500" />
            )}
            <span className="sr-only">Chuyển đổi giao diện</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`${theme === "light" ? "bg-primary-50 dark:bg-primary-900/30" : ""} cursor-pointer`}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Sáng</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`${theme === "dark" ? "bg-primary-50 dark:bg-primary-900/30" : ""} cursor-pointer`}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Tối</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`${theme === "system" ? "bg-primary-50 dark:bg-primary-900/30" : ""} cursor-pointer`}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>Hệ thống</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
