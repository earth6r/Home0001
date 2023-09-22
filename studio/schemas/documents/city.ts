import type { Rule } from '@sanity/types'
import { FaLocationDot } from 'react-icons/fa6'

export default {
  name: 'city',
  title: 'City',
  type: 'document',
  icon: FaLocationDot,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
      validation: (Rule: Rule): Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
