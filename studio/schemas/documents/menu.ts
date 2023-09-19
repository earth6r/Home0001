import { GrNavigate } from 'react-icons/gr'
import type { Rule } from '@sanity/types'

export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: GrNavigate,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [{ type: 'menuItem' }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
  ],
}
