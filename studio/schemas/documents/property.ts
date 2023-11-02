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
      type: 'media',
      title: 'Property Image',
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
    {
      name: 'unitsList',
      title: 'Units',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'unit' }] }],
    },
    {
      name: 'propertyDetails',
      title: 'Property Details',
      type: 'array',
      of: [{ type: 'accordion', title: 'Property Details' }],
    },
  ],
  preview: {
    select: {
      title: 'header',
      subtitle: 'location.title',
    },
  },
}
