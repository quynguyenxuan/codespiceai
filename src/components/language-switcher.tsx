"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Globe className="h-5 w-5 text-primary-500 hover:text-white" />
            <span className="sr-only">Chuyển đổi ngôn ngữ</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("vi")}
          className={`${language === "vi" ? "bg-primary-50 dark:bg-primary-900/30" : ""} cursor-pointer`}
        >
          🇻🇳 Tiếng Việt
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`${language === "en" ? "bg-primary-50 dark:bg-primary-900/30" : ""} cursor-pointer`}
        >
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
