import type { Rule } from '@sanity/types'
import { FaRegImages } from 'react-icons/fa'

export default {
  name: 'carouselBlock',
  type: 'object',
  title: 'Carousel Block',
  icon: FaRegImages,
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'media' }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Carousel block' }),
  },
}
