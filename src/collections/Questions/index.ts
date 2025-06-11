import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'

export const Questions: CollectionConfig<'questions'> = {
  slug: 'questions',
  access: {
    create: () => true,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  
  admin: {
    defaultColumns: ['question', 'updatedAt'],
    useAsTitle: 'question',
  },
  orderable: true,
  fields: [
    {
      name: 'question',
      type: 'text',
      localized: true,
    },
    {
      name: 'answer',
      type: 'text',
      localized: true,
    },
  ],
  hooks: {
    // afterChange: [revalidatePost],
    // afterRead: [populateAuthors],
    // afterDelete: [revalidateDelete],
  },
  
}
