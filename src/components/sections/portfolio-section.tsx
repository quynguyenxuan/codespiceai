'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer, zoomIn } from '@/utils/animations'
import Link from 'next/link'
import { Project } from '@/payload-types'

export function PortfolioSection({ projects }: { projects: Project[] }) {
  const { t } = useLanguage()

  // const projects = [
  //   {
  //     id: 'project1',
  //     imageSrc: '/images/project-ai-chatbot.png',
  //     title: t('portfolio.project1'),
  //     description: t('portfolio.project1Desc'),
  //   },
  //   {
  //     id: 'project2',
  //     imageSrc: '/images/project-ecommerce.jpg',
  //     title: t('portfolio.project2'),
  //     description: t('portfolio.project2Desc'),
  //   },
  //   {
  //     id: 'project3',
  //     imageSrc: '/images/project-mobile-app.png',
  //     title: t('portfolio.project3'),
  //     description: t('portfolio.project3Desc'),
  //   },
  // ]

  return (
    <section
      id="portfolio"
      className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] -translate-x-[30%] translate-y-[20%] rounded-full bg-secondary-50 opacity-50 blur-[80px]"></div>
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
              {t('portfolio.title')}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight gold-silver-gradient">
              {t('portfolio.subtitle')}
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {t('portfolio.description')}
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              id={project.id}
              imageSrc={project.imageSrc}
              title={project.title}
              description={project.description}
              index={index}
            />
          ))}
        </div>
        <motion.div variants={fadeIn('up', 0.7)} className="flex justify-center mt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/projects">
              <Button
                variant="outline"
                className="border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                {t('portfolio.viewAll')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

interface ProjectCardProps {
  id: string
  imageSrc: string
  title: string
  description: string
  index: number
}

function ProjectCard({ id, imageSrc, title, description, index }: ProjectCardProps) {
  return (
    <motion.div
      variants={zoomIn(index * 0.1 + 0.3, 0.6)}
      className="group relative overflow-hidden rounded-lg border shadow-sm hover:shadow-lg transition-all"
    >
      <div className="overflow-hidden">
        <Image
          src={imageSrc || '/placeholder.svg'}
          width={600}
          height={400}
          alt={title}
          className="object-cover w-full h-60 transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 bg-white dark:bg-gray-900">
        <h3 className="text-xl font-bold text-primary-700 dark:text-primary-300">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
        <Link href={`/projects/${id}`}>
          <Button className="bg-white text-primary-500 hover:bg-primary-50 mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            View Project
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
