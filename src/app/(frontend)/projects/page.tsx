"use client"

import { useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/utils/animations"
import Image from "next/image"
import Link from "next/link"
import { Search, ExternalLink, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const projects = [
    {
      id: "project1",
      title: t("projects.project1Title"),
      category: "AI",
      description: t("projects.project1Desc"),
      fullDescription: t("projects.project1FullDesc"),
      image: "/placeholder.svg?height=400&width=600",
      tech: t("projects.project1Tech"),
      client: t("projects.project1Client"),
      date: t("projects.project1Date"),
    },
    {
      id: "project2",
      title: t("projects.project2Title"),
      category: "Web",
      description: t("projects.project2Desc"),
      fullDescription: t("projects.project2FullDesc"),
      image: "/placeholder.svg?height=400&width=600",
      tech: t("projects.project2Tech"),
      client: t("projects.project2Client"),
      date: t("projects.project2Date"),
    },
    {
      id: "project3",
      title: t("projects.project3Title"),
      category: "Mobile",
      description: t("projects.project3Desc"),
      fullDescription: t("projects.project3FullDesc"),
      image: "/placeholder.svg?height=400&width=600",
      tech: t("projects.project3Tech"),
      client: t("projects.project3Client"),
      date: t("projects.project3Date"),
    },
    {
      id: "project4",
      title: t("projects.project4Title"),
      category: "Web",
      description: t("projects.project4Desc"),
      fullDescription: t("projects.project4FullDesc"),
      image: "/placeholder.svg?height=400&width=600",
      tech: t("projects.project4Tech"),
      client: t("projects.project4Client"),
      date: t("projects.project4Date"),
    },
    {
      id: "project5",
      title: t("projects.project5Title"),
      category: "AI",
      description: t("projects.project5Desc"),
      fullDescription: t("projects.project5FullDesc"),
      image: "/placeholder.svg?height=400&width=600",
      tech: t("projects.project5Tech"),
      client: t("projects.project5Client"),
      date: t("projects.project5Date"),
    },
    {
      id: "project6",
      title: t("projects.project6Title"),
      category: "AI",
      description: t("projects.project6Desc"),
      fullDescription: t("projects.project6FullDesc"),
      image: "/placeholder.svg?height=400&width=600",
      tech: t("projects.project6Tech"),
      client: t("projects.project6Client"),
      date: t("projects.project6Date"),
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === "all" || project.category === filter
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-24 lg:py-32 bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/placeholder.svg?height=600&width=1920"
              alt="Projects background"
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
            <motion.div variants={fadeIn("up", 0.3)} className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gold-silver-gradient mb-6">
                {t("projects.heroTitle")}
              </h1>
              <p className="text-xl text-white/80 mb-8">{t("projects.heroDescription")}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Filter and Search Section */}
        <section className="py-8 bg-white dark:bg-gray-950 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">{t("projects.filter")}</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "bg-primary-500 hover:bg-primary-600" : ""}
                  >
                    {t("projects.filterAll")}
                  </Button>
                  <Button
                    variant={filter === "Web" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("Web")}
                    className={filter === "Web" ? "bg-primary-500 hover:bg-primary-600" : ""}
                  >
                    {t("projects.filterWeb")}
                  </Button>
                  <Button
                    variant={filter === "Mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("Mobile")}
                    className={filter === "Mobile" ? "bg-primary-500 hover:bg-primary-600" : ""}
                  >
                    {t("projects.filterMobile")}
                  </Button>
                  <Button
                    variant={filter === "AI" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("AI")}
                    className={filter === "AI" ? "bg-primary-500 hover:bg-primary-600" : ""}
                  >
                    {t("projects.filterAI")}
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("projects.search")}
                    className="pl-10 pr-4 py-2 w-full md:w-[300px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn("up", 0.1 * index + 0.3)}
                  className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                      <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="outline" size="sm" className="text-primary-500 border-primary-500">
                          {t("projects.viewDetails")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t("projects.viewLive")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                  No projects found matching your criteria.
                </h3>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilter("all")
                    setSearchQuery("")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
