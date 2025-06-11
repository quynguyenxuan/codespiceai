import Link from "next/link"
import { Button } from "@/components/ui/button"
import {Header} from "@/components/layout/header" // Import the Header component
import {Footer} from "@/components/layout/footer" // Import the Footer component

/**
 * Renders a 404 Not Found page for blog posts.
 * 
 * This component displays an error message when a requested blog post cannot be found,
 * with a button to return to the main blog page. It includes the site's Header and Footer.
 * 
 * @returns {JSX.Element} A page with a "Blog Post Not Found" message and navigation button
 */
export default function BlogNotFound() {
  return (
    <>
      <Header /> {/* Add the Header component */}
      <div className="container flex h-[calc(100vh-200px)] flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Blog Post Not Found
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
      <Footer /> {/* Add the Footer component */}
    </>
  )
}