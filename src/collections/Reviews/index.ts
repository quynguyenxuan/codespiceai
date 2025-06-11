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

export const Reviews: CollectionConfig<'reviews'> = {
  slug: 'reviews',
  access: {
    create: () => true,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    
    useAsTitle: 'title',
  },
  orderable: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'username',
      type: 'text',
    },
    {
      name: 'jobTitle',
      type: 'text',
    },
    {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
    },
    {
      name: 'company',
      type: 'text',
    },
   
    {
      name: 'content',
      type: 'text',
    },
    {
      name: 'star',
      type: 'number',
      required: true
    },

  ],
  hooks: {
    // afterChange: [revalidatePost],
    // afterRead: [populateAuthors],
    // afterDelete: [revalidateDelete],
  },
  
}
