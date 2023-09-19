import { IoIosImage } from 'react-icons/io'
import type { PreviewValue } from '@sanity/types'
import type { Media } from '../../../gen/sanity-schema'

interface MediaSelectProps {
  caption?: Media['caption']
  image?: string
  videoPosterUrl?: string
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
      options: {
        hotspot: true,
      },
    },
    {
      name: 'caption',
      type: 'richText',
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      imageUrl: 'image',
      videoPosterUrl: 'video.poster.asset.url',
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
