import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Inter } from 'next/font/google'
import type React from 'react'

import { StagewiseToolbar } from '@stagewise/toolbar-next'

import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        {/* <link href="/favicon.svg" rel="icon" type="image/svg+xml" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
          <StagewiseToolbar config={{ plugins: [] }} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'CodeSpice AI | Giải Pháp Công Nghệ & Phần Mềm Sáng Tạo', // Replace with your company name and tagline
    template: '%s | CodeSpice AI',
  },
  description:
    'CodeSpice AI chuyên cung cấp dịch vụ thiết kế website, phát triển ứng dụng di động và giải pháp AI đột phá. Đối tác công nghệ tin cậy cho sự phát triển của bạn.', // Replace with your default description
  keywords: [
    'CodeSpice AI',
    'thiết kế website',
    'phát triển phần mềm',
    'giải pháp AI',
    'công ty công nghệ',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: mergeOpenGraph({
    title: 'CodeSpice AI | Giải Pháp Công Nghệ & Phần Mềm Sáng Tạo',
    description: 'Đối tác công nghệ tin cậy cho sự phát triển của bạn.',
    url: '/',
    siteName: 'CodeSpice AI',
    images: [
      {
        url: '/images/og-image.jpg', // Replace with your default OG image path
        width: 1200,
        height: 630,
        alt: 'CodeSpice AI - Giải Pháp Công Nghệ',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  }),
  twitter: {
    card: 'summary_large_image',
    site: '@CodeSpiceAI', // Replace with your Twitter handle
    creator: '@CodeSpiceAI',
    title: 'CodeSpice AI | Giải Pháp Công Nghệ & Phần Mềm Sáng Tạo',
    description: 'Đối tác công nghệ tin cậy cho sự phát triển của bạn.',
    images: ['/images/og-image.jpg'], // Replace with your default Twitter image path
  },
}
