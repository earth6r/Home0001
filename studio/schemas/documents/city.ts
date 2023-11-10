import type { Rule } from '@sanity/types'
import { FaLocationDot } from 'react-icons/fa6'

export default {
  name: 'city',
  title: 'City',
  type: 'document',
  icon: FaLocationDot,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    // {
    //   title: 'Properties',
    //   name: 'properties',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'property' }] }],
    //   validation: (Rule: Rule): Rule => Rule.max(1),
    //   options: {
    //     getOptionLabel: (reference: any) => `${reference.title}`,
    //   },
    // },
    {
      name: 'propertyLink',
      type: 'link',
      title: 'Property Link',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
