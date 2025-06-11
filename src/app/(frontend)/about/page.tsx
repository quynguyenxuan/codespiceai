'use client'

import { useLanguage } from '@/contexts/language-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/animations'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Target, Eye, Award, ArrowRight, Briefcase, Globe, Heart } from 'lucide-react'

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: t('about.value1Title'),
      description: t('about.value1Description'),
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: t('about.value2Title'),
      description: t('about.value2Description'),
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: t('about.value3Title'),
      description: t('about.value3Description'),
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: t('about.value4Title'),
      description: t('about.value4Description'),
    },
  ]

  const team = [
    {
      name: t('about.member1Name'),
      position: t('about.member1Position'),
      description: t('about.member1Description'),
      image: '/media/team-member-1.jpg',
    },
    {
      name: t('about.member2Name'),
      position: t('about.member2Position'),
      description: t('about.member2Description'),
      image: '/media/team-member-2.jpg',
    },
    {
      name: t('about.member3Name'),
      position: t('about.member3Position'),
      description: t('about.member3Description'),
      image: '/media/team-member-3.jpg',
    },
    {
      name: t('about.member4Name'),
      position: t('about.member4Name'),
      description: t('about.member4Description'),
      image: '/media/team-member-4.jpg',
    },
  ]

  const stats = [
    {
      number: t('about.stat1Number'),
      text: t('about.stat1Text'),
      icon: <Briefcase className="h-6 w-6 text-primary-500" />,
    },
    {
      number: t('about.stat2Number'),
      text: t('about.stat2Text'),
      icon: <Users className="h-6 w-6 text-primary-500" />,
    },
    {
      number: t('about.stat3Number'),
      text: t('about.stat3Text'),
      icon: <Globe className="h-6 w-6 text-primary-500" />,
    },
    {
      number: t('about.stat4Number'),
      text: t('about.stat4Text'),
      icon: <Heart className="h-6 w-6 text-primary-500" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-24 lg:py-32 bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/about-hero-background.jpg"
              alt="About background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-accent-900/50 to-secondary-900/50" />

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className="relative container px-4 md:px-6"
          >
            <motion.div variants={fadeIn('up', 0.3)} className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gold-silver-gradient mb-6">
                {t('about.heroTitle')}
              </h1>
              <p className="text-xl text-white/80 mb-8">{t('about.heroDescription')}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('right', 0.3)}
                className="space-y-6"
              >
                <div className="inline-block rounded-lg bg-gradient-to-r from-primary-500 to-secondary-100 px-3 py-1 text-sm dark:from-primary-900 dark:to-secondary-900">
                  {t('about.storyTitle')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500">
                  {t('about.storyDescription')}
                </h2>
                <div className="space-y-4 text-gray-500 dark:text-gray-400">
                  <p>{t('about.storyContent')}</p>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('left', 0.3)}
                className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/our-story.jpg"
                  alt="Our Story"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('up', 0.3)}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-3 mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{t('about.missionTitle')}</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {t('about.missionDescription')}
                </p>
                <p className="text-gray-500 dark:text-gray-400">{t('about.missionContent')}</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('up', 0.5)}
                className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-3 mr-4">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{t('about.visionTitle')}</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {t('about.visionDescription')}
                </p>
                <p className="text-gray-500 dark:text-gray-400">{t('about.visionContent')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-block rounded-lg bg-gradient-to-r from-primary-500 to-secondary-100 px-3 py-1 text-sm dark:from-primary-900 dark:to-secondary-900 mb-4">
                {t('about.valuesTitle')}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mb-4">
                {t('about.valuesDescription')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn('up', 0.1 * index + 0.3)}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-3">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-block rounded-lg bg-gradient-to-r from-primary-500 to-secondary-100 px-3 py-1 text-sm dark:from-primary-900 dark:to-secondary-900 mb-4">
                {t('about.teamTitle')}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mb-4">
                {t('about.teamDescription')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn('up', 0.1 * index + 0.3)}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-[300px]">
                    <Image
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary-500 mb-4">{member.position}</p>
                    <p className="text-gray-500 dark:text-gray-400">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="inline-block rounded-lg bg-gradient-to-r from-primary-500 to-secondary-100 px-3 py-1 text-sm dark:from-primary-900 dark:to-secondary-900 mb-4">
                {t('about.statsTitle')}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mb-4">
                {t('about.statsDescription')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeIn('up', 0.1 * index + 0.3)}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                    {stat.number}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{stat.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('right', 0.3)}
                className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/join-our-team.jpg"
                  alt="Join Our Team"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeIn('left', 0.3)}
                className="space-y-6"
              >
                <div className="inline-block rounded-lg bg-gradient-to-r from-primary-500 to-secondary-100 px-3 py-1 text-sm dark:from-primary-900 dark:to-secondary-900">
                  {t('about.joinTitle')}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500">
                  {t('about.joinDescription')}
                </h2>
                <div className="space-y-4 text-gray-500 dark:text-gray-400">
                  <p>{t('about.joinContent')}</p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 transition-opacity">
                    {t('about.joinButton')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-900 via-accent-900 to-secondary-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/banner-programming-ai.jpg"
              alt="CTA background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-accent-900/50 to-secondary-900/50" />

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative container px-4 md:px-6 text-center"
          >
            <motion.div variants={fadeIn('up', 0.3)} className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold gold-silver-gradient mb-6">
                {t('about.ctaTitle')}
              </h2>
              <p className="text-xl text-white/80 mb-8">{t('about.ctaDescription')}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 dark:text-primary-900"
                    style={{ color: '#713F12' }} // Màu primary-900 cố định
                  >
                    {t('about.ctaButton')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
