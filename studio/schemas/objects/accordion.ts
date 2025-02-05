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
      // validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'largeHeader',
      title: 'Large Header',
      type: 'boolean',
      description: 'Sets header to H2 size (Read More accordions only)',
    },
    {
      name: 'openOnDesktop',
      title: 'Open on desktop',
      type: 'boolean',
    },
    {
      name: 'initialText',
      title: 'Initial Text',
      type: 'richText',
      description:
        'Copy shown before accordion is expanded (Read More accordions only)',
    },
    {
      name: 'text',
      title: 'Accordion Text',
      type: 'richText',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'CTA',
    },
  ],
}
