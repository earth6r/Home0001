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
    {
      name: 'minWidth',
      title: 'Minimum Width',
      type: 'number',
    },
    {
      name: 'animate',
      title: 'Animate',
      type: 'boolean',
    },
    {
      name: 'columns',
      title: 'Columns',
      type: 'number',
      validation: (Rule: Rule): Rule => Rule.max(2),
      description:
        'Number of columns to display the fullbleed block in, setting to 2 will split the screen in half on desktop',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Full Bleed block' }),
  },
}
