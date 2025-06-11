import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Header} from "@/components/layout/header" // Import the Header component
import {Footer} from "@/components/layout/footer" // Import the Footer component


export const metadata: Metadata = {
  title: "Blog | CodeSpice",
  description: "Latest articles, tutorials, and insights from CodeSpice",
}

const categories = [
  { name: "All", slug: "all" },
  { name: "Web Development", slug: "web-dev" },
  { name: "Mobile", slug: "mobile" },
  { name: "DevOps", slug: "devops" },
  { name: "AI & ML", slug: "ai-ml" },
  { name: "Design", slug: "design" },
]

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    description: "Learn how to build modern web applications with Next.js 14. We'll cover the new App Router, Server Components, and more.",
    date: "May 20, 2025",
    readTime: "5 min read",
    slug: "getting-started-with-nextjs-14",
    category: "Web Development",
    image: "/images/blog/nextjs-cover.jpg",
    featured: true,
    author: {
      name: "Alex Johnson",
      avatar: "/images/team/alex.jpg"
    }
  },
  {
    id: 2,
    title: "The Power of Tailwind CSS",
    description: "Discover how Tailwind CSS can streamline your styling workflow and help you build beautiful, responsive interfaces faster than ever.",
    date: "May 15, 2025",
    readTime: "4 min read",
    slug: "power-of-tailwind-css",
    category: "Web Development",
    image: "/images/blog/tailwind-cover.jpg",
    featured: false,
    author: {
      name: "Sarah Chen",
      avatar: "/images/team/sarah.jpg"
    }
  },
  {
    id: 3,
    title: "Building Accessible UI Components",
    description: "Best practices for creating accessible and inclusive user interfaces that work for everyone, regardless of ability or disability.",
    date: "May 10, 2025",
    readTime: "7 min read",
    slug: "building-accessible-ui-components",
    category: "Design",
    image: "/images/blog/accessibility-cover.jpg",
    featured: false,
    author: {
      name: "Jamie Rodriguez",
      avatar: "/images/team/jamie.jpg"
    }
  },
  {
    id: 4,
    title: "State Management in React Applications",
    description: "Comparing different state management solutions for React apps including Context API, Redux, Zustand, and Jotai. Which one is right for your project?",
    date: "May 5, 2025",
    readTime: "6 min read",
    slug: "state-management-react-applications",
    category: "Web Development",
    image: "/images/blog/state-management-cover.jpg",
    featured: false,
    author: {
      name: "Michael Park",
      avatar: "/images/team/michael.jpg"
    }
  },
  {
    id: 5,
    title: "Flutter vs React Native in 2025",
    description: "A comprehensive comparison of the two most popular cross-platform mobile development frameworks in 2025. Which one should you choose?",
    date: "April 28, 2025",
    readTime: "8 min read",
    slug: "flutter-vs-react-native-2025",
    category: "Mobile",
    image: "/images/blog/mobile-frameworks-cover.jpg",
    featured: true,
    author: {
      name: "Priya Sharma",
      avatar: "/images/team/priya.jpg"
    }
  },
  {
    id: 6,
    title: "Introduction to Docker and Kubernetes",
    description: "Learn the basics of containerization with Docker and orchestration with Kubernetes to streamline your deployment process.",
    date: "April 22, 2025",
    readTime: "9 min read",
    slug: "intro-docker-kubernetes",
    category: "DevOps",
    image: "/images/blog/devops-cover.jpg",
    featured: false,
    author: {
      name: "David Wilson",
      avatar: "/images/team/david.jpg"
    }
  },
  {
    id: 7,
    title: "Getting Started with Machine Learning in JavaScript",
    description: "Explore how to implement machine learning models directly in the browser using TensorFlow.js and other JavaScript libraries.",
    date: "April 18, 2025",
    readTime: "7 min read",
    slug: "machine-learning-javascript",
    category: "AI & ML",
    image: "/images/blog/ml-js-cover.jpg",
    featured: false,
    author: {
      name: "Emily Zhang",
      avatar: "/images/team/emily.jpg"
    }
  },
  {
    id: 8,
    title: "UI/UX Design Trends for 2025",
    description: "Stay ahead of the curve with these emerging UI/UX design trends that are shaping the digital landscape in 2025.",
    date: "April 12, 2025",
    readTime: "5 min read",
    slug: "ui-ux-design-trends-2025",
    category: "Design",
    image: "/images/blog/design-trends-cover.jpg",
    featured: true,
    author: {
      name: "Thomas Lee",
      avatar: "/images/team/thomas.jpg"
    }
  },
  {
    id: 9,
    title: "Building a CI/CD Pipeline with GitHub Actions",
    description: "A step-by-step guide to setting up a continuous integration and deployment pipeline using GitHub Actions for your web projects.",
    date: "April 8, 2025",
    readTime: "6 min read",
    slug: "cicd-github-actions",
    category: "DevOps",
    image: "/images/blog/github-actions-cover.jpg",
    featured: false,
    author: {
      name: "David Wilson",
      avatar: "/images/team/david.jpg"
    }
  },
  {
    id: 10,
    title: "Optimizing React Performance",
    description: "Advanced techniques to optimize your React applications for better performance and user experience.",
    date: "April 3, 2025",
    readTime: "8 min read",
    slug: "optimizing-react-performance",
    category: "Web Development",
    image: "/images/blog/react-performance-cover.jpg",
    featured: false,
    author: {
      name: "Alex Johnson",
      avatar: "/images/team/alex.jpg"
    }
  },
  {
    id: 11,
    title: "Introduction to Large Language Models",
    description: "Understanding the fundamentals of Large Language Models (LLMs) and how they're transforming software development.",
    date: "March 28, 2025",
    readTime: "10 min read",
    slug: "intro-large-language-models",
    category: "AI & ML",
    image: "/images/blog/llm-cover.jpg",
    featured: true,
    author: {
      name: "Emily Zhang",
      avatar: "/images/team/emily.jpg"
    }
  },
  {
    id: 12,
    title: "Building Responsive Layouts with CSS Grid",
    description: "Master CSS Grid to create complex, responsive layouts with less code and better maintainability.",
    date: "March 22, 2025",
    readTime: "6 min read",
    slug: "css-grid-responsive-layouts",
    category: "Web Development",
    image: "/images/blog/css-grid-cover.jpg",
    featured: false,
    author: {
      name: "Sarah Chen",
      avatar: "/images/team/sarah.jpg"
    }
  }
]

export default function BlogPage() {
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
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <svg
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 pt-6">
        {categories.map((category) => (
          <Badge key={category.slug} variant={category.slug === 'all' ? 'default' : 'outline'} className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            {category.name}
          </Badge>
        ))}
      </div>
      
      {/* Featured posts */}
      <div className="pt-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.filter(post => post.featured).slice(0, 3).map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
                <div className="absolute top-4 left-4 z-20">
                  <Badge>{post.category}</Badge>
                </div>
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{post.author.name}</span>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription>
                  {post.date} · {post.readTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">{post.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* All posts */}
      <div className="pt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">All Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col group">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10" />
                <div className="absolute top-3 left-3 z-20">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                </div>
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={400}
                  height={240}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pt-4 pb-2">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="text-xs">
                  {post.date} · {post.readTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild variant="link" className="p-0 h-auto text-sm font-medium">
                  <Link href={`/blog/${post.slug}`}>Read Article →</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12">
        <Button variant="outline" size="icon" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span className="sr-only">Previous</span>
        </Button>
        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <span className="mx-1">...</span>
        <Button variant="outline" size="sm">8</Button>
        <Button variant="outline" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
          <span className="sr-only">Next</span>
        </Button>
      </div>
      
      {/* Newsletter subscription */}
      <div className="mt-16 bg-muted rounded-lg p-8">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
          <p className="text-muted-foreground mb-6">Get the latest articles, tutorials and updates delivered straight to your inbox.</p>
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