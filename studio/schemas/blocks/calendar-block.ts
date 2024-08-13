import type { Rule } from '@sanity/types'
import { FaCalendarAlt } from 'react-icons/fa'

export default {
  title: 'Calendar Block',
  name: 'calendarBlock',
  icon: FaCalendarAlt,
  type: 'object',
  fields: [
    {
      title: 'Header',
      name: 'header',
      type: 'richText',
    },
    {
      title: 'email',
      name: 'email',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      title: 'Times',
      name: 'times',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add the times to show are possibly available to meet',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      title: 'Success Message',
      name: 'successMessage',
      type: 'richText',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Calendar block' }),
  },
}
