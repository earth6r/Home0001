import type { Rule } from '@sanity/types'
import { AiOutlinePlusSquare } from 'react-icons/ai'

export default {
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  icon: AiOutlinePlusSquare,
  fields: [
    {
      name: 'header',
      title: 'Accordion Header',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'text',
      title: 'Accordion Text',
      type: 'richText',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
  ],
}
