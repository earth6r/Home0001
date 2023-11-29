import type { Rule } from '@sanity/types'
import { FaLocationDot } from 'react-icons/fa6'

export default {
  name: 'citiesBlock',
  type: 'object',
  title: 'Cities Block',
  icon: FaLocationDot,
  fields: [
    {
      name: 'properties',
      type: 'array',
      title: 'Properties',
      of: [{ type: 'reference', to: [{ type: 'property' }] }],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Cities block' }),
  },
}
