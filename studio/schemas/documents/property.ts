import type { Rule } from '@sanity/types'
import { MdHomeWork } from 'react-icons/md'

export default {
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: MdHomeWork,
  fields: [
    {
      name: 'header',
      type: 'richText',
      title: 'Header',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      type: 'coordinates',
      name: 'coordinates',
    },
    {
      name: 'description',
      type: 'richText',
      title: 'Description',
    },
    {
      title: 'Location',
      name: 'location',
      type: 'reference',
      to: [{ type: 'city' }],
      validation: (Rule: Rule): Rule => Rule.required(),
      options: {
        getOptionLabel: (reference: any) => `${reference.title}`,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'city.title',
    },
  },
}
