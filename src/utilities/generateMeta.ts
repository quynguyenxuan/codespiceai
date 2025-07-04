import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

const extractDescription = (doc: Partial<Page> | Partial<Post> | null): string => {
  if (doc?.meta?.description) {
    return doc.meta.description
  }

  if (doc && 'layout' in doc && Array.isArray(doc.layout)) {
    const firstContentBlock = doc.layout.find(
      (block) => block.blockType === 'content' && 'content' in block && block.content,
    )
    if (firstContentBlock && 'content' in firstContentBlock && firstContentBlock.content) {
      // Extract text from Lexical nodes
      const richText = firstContentBlock.content as {
        root: { children: any[] }
      }
      const textNodes = richText?.root?.children
        ?.map((child) =>
          child.children?.map((grandchild: { text: any }) => grandchild.text).join(' '),
        )
        .join(' ')
      return textNodes ? textNodes.slice(0, 160) + (textNodes.length > 160 ? '...' : '') : ''
    }
  }

  return ''
}

export const generateMeta = async (args: {
  doc:
    | (Partial<Page> & {
        meta?: { canonicalURL?: string | null }
      })
    | (Partial<Post> & {
        meta?: { canonicalURL?: string | null }
      })
    | null
}): Promise<Metadata> => {
  const { doc } = args

  if (!doc) {
    return {} // Return empty metadata if no doc
  }

  const serverURL = getServerSideURL()
  const slug = doc.slug ?? ''
  // Determine the collection slug for URL construction
  const collectionSlug = 'layout' in doc ? 'pages' : 'posts' // 'layout' is unique to Pages
  const docURL = `${serverURL}/${collectionSlug}/${slug}`

  const canonicalURL = doc.meta?.canonicalURL || docURL
  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc.meta.title + ' | Payload Website Template'
    : doc?.title
      ? doc.title + ' | Payload Website Template'
      : 'Payload Website Template'

  const description = extractDescription(doc)

  return {
    alternates: {
      canonical: canonicalURL,
    },
    description: description,
    openGraph: mergeOpenGraph({
      description: description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: docURL,
    }),
    title,
  }
}
