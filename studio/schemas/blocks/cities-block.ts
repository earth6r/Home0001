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
      name: 'properties',
      type: 'array',
      title: 'Properties',
      of: [{ type: 'reference', to: [{ type: 'property' }] }],
      validation: (Rule: Rule): Rule => Rule.max(2),
    },
    {
      name: 'citiesList',
      title: 'Cities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
    {
      name: 'citiesPosition',
      title: 'Cities Position',
      type: 'number',
    },
    {
      name: 'howItWorksPosition',
      title: 'How It Works Position',
      type: 'number',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Cities block' }),
  },
}
