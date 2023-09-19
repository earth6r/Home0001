import { IoIosImage } from 'react-icons/io'
import type { PreviewValue } from '@sanity/types'
import type { Media } from '../../../gen/sanity-schema'

interface MediaSelectProps {
  caption?: Media['caption']
  image?: string
  videoPosterUrl?: string
}

export default {
  name: 'figure',
  type: 'object',
  title: 'Figure',
  icon: IoIosImage,
  fields: [
    {
      name: 'media',
      type: 'media',
      title: 'Media',
      validation: false,
    },
  ],
  preview: {
    select: {
      caption: 'media.caption',
      image: 'media.image',
    },
    prepare({ image }: MediaSelectProps): PreviewValue {
      let title = 'Figure'
      if (image) title += ' Image'
      return {
        title,
        media: image,
      }
    },
  },
}
