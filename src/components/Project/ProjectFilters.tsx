'use client'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'

import { Search, ExternalLink, ArrowRight } from 'lucide-react'
// import { useState } from 'react'
import { getPayloadRef } from '@/utilities/getPayload'
import { useState } from 'react'

export default function ProjectFilters() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="py-8 bg-white dark:bg-gray-950 border-b">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">{t('projects.filter')}</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-primary-500 hover:bg-primary-600' : ''}
              >
                {t('projects.filterAll')}
              </Button>
              <Button
                variant={filter === 'Web' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('Web')}
                className={filter === 'Web' ? 'bg-primary-500 hover:bg-primary-600' : ''}
              >
                {t('projects.filterWeb')}
              </Button>
              <Button
                variant={filter === 'Mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('Mobile')}
                className={filter === 'Mobile' ? 'bg-primary-500 hover:bg-primary-600' : ''}
              >
                {t('projects.filterMobile')}
              </Button>
              <Button
                variant={filter === 'AI' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('AI')}
                className={filter === 'AI' ? 'bg-primary-500 hover:bg-primary-600' : ''}
              >
                {t('projects.filterAI')}
              </Button>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('projects.search')}
                className="pl-10 pr-4 py-2 w-full md:w-[300px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
