import { GrVideo } from 'react-icons/gr'
import type { PreviewValue } from '@sanity/types'

interface MediaSelectProps {
  videoPosterUrl?: string
}

export default {
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: GrVideo,
  fields: [
    {
      name: 'files',
      type: 'array',
      of: [{ type: 'file', accept: 'video/*' }],
      description: 'Video files beginning with WebM',
    },
    {
      name: 'poster',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image that displays before the video is loaded',
    },
    {
      name: 'loop',
      type: 'boolean',
    },
    {
      name: 'autoplay',
      type: 'boolean',
      description: 'Video will be muted if autoplay is enabled',
    },
  ],
  preview: {
    select: {
      videoPosterUrl: 'video.poster.asset.url',
    },
    prepare({ videoPosterUrl }: MediaSelectProps): PreviewValue {
      const title = 'Video'
      return {
        title,
        media: videoPosterUrl,
      }
    },
  },
  options: {
    collapsible: true,
  },
}
