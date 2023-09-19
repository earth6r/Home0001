import { GrNavigate } from 'react-icons/gr'
import type { Rule } from '@sanity/types'

export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: GrNavigate,
  fields: [
    {
      name: 'text',
      title: 'Menu Item Text',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Menu Item URL',
      type: 'link',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
  ],
}
