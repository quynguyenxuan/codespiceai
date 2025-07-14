'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { useSearchParams } from 'next/navigation'
interface BlogSearchProps {
  category: string
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ category }) => {
  const { t } = useLanguage()
  const searchParams = useSearchParams()

  const query = searchParams.get('query')
  const router = useRouter()
  const [searchValue, setSearchValue] = React.useState(query || '')

  const href = `/blog/${category}/1?query=${searchValue}`
  const onSubmit = () => {
    if (searchValue) {
      router.push(href)
    }
  }
  return (
    <form className="flex items-center" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={t('search_articles')}
        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Link href={href} className="relative">
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg
            className="h-4 w-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Search icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </Link>
    </form>
  )
}
