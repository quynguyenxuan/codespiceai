'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, slideIn } from '@/utils/animations'
import Link from 'next/link'

export function AboutSection() {
  const { t } = useLanguage()

  const features = [t('about.experience'), t('about.team'), t('about.quality'), t('about.support')]

  return (
    <section
      id="about"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[300px] w-[300px] translate-x-[10%] translate-y-[30%] rounded-full bg-accent-50 opacity-30 blur-[80px]"></div>
      </div>
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container px-4 md:px-6"
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.div
            variants={fadeIn('right', 0.2)}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gradient-to-r from-secondary-500 to-secondary-100 px-3 py-1 text-sm dark:from-primary-900 dark:to-secondary-900">
                {t('about.title')}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gold-silver-gradient">
                {t('about.subtitle')}
              </h2>
              <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
                {t('about.description')}
              </p>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', index * 0.1 + 0.3)}
                  className="flex items-center gap-2"
                >
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="text-primary-500">
                    <CheckCircle className="h-5 w-5" />
                  </motion.div>
                  <p className="text-gray-700 dark:text-gray-200">{feature}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={fadeIn('up', 0.7)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/about">
                <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 transition-opacity">
                  {t('about.learnMore')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            variants={slideIn('left', 'tween', 0.2, 1)}
            className="flex items-center justify-center"
          >
            <Image
              src="/images/development-team.jpg"
              width={550}
              height={550}
              alt="CodeSpiceAI Development Team"
              className="rounded-lg object-cover shadow-lg"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
