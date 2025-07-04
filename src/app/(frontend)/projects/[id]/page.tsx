import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadRef } from '@/utilities/getPayload'
import ProjectDetailPageClient from './page.client'
import { type Project, type Media } from '@/payload-types'

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

const getImageUrl = (image: string | number | Media | null | undefined): string => {
  if (typeof image === 'object' && image !== null && 'url' in image) {
    return image.url as string
  }
  return '/images/og-image.jpg' // Default OG image
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = params
  const payload = await getPayloadRef()

  const projectRes = await payload.find({
    collection: 'projects',
    where: {
      id: {
        equals: id,
      },
    },
    limit: 1,
  })

  const project = projectRes.docs[0]

  if (!project) {
    return {
      title: 'Dự Án Không Tồn Tại',
    }
  }

  const description =
    project.meta?.description ||
    project.description ||
    `Khám phá chi tiết dự án ${project.title} - một trong những sản phẩm tiêu biểu của chúng tôi.`

  return {
    title: `${project.title} | Dự Án Của CodeSpice AI`,
    description: description,
    openGraph: {
      title: project.title,
      description: description,
      type: 'article',
      images: [
        {
          url: getImageUrl(project.meta?.image || project.image),
          alt: project.title,
        },
      ],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = params
  const payload = await getPayloadRef()

  const projectRes = await payload.find({
    collection: 'projects',
    depth: 2, // Populate categories
    where: {
      id: {
        equals: id,
      },
    },
    limit: 1,
  })

  const project = projectRes.docs[0]

  if (!project) {
    notFound()
  }

  const categoryIds = project.category?.map((cat) => (typeof cat === 'object' ? cat.id : cat)) || []

  const relatedProjectsRes = await payload.find({
    collection: 'projects',
    where: {
      and: [
        {
          category: {
            in: categoryIds,
          },
        },
        {
          id: {
            not_equals: project.id,
          },
        },
      ],
    },
    limit: 3,
  })

  const relatedProjects = relatedProjectsRes.docs

  return <ProjectDetailPageClient project={project} relatedProjects={relatedProjects} />
}
