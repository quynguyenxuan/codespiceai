import { Metadata } from 'next'
import AboutPageClient from './page.client'
import { Users, Target, Eye, Award, Briefcase, Globe, Heart } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  // Replace 'CodeSpice AI' with your actual company name
  const companyName = 'CodeSpice AI'
  return {
    title: `Về ${companyName} | Câu Chuyện & Đội Ngũ Chuyên Gia`,
    description: `Tìm hiểu về câu chuyện, sứ mệnh và đội ngũ chuyên gia tại ${companyName}. Chúng tôi cam kết mang đến các giải pháp công nghệ đột phá và hiệu quả.`,
  }
}

export default function AboutPage() {
  const values = [
    { icon: <Award className="h-6 w-6 text-white" /> },
    { icon: <Briefcase className="h-6 w-6 text-white" /> },
    { icon: <Globe className="h-6 w-6 text-white" /> },
    { icon: <Users className="h-6 w-6 text-white" /> },
  ]

  const team = [
    { image: '/images/team-member-1.jpg' },
    { image: '/images/team-member-2.jpg' },
    { image: '/images/team-member-3.jpg' },
    { image: '/images/team-member-4.jpg' },
  ]

  const stats = [
    { icon: <Briefcase className="h-6 w-6 text-primary-500" /> },
    { icon: <Users className="h-6 w-6 text-primary-500" /> },
    { icon: <Globe className="h-6 w-6 text-primary-500" /> },
    { icon: <Heart className="h-6 w-6 text-primary-500" /> },
  ]

  return <AboutPageClient values={values} team={team} stats={stats} />
}
