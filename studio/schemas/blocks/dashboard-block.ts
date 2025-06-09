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
    {
      name: 'dashboardMenu',
      title: 'Dashboard Menu',
      type: 'reference',
      description: 'Select menu for sidebar navigation',
      to: { type: 'menus' },
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Dashboard block' }),
  },
}
