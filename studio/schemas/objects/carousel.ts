import type { Rule } from '@sanity/types'
import { BiCarousel } from 'react-icons/bi'

export default {
  name: 'carousel',
  title: 'Carousel',
  type: 'object',
  icon: BiCarousel,
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'media' }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
  ],
}
