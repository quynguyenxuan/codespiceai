'use client'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import { useLanguage } from '@/contexts/language-context'

export const ProjectHeroSection = () => {
  const { t } = useLanguage()

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="relative container px-4 md:px-6"
    >
      <motion.div variants={fadeIn('up', 0.3)} className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gold-silver-gradient mb-6">
          {t('projects.heroTitle')}
        </h1>
        <p className="text-xl text-white/80 mb-8">{t('projects.heroDescription')}</p>
      </motion.div>
    </motion.div>
  )
}
