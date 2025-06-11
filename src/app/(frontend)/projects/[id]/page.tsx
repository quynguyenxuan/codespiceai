'use client'

import { useLanguage } from '@/contexts/language-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/animations'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Code, ExternalLink, ArrowRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function ProjectDetailPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const projects = [
    {
      id: 'project1',
      title: t('projects.project1Title'),
      category: 'AI',
      description: t('projects.project1Desc'),
      fullDescription: t('projects.project1FullDesc'),
      image: '/placeholder.svg?height=600&width=1200',
      tech: t('projects.project1Tech'),
      client: t('projects.project1Client'),
      date: t('projects.project1Date'),
    },
    {
      id: 'project2',
      title: t('projects.project2Title'),
      category: 'Web',
      description: t('projects.project2Desc'),
      fullDescription: t('projects.project2FullDesc'),
      image: '/placeholder.svg?height=600&width=1200',
      tech: t('projects.project2Tech'),
      client: t('projects.project2Client'),
      date: t('projects.project2Date'),
    },
    {
      id: 'project3',
      title: t('projects.project3Title'),
      category: 'Mobile',
      description: t('projects.project3Desc'),
      fullDescription: t('projects.project3FullDesc'),
      image: '/placeholder.svg?height=600&width=1200',
      tech: t('projects.project3Tech'),
      client: t('projects.project3Client'),
      date: t('projects.project3Date'),
    },
    {
      id: 'project4',
      title: t('projects.project4Title'),
      category: 'Web',
      description: t('projects.project4Desc'),
      fullDescription: t('projects.project4FullDesc'),
      image: '/placeholder.svg?height=600&width=1200',
      tech: t('projects.project4Tech'),
      client: t('projects.project4Client'),
      date: t('projects.project4Date'),
    },
    {
      id: 'project5',
      title: t('projects.project5Title'),
      category: 'AI',
      description: t('projects.project5Desc'),
      fullDescription: t('projects.project5FullDesc'),
      image: '/placeholder.svg?height=600&width=1200',
      tech: t('projects.project5Tech'),
      client: t('projects.project5Client'),
      date: t('projects.project5Date'),
    },
    {
      id: 'project6',
      title: t('projects.project6Title'),
      category: 'AI',
      description: t('projects.project6Desc'),
      fullDescription: t('projects.project6FullDesc'),
      image: '/placeholder.svg?height=600&width=1200',
      tech: t('projects.project6Tech'),
      client: t('projects.project6Client'),
      date: t('projects.project6Date'),
    },
  ]

  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project not found</h1>
            <Button onClick={() => router.push('/projects')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Get related projects (same category, excluding current project)
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="container px-4 md:px-6 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/projects">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('projects.allProjects')}
                  </Button>
                </Link>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gold-silver-gradient mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-white/80 max-w-3xl">{project.description}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-10">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('right', 0.3)}
                className="md:col-span-2"
              >
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>{project.fullDescription}</p>
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=400&width=600&text=Gallery+${index + 1}`}
                          alt={`Project gallery ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('left', 0.3)}
                className="md:col-span-1"
              >
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-6">Project Details</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium">Client</h4>
                        <p className="text-gray-500 dark:text-gray-400">{project.client}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium">Date</h4>
                        <p className="text-gray-500 dark:text-gray-400">{project.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Code className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium">Technologies</h4>
                        <p className="text-gray-500 dark:text-gray-400">{project.tech}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Project
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-primary-500 text-primary-500 hover:bg-primary-50"
                    >
                      Contact Us About This Project
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold mb-10">{t('projects.relatedProjects')}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject, index) => (
                  <motion.div
                    key={relatedProject.id}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={fadeIn('up', 0.1 * index + 0.3)}
                    className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-[200px] overflow-hidden">
                      <Image
                        src={relatedProject.image || '/placeholder.svg'}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                        <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                          {relatedProject.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{relatedProject.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {relatedProject.description}
                      </p>
                      <Link href={`/projects/${relatedProject.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary-500 border-primary-500"
                        >
                          {t('projects.viewDetails')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
