"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { fadeIn } from "@/utils/animations"
import Image from "next/image"

export function BannerSection() {
  const { t } = useLanguage()

  return (
    <section className="relative w-full bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="Banner background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-accent-900/70 to-secondary-900/80" />

      <div className="container relative z-10 px-4 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between">
        <motion.div initial="hidden" animate="show" variants={fadeIn("right", 0.3)} className="text-white mb-4 md:mb-0">
          <h2 className="text-xl md:text-2xl font-bold gold-silver-gradient">{t("banner.title")}</h2>
          <p className="text-white/80 max-w-md">{t("banner.description")}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn("left", 0.5)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="bg-white hover:bg-white/90 dark:text-primary-900"
            style={{ color: "#713F12" }} // Màu primary-900 cố định
          >
            {t("banner.action")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
