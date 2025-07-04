import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { blogPosts as allBlogPosts } from './../page' // Import the full blog posts array

// Define a proper type for a blog post
type BlogPost = {
  id: number
  title: string
  description: string
  date: string
  readTime: string
  slug: string
  category: string
  image: string
  featured: boolean
  author: {
    name: string
    avatar: string
  }
  content?: string // Add content property
}

// Create a map for faster lookups
const blogPostsMap: { [key: string]: BlogPost } = allBlogPosts.reduce(
  (acc: { [key: string]: BlogPost }, post: BlogPost) => {
    acc[post.slug] = post
    return acc
  },
  {} as { [key: string]: BlogPost },
)

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPostsMap[params.slug]

  if (!post) {
    return {
      title: 'Bài Viết Không Tồn Tại',
      description: 'Rất tiếc, bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.',
    }
  }

  // Auto-generate description from content if not provided
  const description =
    post.description || (post.content || '').replace(/<[^>]*>?/gm, '').substring(0, 155) + '...'

  return {
    title: `${post.title} | CodeSpice Blog`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPostsMap[params.slug]

  if (!post) {
    notFound()
  }

  // Mock content for demonstration
  const postContent = `
      <p>Next.js is a powerful React framework that enables you to build server-side rendered and statically generated web applications. With the release of Next.js 14, several new features and improvements have been introduced to enhance the developer experience and application performance.</p>
      <h2>Key Features of Next.js 14</h2>
      <h3>App Router</h3>
      <p>The App Router is a new routing system that provides a more intuitive and flexible way to define routes in your Next.js application. It allows for nested layouts, loading states, and error handling at the route level.</p>
      <h3>Server Components</h3>
      <p>React Server Components allow you to render components on the server, reducing the JavaScript sent to the client and improving performance. This is particularly useful for components that don't require client-side interactivity.</p>
      <h2>Conclusion</h2>
      <p>Next.js 14 brings significant improvements to the React ecosystem, making it easier to build fast, scalable, and user-friendly web applications.</p>
    `

  return (
    <>
      <Header />
      <div className="container max-w-3xl py-10">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
          <div className="mb-8 text-muted-foreground">
            {post.date} · {post.readTime}
          </div>

          <div
            className="prose prose-slate max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: postContent }} // Using mock content
          />
        </article>

        {/* Related Posts Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allBlogPosts
              .filter(
                (relatedPost: BlogPost) =>
                  relatedPost.slug !== params.slug && relatedPost.category === post.category,
              )
              .slice(0, 3)
              .map((relatedPost: BlogPost) => (
                <Card key={relatedPost.id} className="flex flex-col group">
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10" />
                    <div className="absolute top-3 left-3 z-20">
                      <Badge variant="secondary" className="text-xs">
                        {relatedPost.category}
                      </Badge>
                    </div>
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      width={400}
                      height={240}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pt-4 pb-2">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {relatedPost.date} · {relatedPost.readTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {relatedPost.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild variant="link" className="p-0 h-auto text-sm font-medium">
                      <Link href={`/blog/${relatedPost.slug}`}>Read Article →</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
