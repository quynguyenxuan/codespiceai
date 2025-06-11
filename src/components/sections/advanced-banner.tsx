'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/animations'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getPayloadRef } from '@/utilities/getPayload'
import type { Banner } from '@/payload-types'

export function AdvancedBanner() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)

  const closeBanner = () => {
    setIsVisible(false)
    localStorage.setItem('bannerClosed', 'true')
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 overflow-hidden"
    >
      <div className="container relative z-10 px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn('right', 0.3)}
          className="text-white mb-4 md:mb-0 pr-8"
        >
          <div className="flex items-center">
            <div className="hidden md:block mr-4">
              <div className="bg-white/20 p-2 rounded-full">
                <Image
                  src="/images/offer-icon.png"
                  width={40}
                  height={40}
                  alt="Special Offer Icon"
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold gold-silver-gradient">
                {t('banner.title')}
              </h2>
              <p className="text-white/80 text-sm max-w-md">{t('banner.description')}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeIn('left', 0.5)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mr-4"
          >
            <Button
              size="sm"
              className="bg-white hover:bg-white/90 dark:text-primary-900"
              style={{ color: '#713F12' }}
            >
              {t('banner.action')}
            </Button>
          </motion.div>

          <button
            type="button"
            onClick={closeBanner}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
