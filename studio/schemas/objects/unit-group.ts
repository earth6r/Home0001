import { GrNavigate } from 'react-icons/gr'
import type { Rule } from '@sanity/types'

export default {
  name: 'unitGroup',
  title: 'Unit Group',
  type: 'object',
  icon: GrNavigate,
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      title: 'Property',
      name: 'property',
      type: 'reference',
      to: [{ type: 'property' }],
      options: {
        getOptionLabel: (reference: any) => `${reference.title}`,
      },
    },
    {
      name: 'units',
      title: 'Units',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'unit' }] }],
      validation: (Rule: Rule): Rule => Rule.required(),
    },
  ],
}
