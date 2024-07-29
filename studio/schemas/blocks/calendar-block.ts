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
      title: 'Success Message',
      name: 'successMessage',
      type: 'richText',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Calendar block' }),
  },
}
