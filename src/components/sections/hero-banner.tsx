'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import Image from 'next/image'
import { Banner } from '@/payload-types'

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const { t } = useLanguage()

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner-programming-ai.jpg"
          alt="Hero Banner - CodeSpiceAI Development Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 via-accent-900/60 to-secondary-900/60" />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className="relative h-full container px-4 md:px-6 flex flex-col justify-center"
      >
        <motion.div variants={fadeIn('up', 0.3)} className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white/80 text-sm ml-2 text-secondary-50">
              {t('heroBanner.rating')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gold-silver-gradient mb-4">
            {t('heroBanner.title')}
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-xl">{t('heroBanner.description')}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-white hover:bg-white/90 text-primary-500">
                {t('heroBanner.primaryAction')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 transition-opacity"
              >
                {t('heroBanner.secondaryAction')}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 right-8 hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {[
                  '/media/client-avatar-1.jpg',
                  '/media/client-avatar-2.jpg',
                  '/media/client-avatar-3.jpg',
                ].map((src, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-primary-500 border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={src}
                      width={40}
                      height={40}
                      alt={`Client ${i + 1} Avatar`}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-white">
                <p className="text-sm text-secondary-200 font-medium">{t('heroBanner.clients')}</p>
                <p className="text-xs text-white/70">{t('heroBanner.clientsDescription')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
