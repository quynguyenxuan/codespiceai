'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/animations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/logo'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/projects', label: t('nav.portfolio') },
    { href: '/about', label: t('nav.about') },
    { href: '/reviews', label: t('nav.testimonials') },
    { href: '/contact', label: t('nav.contact') },
  ]

  const services = [
    { href: '/services#web', label: t('services.web') },
    { href: '/services#ai', label: t('services.ai') },
    { href: '/services#mobile', label: t('services.mobile') },
    { href: '/services#backend', label: t('services.backend') },
    { href: '/services#qa', label: t('services.qa') },
  ]

  const socialLinks = [
    {
      href: '#',
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
          className="h-5 w-5"
        >
          <title>Facebook</title>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      label: 'Facebook',
    },
    {
      href: '#',
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
          className="h-5 w-5"
        >
          <title>Instagram</title>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      label: 'Instagram',
    },
    {
      href: '#',
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
          className="h-5 w-5"
        >
          <title>Twitter</title>
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      label: 'Twitter',
    },
    {
      href: '#',
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
          className="h-5 w-5"
        >
          <title>LinkedIn</title>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: 'LinkedIn',
    },
    {
      href: '#',
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
          className="h-5 w-5"
        >
          <title>YouTube</title>
          <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z" />
          <polygon points="10 15 15 12 10 9" />
        </svg>
      ),
      label: 'YouTube',
    },
  ]

  const resources = [
    { href: '/blog', label: t('footer.blog') },
    { href: '/resources', label: t('footer.resources') },
    { href: '/faq', label: t('footer.faq') },
    { href: '/support', label: t('footer.support') },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      {/* Top Footer - Newsletter & Contact */}
      <div className="bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn('right', 0.3)}
              className="text-white"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">{t('footer.subscribeTitle')}</h3>
              <p className="text-white/80 mb-6 max-w-md">{t('footer.subscribeText')}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
                />
                <Button className="bg-white text-primary-700 hover:bg-white/90">
                  {t('footer.subscribe')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn('left', 0.3)}
              className="text-white"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">{t('footer.contactTitle')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-300 mt-1 mr-3" />
                  <div>
                    <p className="text-white/80">+84 363 854 891</p>
                    <p className="text-white/80">+84 932 247 175</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-300 mt-1 mr-3" />
                  <div>
                    <p className="text-white/80">xuanquy.cn1@gmail.com</p>
                    <p className="text-white/80">giangsonftu@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-300 mt-1 mr-3" />
                  <p className="text-white/80">{t('contact.addressText')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Company Info */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn('up', 0.1)}
              className="space-y-4"
            >
              <Logo size="lg" />
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                {t('footer.companyDescription')}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={`${link.label}-${index}`}
                    href={link.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn('up', 0.2)}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={`${link.label}-${index}`}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">
                {t('footer.services')}
              </h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={`${service.label}-${index}`}>
                    <Link
                      href={service.href}
                      className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn('up', 0.3)}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('footer.resourcesTitle')}
              </h4>
              <ul className="space-y-2">
                {resources.map((resource, index) => (
                  <li key={`${resource.label}-${index}`}>
                    <Link
                      href={resource.href}
                      className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {resource.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('footer.needHelp')}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('footer.needHelpText')}</p>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90">
                    {t('footer.contactUs')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Copyright */}
      <div className="py-6 border-t bg-white dark:bg-gray-950 dark:border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {currentYear} CodeSpiceAI. {t('footer.rights')}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
              >
                {t('footer.privacy')}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
              >
                {t('footer.terms')}
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
              >
                {t('footer.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
