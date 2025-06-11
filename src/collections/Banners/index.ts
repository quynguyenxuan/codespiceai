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

export const Banners: CollectionConfig<'banners'> = {
  slug: 'banners',
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
      name: 'description',
      type: 'text',
    },
    {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
    },
    

  ],
  hooks: {
    // afterChange: [revalidatePost],
    // afterRead: [populateAuthors],
    // afterDelete: [revalidateDelete],
  },
  
}
