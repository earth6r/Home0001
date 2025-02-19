import { RxDividerHorizontal } from 'react-icons/rx'

export default {
  title: 'Divider Block',
  name: 'dividerBlock',
  icon: RxDividerHorizontal,
  type: 'object',
  fields: [
    {
      name: 'borderEnabled',
      title: 'Border Enabled',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Divider block' }),
  },
}
