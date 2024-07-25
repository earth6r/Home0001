import { RxDividerHorizontal } from 'react-icons/rx'

export default {
  title: 'Divider Block',
  name: 'dividerBlock',
  icon: RxDividerHorizontal,
  type: 'object',
  fields: [
    {
      name: 'divider',
      title: 'Divider',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Divider block' }),
  },
}
