import type { Rule } from '@sanity/types'
import { AiOutlinePlusSquare } from 'react-icons/ai'

export default {
  name: 'accordionBlock',
  type: 'object',
  title: 'Accordion Block',
  icon: AiOutlinePlusSquare,
  fields: [
    {
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description:
        'Number of columns to display on larger screens. Defaults to 3 if blank',
      initialValue: 3,
    },
    {
      name: 'accordions',
      title: 'Accordions',
      type: 'array',
      of: [{ type: 'accordion', title: 'Accordion' }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
    {
      name: 'readMore',
      title: 'Read More',
      type: 'boolean',
      description: 'Set to true to hide plus and minus and show read more copy',
    },
    {
      name: 'bottomBorder',
      type: 'boolean',
      title: 'Black Bottom Border',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Accordion block' }),
  },
}
