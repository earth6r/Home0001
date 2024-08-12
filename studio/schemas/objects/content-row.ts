import type { Rule } from '@sanity/types'
import { LuRectangleHorizontal } from 'react-icons/lu'

export default {
  name: 'contentRow',
  type: 'object',
  title: 'Table Row',
  icon: LuRectangleHorizontal,
  fields: [
    {
      name: 'cells',
      title: 'Cells',
      type: 'object',
      validation: (Rule: Rule): Rule => Rule.required(),
      fields: [
        {
          name: 'header',
          title: 'Header',
          type: 'string',
          validation: (Rule: Rule): Rule => Rule.required(),
        },
        {
          name: 'content',
          title: 'Content',
          type: 'richText',
          validation: (Rule: Rule): Rule => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'cells.header',
    },
    prepare({ title }: { title: string }): { title: string } {
      return {
        title: title,
      }
    },
  },
}
