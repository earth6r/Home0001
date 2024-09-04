import type { Rule } from '@sanity/types'
import { FaSearchPlus } from 'react-icons/fa'

export default {
  name: 'accordionRowBlock',
  type: 'object',
  title: 'Accordion Row Block',
  icon: FaSearchPlus,
  fields: [
    {
      name: 'header',
      type: 'richText',
      title: 'Header',
    },
    {
      name: 'accordions',
      title: 'Accordions',
      type: 'array',
      of: [{ type: 'accordion', title: 'Accordion' }],
      validation: (Rule: Rule): Rule => Rule.required().min(2).max(2),
    },
    {
      name: 'bottomBorder',
      type: 'boolean',
      title: 'Black Bottom Border',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Accordion row block' }),
  },
}
