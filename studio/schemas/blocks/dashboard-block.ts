import { BiCode } from 'react-icons/bi'

export default {
  name: 'dashboardBlock',
  type: 'object',
  title: 'Dashboard Block',
  icon: BiCode,
  fields: [
    {
      name: 'applyHeader',
      type: 'richText',
      title: 'Header',
    },
    {
      name: 'joiningFee',
      type: 'number',
      title: 'Joining Fee',
      description: 'Fee to join the community in $USD',
    },
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
