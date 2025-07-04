import { queryPageBySlug } from '@/utils/queryPageBySlug'
import { Metadata } from 'next'
import { generateMeta } from './generateMeta'

type Props = {
  slug?: string
}

export async function getMetadata(params: Props): Promise<Metadata> {
  const { slug = 'home' } = params
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}
