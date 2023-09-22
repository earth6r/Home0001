import type { Rule } from '@sanity/types'
import { FaLocationDot } from 'react-icons/fa6'

export default {
  name: 'citiesBlock',
  type: 'object',
  title: 'Cities Block',
  icon: FaLocationDot,
  fields: [
    {
      name: 'citiesList',
      title: 'Cities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Cities block' }),
  },
}
