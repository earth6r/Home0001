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
      title: 'LA Embed Code',
      name: 'laEmbedCode',
      type: 'string',
      initialValue: 'echopark',
      description: 'Value used in https://meetings.hubspot.com/ url',
    },
    {
      title: 'NY Embed Code',
      name: 'nyEmbedCode',
      type: 'string',
      initialValue: 'home-0001',
      description: 'Value used in https://meetings.hubspot.com/ url',
    },
    {
      title: 'Phone Embed Code',
      name: 'phoneEmbedCode',
      type: 'string',
      initialValue: 'talin-_',
      description: 'Value used in https://meetings.hubspot.com/ url',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Calendar block' }),
  },
}
