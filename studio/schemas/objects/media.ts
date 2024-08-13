import { IoIosImage } from 'react-icons/io'
import type { PreviewValue } from '@sanity/types'
import type { Media } from '@gen/sanity-schema'
import type { Rule } from '@sanity/types'
import { toPlainText } from '@portabletext/react'

interface MediaSelectProps {
  alt?: Media['alt']
  image?: string
}

const MediaObject = {
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: IoIosImage,
  fields: [
    {
      name: 'image',
      type: 'image',
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'video',
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
  ],
  preview: {
    select: {
      alt: 'alt',
      image: 'image',
    },
    prepare({ alt, image }: MediaSelectProps): PreviewValue {
      let title = 'Media'
      if (image) title = 'Image'
      return {
        title: alt || 'Media',
        subtitle: alt ? 'Media' : '',
        media: image,
      }
    },
  },
}

export default MediaObject
