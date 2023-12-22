import type { Rule } from '@sanity/types'
import { MdMeetingRoom } from 'react-icons/md'

export default {
  name: 'unitBlock',
  type: 'object',
  title: 'Unit Block',
  icon: MdMeetingRoom,
  fields: [
    {
      name: 'unitRef',
      title: 'Unit Reference',
      type: 'reference',
      to: [{ type: 'unit' }],
      validation: (Rule: Rule): Rule => Rule.required(),
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Unit block' }),
  },
}
