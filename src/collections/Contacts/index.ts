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

export const Contacts: CollectionConfig<'contacts'> = {
  slug: 'contacts',
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
      name: 'email',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
   {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'budgetMin',
      type: 'number',
    },
    {
      name: 'budgetMax',
      type: 'number',
    },
    {
      name: 'content',
      type: 'text',
    },
  ],
  hooks: {
    // afterChange: [revalidatePost],
    // afterRead: [populateAuthors],
    // afterDelete: [revalidateDelete],
  },
  
}
