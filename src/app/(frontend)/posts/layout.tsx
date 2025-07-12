import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Inter } from 'next/font/google'
import type React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
