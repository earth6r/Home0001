import { IoIosImage } from 'react-icons/io'
import type { PreviewValue } from '@sanity/types'
import type { Media } from '@gen/sanity-schema'

interface MediaSelectProps {
  caption?: Media['caption']
  image?: string
}

export default {
  name: 'textAndImage',
  type: 'object',
  title: 'Text and Image',
  icon: IoIosImage,
  fields: [
    {
      name: 'aspect',
      type: 'string',
      title: 'Aspect',
      options: {
        list: [
          { title: 'Short', value: 'short' },
          { title: 'Square', value: 'square' },
          { title: 'Tall', value: 'tall' },
        ],
      },
    },
    {
      name: 'media',
      type: 'media',
      title: 'Media',
      validation: false,
    },
    {
      name: 'text',
      type: 'richText',
      title: 'Text',
    },
  ],
  preview: {
    select: {
      image: 'media.image',
    },
    prepare({ image }: MediaSelectProps): PreviewValue {
      let title = 'Animating content'
      return {
        title,
        media: image,
      }
    },
  },
}
