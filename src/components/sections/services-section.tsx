'use client'

import type React from 'react'

import { Code, Briefcase, CheckCircle, MessageSquare, Globe, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ServicesSection() {
  const { t } = useLanguage()

  const services = [
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: t('services.web'),
      description: t('services.webDesc'),
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: t('services.ai'),
      description: t('services.aiDesc'),
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: t('services.mobile'),
      description: t('services.mobileDesc'),
    },
    {
      icon: <Code className="h-6 w-6 text-white" />,
      title: t('services.backend'),
      description: t('services.backendDesc'),
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: t('services.qa'),
      description: t('services.qaDesc'),
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: t('services.consulting'),
      description: t('services.consultingDesc'),
    },
  ]

  return (
    <section
      id="services"
      className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] -translate-x-[30%] translate-y-[20%] rounded-full bg-primary-50 opacity-50 blur-[80px]"></div>
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
            <div className="inline-block rounded-lg bg-gradient-to-r from-primary-500 to-secondary-100 px-3 py-1 text-sm dark:from-primary-900 dark:to-secondary-900">
              {t('services.title')}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gold-silver-gradient">
              {t('services.subtitle')}
            </h2>
            <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
              {t('services.description')}
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/services">
            <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 transition-opacity">
              {t('services.viewAllServices')}
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeIn('up', index * 0.1 + 0.3)}
      className="group flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-3"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-center text-gray-700 dark:text-gray-200">{description}</p>
    </motion.div>
  )
}
