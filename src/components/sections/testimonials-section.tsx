'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'

export function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      text: t('testimonials.client1Text'),
      name: t('testimonials.client1'),
      position: t('testimonials.client1Position'),
    },
    {
      text: t('testimonials.client2Text'),
      name: t('testimonials.client2'),
      position: t('testimonials.client2Position'),
    },
    {
      text: t('testimonials.client3Text'),
      name: t('testimonials.client3'),
      position: t('testimonials.client3Position'),
    },
  ]

  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-auto top-auto h-[300px] w-[300px] translate-x-[10%] translate-y-[30%] rounded-full bg-primary-50 opacity-30 blur-[80px]"></div>
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
              {t('testimonials.title')}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gold-silver-gradient">
              {t('testimonials.subtitle')}
            </h2>
            <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-200">
              {t('testimonials.description')}
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              text={testimonial.text}
              name={testimonial.name}
              position={testimonial.position}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

interface TestimonialCardProps {
  text: string
  name: string
  position: string
  index: number
}

function TestimonialCard({ text, name, position, index }: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeIn('up', index * 0.1 + 0.3)}
      whileHover={{ y: -10 }}
      className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm bg-white dark:bg-gray-800"
    >
      <div className="space-y-2">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + i * 0.1 }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 fill-primary-500 text-primary-500"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </motion.svg>
          ))}
        </div>
        <p className="text-gray-700 dark:text-gray-200 italic">"{text}"</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-[2px]">
          <Image
            src="/placeholder.svg?height=100&width=100"
            width={40}
            height={40}
            alt="Avatar"
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{position}</p>
        </div>
      </div>
    </motion.div>
  )
}
