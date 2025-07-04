import { Metadata } from 'next'
import { getPayloadRef } from '@/utilities/getPayload'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { type Review } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const companyName = 'CodeSpice AI' // Replace with your actual company name
  return {
    title: `Khách Hàng Nói Gì Về ${companyName} | Đánh Giá & Cảm Nhận`,
    description: `Xem các đánh giá và cảm nhận thực tế từ những khách hàng đã tin tưởng và sử dụng dịch vụ của ${companyName}. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.`,
    openGraph: {
      title: `Đánh Giá Khách Hàng - ${companyName}`,
      description: 'Niềm tin và sự hài lòng của bạn là thước đo thành công của chúng tôi.',
      images: [{ url: '/images/og-reviews.jpg' }], // Create a specific OG image for this page
    },
  }
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />,
    )
  }
  return <div className="flex">{stars}</div>
}

export default async function ReviewsPage() {
  const payload = await getPayloadRef()
  const reviewsRes = await payload.find({
    collection: 'reviews',
    limit: 100, // Add pagination later if needed
    sort: '-createdAt',
  })
  const reviews = reviewsRes.docs as Review[]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-24 lg:py-32 bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900">
          <div className="container px-4 md:px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gold-silver-gradient mb-6">
              Khách Hàng Nói Gì Về Chúng Tôi
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Niềm tin và sự hài lòng của bạn là thước đo thành công lớn nhất của chúng tôi.
            </p>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col"
                >
                  <div className="flex-grow">
                    <StarRating rating={review.star || 0} />
                    <h3 className="text-xl font-semibold my-4">{review.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      &ldquo;{review.content}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
                    {typeof review.avatar === 'object' && review.avatar?.url && (
                      <Image
                        src={review.avatar.url}
                        alt={review.username || 'avatar'}
                        width={48}
                        height={48}
                        className="rounded-full mr-4"
                      />
                    )}
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{review.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.jobTitle}
                        {review.jobTitle && review.company ? ', ' : ''}
                        {review.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
