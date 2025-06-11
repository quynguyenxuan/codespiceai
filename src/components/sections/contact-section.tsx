'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, slideIn } from '@/utils/animations'

export function ContactSection() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: t('contact.phone'),
      text: '+84 363 854 891',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      title: t('contact.email'),
      text: 'xuanquy.cn1@gmail.com',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: t('contact.address'),
      text: t('contact.addressText'),
    },
  ]

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] -translate-x-[30%] translate-y-[20%] rounded-full bg-accent-50 opacity-50 blur-[80px]"></div>
      </div>
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container px-4 md:px-6"
      >
        <motion.div
          variants={fadeIn('up', 0.2)}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-secondary-500 to-secondary-100 px-3 py-1 text-sm dark:from-primary-900 dark:to-secondary-900">
              {t('contact.title')}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gold-silver-gradient">
              {t('contact.subtitle')}
            </h2>
            <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
              {t('contact.description')}
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2 mt-8">
          <motion.div variants={fadeIn('right', 0.3)} className="space-y-4">
            {contactInfo.map((info, index) => (
              <ContactInfo
                key={index}
                icon={info.icon}
                title={info.title}
                text={info.text}
                index={index}
              />
            ))}
          </motion.div>
          <motion.div
            variants={slideIn('left', 'tween', 0.3, 0.8)}
            className="rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-800"
          >
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
                  >
                    {t('contact.name')}
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
                  >
                    {t('contact.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
                >
                  {t('contact.subject')}
                </label>
                <input
                  id="subject"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t('contact.subjectPlaceholder')}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-900 dark:text-white"
                >
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 transition-opacity">
                  {t('contact.send')}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

interface ContactInfoProps {
  icon: React.ReactNode
  title: string
  text: string
  index: number
}

function ContactInfo({ icon, title, text, index }: ContactInfoProps) {
  return (
    <motion.div variants={fadeIn('up', index * 0.1 + 0.3)} className="flex items-center space-x-3">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-2"
      >
        {icon}
      </motion.div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-700 dark:text-gray-200">{text}</p>
      </div>
    </motion.div>
  )
}
