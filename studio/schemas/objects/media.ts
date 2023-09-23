import { IoIosImage } from 'react-icons/io'
import type { PreviewValue } from '@sanity/types'
import type { Media } from '@gen/sanity-schema'
import type { Rule } from '@sanity/types'

interface MediaSelectProps {
  caption?: Media['caption']
  image?: string
}

const MediaObject = {
  name: 'media',
  title: 'Link',
  type: 'object',
  icon: IoIosImage,
  fields: [
    {
      name: 'image',
      type: 'image',
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
      validation: (Rule: Rule) =>
        Rule.error('You have to fill out the alternative text.').required(),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'caption',
      type: 'richText',
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      imageUrl: 'image',
    },
    prepare({ image }: MediaSelectProps): PreviewValue {
      let title = 'Media'
      if (image) title = 'Image'
      return {
        title,
        media: image,
      }
    },
  },
}

export default MediaObject
