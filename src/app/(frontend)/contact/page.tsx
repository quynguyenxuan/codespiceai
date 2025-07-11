import { Metadata } from 'next'
import ContactPageClient from './page.client'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { getMetadata } from '@/utilities/getMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata({ slug: 'contact' })
}

export default function ContactPage() {
  const contactInfo = [
    { icon: <Phone className="h-5 w-5 text-white" /> },
    { icon: <Mail className="h-5 w-5 text-white" /> },
    { icon: <MapPin className="h-5 w-5 text-white" /> },
    { icon: <Clock className="h-5 w-5 text-white" /> },
  ]

  const offices = [{ image: '/images/office-location.jpg' }]

  const faqs = [
    { question: 'contact.faq1', answer: 'contact.faq1Answer' },
    { question: 'contact.faq2', answer: 'contact.faq2Answer' },
    { question: 'contact.faq3', answer: 'contact.faq3Answer' },
    { question: 'contact.faq4', answer: 'contact.faq4Answer' },
  ]

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, name: 'Facebook', url: '#' },
    { icon: <Twitter className="h-5 w-5" />, name: 'Twitter', url: '#' },
    { icon: <Instagram className="h-5 w-5" />, name: 'Instagram', url: '#' },
    { icon: <Linkedin className="h-5 w-5" />, name: 'LinkedIn', url: '#' },
  ]

  return (
    <ContactPageClient
      contactInfo={contactInfo}
      offices={offices}
      faqs={faqs}
      socialLinks={socialLinks}
    />
  )
}
