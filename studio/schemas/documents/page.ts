import { GrDocument } from 'react-icons/gr'
import type { Rule } from '@sanity/types'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: GrDocument,
  groups: [
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      group: 'metadata',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'metadata',
    },
  ],
}
