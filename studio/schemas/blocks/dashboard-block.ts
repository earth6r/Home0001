import { BiCode } from 'react-icons/bi'

export default {
  name: 'dashboardBlock',
  type: 'object',
  title: 'Dashboard Block',
  icon: BiCode,
  fields: [
    {
      name: 'loggedInHeader',
      type: 'richText',
      title: 'Logged In Header',
    },
    {
      name: 'dashboardCopy',
      type: 'richText',
      title: 'Dashboard Copy',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Dashboard block' }),
  },
}
