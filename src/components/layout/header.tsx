// @ts-nocheck
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

export function Header() {
  const { t } = useLanguage()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Logo size="md" />
          <nav className="hidden md:flex gap-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Link
                href="/"
                className={`text-base font-medium transition-colors hover:text-primary-500 relative group ${
                  isActive("/") ? "text-primary-500" : ""
                }`}
              >
                {t("nav.home")}
<span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${isActive("/") ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link
                href="/services"
                className={`text-base font-medium transition-colors hover:text-primary-500 relative group ${
                  isActive("/services") ? "text-primary-500" : ""
                }`}
              >
                {t("nav.services")}
<span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${isActive("/services") ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Link
                href="/projects"
                className={`text-base font-medium transition-colors hover:text-primary-500 relative group ${
                  isActive("/projects") ? "text-primary-500" : ""
                }`}
              >
                {t("nav.portfolio")}
<span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${isActive("/projects") ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Link
                href="/about"
                className={`text-base font-medium transition-colors hover:text-primary-500 relative group ${
                  isActive("/about") ? "text-primary-500" : ""
                }`}
              >
                {t("nav.about")}
<span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${isActive("/about") ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Link
                href="/#testimonials"
                className="text-base font-medium transition-colors hover:text-primary-500 relative group"
              >
                {t("nav.testimonials")}
<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Link
                href="/contact"
                className={`text-base font-medium transition-colors hover:text-primary-500 relative group ${
                  isActive("/contact") ? "text-primary-500" : ""
                }`}
              >
                {t("nav.contact")}
<span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Link
              href="/blog"
              className={`text-base font-medium transition-colors hover:text-primary-500 relative group ${
                isActive("/blog") ? "text-primary-500" : ""
              }`}
            >
              {t("nav.blog")}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${
                  isActive("/blog") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </motion.div>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          
          <LanguageSwitcher />
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="hidden md:inline-flex border-primary-500 text-primary-500 hover:bg-primary-50"
            >
              {t("nav.login")}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 transition-opacity">
              {t("nav.contactNow")}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
