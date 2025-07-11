'use client'

import { useLanguage } from '@/contexts/language-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import Image from 'next/image'
import Link from 'next/link'
import {
  Code,
  Briefcase,
  CheckCircle,
  MessageSquare,
  Globe,
  Zap,
  ArrowRight,
  Lightbulb,
  FileCode,
  Rocket,
  Clipboard,
  Bug,
  HelpCircle,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'

type Service = {
  key: string
  icon: React.ReactNode
  image: string
  title: string
  description: string
  features: string[]
}

type ProcessStep = {
  icon: React.ReactNode
  title: string
  description: string
}

type Faq = {
  question: string
  answer: string
}

type ServicesPageClientProps = {
  services: { key: string; icon: React.ReactNode; image: string }[]
  processSteps: { icon: React.ReactNode }[]
  faqs: { question: string; answer: string }[]
}

export default function ServicesPageClient({
  services: initialServices,
  processSteps: initialProcessSteps,
  faqs: initialFaqs,
}: ServicesPageClientProps) {
  const { t } = useLanguage()

  const services: Service[] = initialServices.map((s) => ({
    key: s.key,
    icon: s.icon,
    image: s.image,
    title: t(`services.${s.key}Title`),
    description: t(`services.${s.key}FullDesc`),
    features: [
      t(`services.${s.key}Feature1`),
      t(`services.${s.key}Feature2`),
      t(`services.${s.key}Feature3`),
      t(`services.${s.key}Feature4`),
    ],
  }))

  const processSteps: ProcessStep[] = initialProcessSteps.map((s, i) => ({
    icon: s.icon,
    title: t(`services.processStep${i + 1}`),
    description: t(`services.processStep${i + 1}Desc`),
  }))

  const faqs: Faq[] = initialFaqs.map((f) => ({
    question: t(f.question),
    answer: t(f.answer),
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-24 lg:py-32 bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/banner-programming-ai.jpg"
              alt="Services background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-accent-900/50 to-secondary-900/50" />

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className="relative container px-4 md:px-6"
          >
            <motion.div variants={fadeIn('up', 0.3)} className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gold-silver-gradient mb-6">
                {t('services.heroTitle')}
              </h1>
              <p className="text-xl text-white/90 mb-8">{t('services.heroDescription')}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-primary-900 hover:bg-white/90">
                    {t('services.ctaButton')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mb-4">
                {t('services.title')}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                {t('services.description')}
              </p>
            </div>

            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={staggerContainer()}
                  className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <motion.div
                    variants={fadeIn(index % 2 === 0 ? 'right' : 'left', 0.3)}
                    className="space-y-6"
                  >
                    <div className="inline-flex rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-3">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          variants={fadeIn('up', 0.1 * featureIndex + 0.5)}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-5 w-5 text-primary-500" />
                          <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div
                    variants={fadeIn(index % 2 === 0 ? 'left' : 'right', 0.3)}
                    className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl"
                  >
                    <Image
                      src={service.image || '/placeholder.svg'}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mb-4">
                {t('services.process')}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                {t('services.processDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn('up', 0.1 * index + 0.3)}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 mr-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mb-4">
                {t('contact.faqTitle')}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                {t('contact.faqDescription')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={fadeIn('up', 0.1 * index + 0.3)}
                  >
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 dark:text-gray-200">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/placeholder.svg?height=400&width=1920"
              alt="CTA background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-accent-900/50 to-secondary-900/50" />

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative container px-4 md:px-6 text-center"
          >
            <motion.div variants={fadeIn('up', 0.3)} className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold gold-silver-gradient mb-6">
                {t('services.cta')}
              </h2>
              <p className="text-xl text-white/90 mb-8">{t('services.ctaDescription')}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 dark:text-primary-900"
                    style={{ color: '#713F12' }} // Màu primary-900 cố định
                  >
                    {t('services.ctaButton')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
