import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import { getPayloadRef } from '@/utilities/getPayload'
import { ProjectHeroSection } from '@/components/Project/ProjectHeroTitle'
import { ProjectList } from '@/components/Project/ProjectList'
import ProjectFilters from '@/components/Project/ProjectFilters'

export default async function ProjectsPage() {
  const payload = await getPayloadRef()
  const projectRes = await payload.find({
    collection: 'projects',
    limit: 1000,
  })
  const projects = projectRes.docs
  // const projects = [
  //   {
  //     id: 'project1',
  //     title: t('projects.project1Title'),
  //     category: 'AI',
  //     description: t('projects.project1Desc'),
  //     fullDescription: t('projects.project1FullDesc'),
  //     image: '/images/project-ai-1.jpg',
  //     tech: t('projects.project1Tech'),
  //     client: t('projects.project1Client'),
  //     date: t('projects.project1Date'),
  //   },

  // ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-24 lg:py-32 bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/banner-programming-ai.jpg"
              alt="Projects background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-accent-900/50 to-secondary-900/50" />
          <ProjectHeroSection />
        </section>
        {/* <ProjectFilters /> */}

        {/* Projects Grid */}
        <ProjectList projects={projects} />
      </main>
      <Footer />
    </div>
  )
}
