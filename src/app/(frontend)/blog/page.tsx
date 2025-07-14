import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { BlogItem } from '@/components/BlogItem'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BlogSearch } from '@/components/BlogSearch'
import { getMetadata } from '@/utilities/getMetadata'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Post, Category } from '@/payload-types'
import { Pagination } from '@/components/Pagination'

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata({ slug: 'blog' })
}

async function getPostsAndCategories(page: number = 1, limit: number = 10) {
  const payload = await getPayload({ config })

  const [posts, categories] = await Promise.all([
    payload.find({
      collection: 'posts',
      page: page,
      limit: limit,
      where: {
        _status: {
          equals: 'published',
        },
      },
      // depth: 2, // Populate categories and authors
    }),
    payload.find({
      collection: 'categories',
      limit: 100, // Adjust limit as needed
    }),
  ])

  return {
    posts: posts,
    categories: categories,
  }
}

export default async function BlogPage({
  searchParams,
  params: { lang, locale },
}: {
  searchParams: {
    limit?: string
    query?: string
    search?: string
  }
  params: {
    lang: string
    locale: string
  }
}) {
  const page = 1
  const limit = 2 // Default limit
  const { posts, categories: payloadCategories } = await getPostsAndCategories(page, limit)

  const allCategories = [
    { name: 'All', slug: 'all' },
    ...payloadCategories.docs.map((cat) => ({ name: cat.title, slug: cat.slug })),
  ]

  const featuredPosts = posts.docs
    .filter((post) => post.meta?.title?.includes('Featured') || post.slug?.includes('featured'))
    .slice(0, 3) // Example: filter by title containing 'Featured' or slug
  const allPosts = posts

  return (
    <>
      <Header />
      <div className="container py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block text-4xl font-extrabold tracking-tight lg:text-5xl">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our latest articles, tutorials, and insights
            </p>
          </div>
          <BlogSearch category="all" />
        </div>
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 pt-6">
          {allCategories.map((c) => (
            <Link key={c.slug} href={`/blog/${c.slug}/1`}>
              <Badge
                key={c.slug}
                variant={c.slug === 'all' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {c.name}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Featured posts */}
        {featuredPosts.length > 0 && (
          <div className="pt-10">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogItem key={post.id} post={post} isFeatured={true} />
              ))}
            </div>
          </div>
        )}

        {/* All posts */}
        <div className="pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">All Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.docs.map((post) => (
              <BlogItem key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} routerPath="/blog" />
          )}
        </div>

        {/* Newsletter subscription */}
        <div className="mt-16 bg-muted rounded-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest articles, tutorials and updates delivered straight to your inbox.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
