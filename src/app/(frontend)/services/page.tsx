import { Metadata } from 'next'
import ServicesPageClient from './page.client'
import {
  Code,
  Briefcase,
  CheckCircle,
  MessageSquare,
  Globe,
  Zap,
  Lightbulb,
  FileCode,
  Rocket,
  Clipboard,
  Bug,
  HelpCircle,
} from 'lucide-react'
import { getMetadata } from '@/utilities/getMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata({ slug: 'services' })
}

export default function ServicesPage() {
  // Data is now defined in the Server Component
  const services = [
    {
      key: 'web',
      icon: <Globe className="h-6 w-6 text-white" />,
      image: '/images/service-web-development.jpg',
    },
    {
      key: 'ai',
      icon: <Zap className="h-6 w-6 text-white" />,
      image: '/images/service-ai-development.jpg',
    },
    {
      key: 'mobile',
      icon: <Briefcase className="h-6 w-6 text-white" />,
      image: '/images/service-mobile-development.jpg',
    },
    {
      key: 'backend',
      icon: <Code className="h-6 w-6 text-white" />,
      image: '/images/service-backend-development.jpg',
    },
    {
      key: 'qa',
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      image: '/images/service-qa-testing.jpg',
    },
    {
      key: 'consulting',
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      image: '/images/service-consulting.jpg',
    },
  ]

  const processSteps = [
    { icon: <Clipboard className="h-6 w-6 text-white" /> },
    { icon: <Lightbulb className="h-6 w-6 text-white" /> },
    { icon: <FileCode className="h-6 w-6 text-white" /> },
    { icon: <Bug className="h-6 w-6 text-white" /> },
    { icon: <Rocket className="h-6 w-6 text-white" /> },
    { icon: <HelpCircle className="h-6 w-6 text-white" /> },
  ]

  // FAQs can be fetched or defined here if they become dynamic
  const faqs = [
    { question: 'contact.faq1', answer: 'contact.faq1Answer' },
    { question: 'contact.faq2', answer: 'contact.faq2Answer' },
    { question: 'contact.faq3', answer: 'contact.faq3Answer' },
    { question: 'contact.faq4', answer: 'contact.faq4Answer' },
  ]

  // We pass the data down to the client component
  return <ServicesPageClient services={services} processSteps={processSteps} faqs={faqs} />
}
