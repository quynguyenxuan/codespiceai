import type { CollectionConfig } from 'payload'

export const UserRoles: CollectionConfig = {
  slug: 'user-roles',
  admin: {
    group: 'Settings',
    useAsTitle: 'name',
    defaultColumns: ['id', 'name', 'status', 'sort'],
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'sort',
      type: 'number',
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        // if (operation === 'create') {
        //   data.createdBy = req.user?.id
        // }
        // data.updatedBy = req.user?.id
        return data
      },
    ],
  },
}
