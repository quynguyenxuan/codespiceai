"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer, textVariant, floatAnimation } from "@/utils/animations"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary-50 opacity-50 blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] translate-x-[10%] translate-y-[30%] rounded-full bg-secondary-50 opacity-30 blur-[80px]"></div>
      </div>
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container px-4 md:px-6"
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <motion.div variants={fadeIn("right", 0.2)} className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                variants={textVariant(0.3)}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gold-silver-gradient"
              >
                {t("hero.title")}
              </motion.h1>
              <motion.p
                variants={textVariant(0.5)}
                className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                {t("hero.description")}
              </motion.p>
            </div>
            <motion.div variants={fadeIn("up", 0.7)} className="flex flex-col gap-2 min-[400px]:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 transition-opacity">
                  {t("hero.startNow")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-primary-500 text-primary-500 hover:bg-primary-50">
                  {t("hero.learnMore")}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeIn("left", 0.3)} className="flex items-center justify-center">
            <motion.div variants={floatAnimation} initial="initial" animate="animate">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Hero Image"
                className="rounded-lg object-cover shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
