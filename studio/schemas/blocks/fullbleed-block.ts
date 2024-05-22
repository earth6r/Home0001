import type { Rule } from '@sanity/types'
import { FaImage } from 'react-icons/fa'

export default {
  title: 'Full Bleed Block',
  name: 'fullbleedBlock',
  icon: FaImage,
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'media',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Full Bleed block' }),
  },
}
