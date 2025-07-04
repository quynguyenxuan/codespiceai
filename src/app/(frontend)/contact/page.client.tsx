'use client'

import type React from 'react'
import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type ContactInfo = {
  icon: React.ReactNode
  title: string
  text: string
}

type Office = {
  title: string
  address: string
  phone: string
  email: string
  image: string
}

type Faq = {
  question: string
  answer: string
}

type SocialLink = {
  icon: React.ReactNode
  name: string
  url: string
}

type ContactPageClientProps = {
  contactInfo: { icon: React.ReactNode }[]
  offices: { image: string }[]
  faqs: { question: string; answer: string }[]
  socialLinks: { icon: React.ReactNode; name: string; url: string }[]
}

export default function ContactPageClient({
  contactInfo: initialContactInfo,
  offices: initialOffices,
  faqs: initialFaqs,
  socialLinks,
}: ContactPageClientProps) {
  const { t } = useLanguage()
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormStatus('success')
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    }, 1500)
  }

  const contactInfo: ContactInfo[] = initialContactInfo.map((info, i) => {
    const keys = ['phone', 'email', 'address', 'workingHours']
    return {
      ...info,
      title: t(`contact.${keys[i]}`),
      text:
        i === 0
          ? '+84 363 854 891'
          : i === 1
            ? 'xuanquy.cn1@gmail.com'
            : t(`contact.${keys[i]}Text`),
    }
  })

  const offices: Office[] = initialOffices.map((office, i) => ({
    ...office,
    title: t(`contact.office${i + 1}Title`),
    address: t(`contact.office${i + 1}Address`),
    phone: t(`contact.office${i + 1}Phone`),
    email: t(`contact.office${i + 1}Email`),
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
              alt="Contact background"
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
                {t('contact.heroTitle')}
              </h1>
              <p className="text-xl text-white/80 mb-8">{t('contact.heroDescription')}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('right', 0.3)}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6">{t('contact.formTitle')}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  {t('contact.formDescription')}
                </p>

                {formStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-green-700">{t('contact.success')}</p>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-red-700">{t('contact.error')}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {t('contact.name')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t('contact.namePlaceholder')}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t('contact.email')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        {t('contact.company')}
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder={t('contact.companyPlaceholder')}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        {t('contact.phone')}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder={t('contact.phonePlaceholder')}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {t('contact.subject')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder={t('contact.subjectPlaceholder')}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium">
                      {t('contact.budget')}
                    </label>
                    <Select disabled={isSubmitting}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('contact.budgetPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">{t('contact.budget1')}</SelectItem>
                        <SelectItem value="5k-10k">{t('contact.budget2')}</SelectItem>
                        <SelectItem value="10k-20k">{t('contact.budget3')}</SelectItem>
                        <SelectItem value="20k-50k">{t('contact.budget4')}</SelectItem>
                        <SelectItem value="over-50k">{t('contact.budget5')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t('contact.message')} <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t('contact.messagePlaceholder')}
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" name="terms" required disabled={isSubmitting} />
                    <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-400">
                      I agree to the processing of personal data in accordance with the privacy
                      policy
                    </label>
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 transition-opacity"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : t('contact.send')}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('left', 0.3)}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('contact.infoTitle')}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    {t('contact.infoDescription')}
                  </p>

                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-2">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{info.title}</h3>
                          <p className="text-gray-500 dark:text-gray-400">{info.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('contact.followTitle')}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {t('contact.followDescription')}
                  </p>

                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="rounded-full bg-gray-100 dark:bg-gray-700 p-3 text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-colors"
                        aria-label={link.name}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/office-map.jpg"
                    alt="Office Location Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{t('contact.office1Title')}</h3>
                      <p>{t('contact.office1Address')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Offices Section */}
        {/* <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mb-4">
                {t('contact.officeTitle')}
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                {t('contact.officeDescription')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn('up', 0.1 * index + 0.3)}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-[200px]">
                    <Image
                      src={office.image || '/placeholder.svg'}
                      alt={office.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">{office.title}</h3>
                    <div className="space-y-2 text-gray-500 dark:text-gray-400">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                        <p>{office.address}</p>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                        <p>{office.phone}</p>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                        <p>{office.email}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mb-4">
                {t('contact.faqTitle')}
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
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
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-500 dark:text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
