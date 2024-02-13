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
      title: 'Embed Code',
      name: 'embedCode',
      type: 'string',
      initialValue: 'echopark',
      description: 'Value used in https://meetings.hubspot.com/ url',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Calendar block' }),
  },
}
