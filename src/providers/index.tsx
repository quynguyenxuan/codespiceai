import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
// import { ThemeProvider } from './Theme'
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <HeaderThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
        </HeaderThemeProvider>
    </ThemeProvider>
  )
}
