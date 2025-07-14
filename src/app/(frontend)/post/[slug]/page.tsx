import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Post, Category, Media } from '@/payload-types'
import { Card } from '@/components/Card' // Our custom Card component
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component' // Import RelatedPosts component
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

// Helper function to create a simple RichText data structure
function createSimpleRichText(text: string): SerializedEditorState {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              text: text,
              type: 'text',
              version: 1,
            } as SerializedLexicalNode,
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        } as SerializedLexicalNode,
      ],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
      _status: {
        equals: 'published',
      },
    },
    depth: 2, // Populate categories, authors, and heroImage
    limit: 1,
  })

  return posts.docs[0] || null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 0,
  })

  return posts.docs.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Bài Viết Không Tồn Tại',
      description: 'Rất tiếc, bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.',
    }
  }

  return generateMeta({
    doc: {
      title: post.title,
      meta: {
        description: post.meta?.description || '',
        image: post.meta?.image as Media, // Cast to Media type
      },
      slug: post.slug,
      layout: [], // Add layout property for Page type compatibility in generateMeta
    },
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const imageUrl = (post.heroImage as Media)?.url || '/placeholder.jpg'
  const authorName = post.populatedAuthors?.[0]?.name || 'Anonymous'
  const categoryTitle = (post.categories?.[0] as Category)?.title || 'Uncategorized'

  const relatedPosts =
    post.relatedPosts && Array.isArray(post.relatedPosts)
      ? post.relatedPosts.filter((related) => typeof related === 'object')
      : []

  return (
    <>
      <Header />
      <div className="container py-10">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
          <div className="mb-8 text-muted-foreground">
            {post.createdAt && new Date(post.createdAt).toLocaleDateString()} · By {authorName}
          </div>

          <div className="relative h-64 w-full mb-8">
            <Image
              src={imageUrl}
              alt={post.title || 'Blog Post Image'}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>

          {post.content && ( // Changed richText to content
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <RichText data={post.content} /> {/* Changed richText to content */}
            </div>
          )}
        </article>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Related Articles</h2>
        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <RelatedPosts
            docs={relatedPosts}
            // introContent={createSimpleRichText('Related Articles')}
          />
        )}
      </div>
      <Footer />
    </>
  )
}
