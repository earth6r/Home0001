import type { Rule } from '@sanity/types'
import { BiText } from 'react-icons/bi'
import { textField } from './fields'

export default {
  name: 'textBlock',
  type: 'object',
  title: 'Text Block',
  icon: BiText,
  fields: [
    {
      name: 'anchor',
      title: 'Anchor',
      type: 'string',
      description: 'Add an anchor tag to this text block (ie ab-fab)',
      validation: (Rule: Rule) =>
        Rule.custom<string>(input => {
          if (typeof input !== 'string') return true
          if (input.includes('#')) return 'Do not include #'
          return true
        }),
    },
    {
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description:
        'Number of columns to display on larger screens. Defaults to 3 if blank',
      initialValue: 3,
    },
    {
      name: 'stickyHeader',
      type: 'boolean',
      title: 'Sticky Header',
      description:
        'This will make the header sticky on scroll, note requires a header to be set and number of columns set to 2',
    },
    {
      name: 'header',
      type: 'richText',
      title: 'Sticky Header Content',
      description: 'Content for the sticky header',
    },
    textField,
    {
      title: 'Accordion',
      name: 'accordion',
      type: 'accordion',
    },
    {
      name: 'yellowBackground',
      type: 'boolean',
      title: 'Yellow Background',
      description:
        'This will give the text block a full-width yellow background',
    },
    {
      name: 'bottomBorder',
      type: 'boolean',
      title: 'Black Bottom Border',
    },
    {
      name: 'topBorder',
      type: 'boolean',
      title: 'Black Top Border',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Text block' }),
  },
}
