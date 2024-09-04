import type { Rule } from '@sanity/types'
import { CiGrid2V } from 'react-icons/ci'

export default {
  name: 'imagesBlock',
  type: 'object',
  title: 'Images Row Block',
  icon: CiGrid2V,
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'media' }],
      validation: (Rule: Rule): Rule => Rule.required().min(3).max(3),
      description:
        'Shows images in a row on desktop and as a vertical list on mobile',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Images row block' }),
  },
}
