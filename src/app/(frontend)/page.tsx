// import PageTemplate, { generateMetadata } from './[slug]/page'

// export default PageTemplate

// export { generateMetadata }
// "use client"

import { Banner } from '@/payload-types' // Import the Banner type
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroBanner } from '@/components/sections/hero-banner'
import { ServicesSection } from '@/components/sections/services-section'
import { AboutSection } from '@/components/sections/about-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ContactSection } from '@/components/sections/contact-section'
import { AdvancedBanner } from '@/components/sections/advanced-banner'
import { getPayloadRef } from '@/utilities/getPayload'

export default async function Home() {
  const payload = await getPayloadRef()
  const banners = await payload.find({
    collection: 'banners',
    limit: 10, // Adjust limit as needed
  })
  const projects = await payload.find({
    collection: 'projects',
    limit: 3, // Adjust limit as needed
  })
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AdvancedBanner />
      <main className="flex-1">
        <HeroBanner banners={banners.docs} />
        {/* <section className="py-8">
          <h2 className="text-2xl font-bold mb-4">Banners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.docs.map((banner: Banner) => (
              <div key={banner.id} className="border p-4">
                <h3 className="font-semibold">{banner.title}</h3>
                <p>{banner.description}</p>
                {banner.image && (
                  <img
                    src={banner.image.url}
                    alt={banner.title}
                    className="mt-2 w-full h-32 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </section> */}
        <ServicesSection />
        <AboutSection />
        <PortfolioSection projects={projects.docs} />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
