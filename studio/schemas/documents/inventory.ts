import type { Rule } from '@sanity/types'
import { MdInventory } from 'react-icons/md'

export default {
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  icon: MdInventory,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'unit',
      title: 'Unit',
      type: 'reference',
      to: [{ type: 'unit' }],
    },
    {
      name: 'items',
      title: 'Inventory Items',
      type: 'array',
      of: [
        {
          name: 'inventoryItem',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: Rule): Rule => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: false,
              },
              validation: (Rule: Rule): Rule => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'unit.title',
    },
  },
}
