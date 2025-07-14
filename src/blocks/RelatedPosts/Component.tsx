import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { BlogItem } from '@/components/BlogItem'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx(className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null
          return <BlogItem key={index} post={doc} />
          // return <Card key={index} doc={doc} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}
