import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Post, Media, Category, User } from '@/payload-types'
import { format } from 'date-fns'

interface BlogItemProps {
  post: Post
  isFeatured?: boolean
  showCategories?: boolean // New prop
  relationTo?: string // New prop, allowing for 'blog' or 'posts'
}

export function BlogItem({
  post,
  isFeatured = false,
  showCategories,
  relationTo = 'post',
}: BlogItemProps) {
  const imageUrl = (post.heroImage as Media)?.url || '/placeholder.jpg'
  const categoryTitle = (post.categories?.[0] as Category)?.title || 'Uncategorized'
  const authorName = post.populatedAuthors?.[0]?.name || 'Anonymous'
  const formattedDate = post.createdAt ? format(new Date(post.createdAt), 'MMM dd, yyyy') : 'N/A'
  const postDescription = post.meta?.description || ''
  const hasCategories =
    post.categories && Array.isArray(post.categories) && post.categories.length > 0
  const href = `/${relationTo}/${post.slug}`
  return (
    <Card key={post.id} className="flex flex-col overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
        {showCategories && hasCategories ? (
          <div className="absolute top-4 left-4 z-20">
            {post.categories?.map((category) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory, id } = category // Destructure id
                const categoryName = titleFromCategory || 'Untitled category'
                return (
                  <Badge key={id} className="mr-1">
                    {categoryName}
                  </Badge>
                )
              }
              return null
            })}
          </div>
        ) : (
          <div className="absolute top-4 left-4 z-20">
            <Badge>{categoryTitle}</Badge>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={post.title}
          width={500}
          height={300}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {/* Removing author avatar as it's not directly available on User type */}
          <span className="text-sm text-muted-foreground">{authorName}</span>
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={href}>{post.title}</Link>
        </CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">{postDescription}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          asChild
          variant="outline"
          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <Link href={href}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
