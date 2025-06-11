'use client'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import { useLanguage } from '@/contexts/language-context'
import type { Category, Media, Project } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink } from 'lucide-react'

export const ProjectList = ({ projects }: { projects: Project[] }) => {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeIn('up', 0.1 * index + 0.3)}
              className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-[200px] overflow-hidden">
                <Image
                  src={(project.image as Media)?.url || '/placeholder.svg'}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                    {(project.categories as Category[])?.map((c) => c.title).join(', ')}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{project.description}</p>
                {/* <div className="flex justify-between items-center">
                  <Link href={`/projects/${project.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary-500 border-primary-500"
                    >
                      {t('projects.viewDetails')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t('projects.viewLive')}
                  </Button>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                  No projects found matching your criteria.
                </h3>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilter('all')
                    setSearchQuery('')
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )} */}
      </div>
    </section>
  )
}
