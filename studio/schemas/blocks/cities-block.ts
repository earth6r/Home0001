import type { Rule } from '@sanity/types'
import { FaLocationDot } from 'react-icons/fa6'

export default {
  name: 'citiesBlock',
  type: 'object',
  title: 'Cities Block',
  icon: FaLocationDot,
  fields: [
    {
      name: 'headers',
      title: 'Headers',
      type: 'array',
      of: [{ type: 'string', name: 'header' }],
    },
    {
      name: 'citiesList',
      title: 'Cities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
    {
      name: 'howItWorksContent',
      title: 'How It Works Content',
      type: 'array',
      of: [{ type: 'accordion', title: 'Accordion' }],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Cities block' }),
  },
}
