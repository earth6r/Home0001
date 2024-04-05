import { RxDividerHorizontal } from 'react-icons/rx'

export default {
  name: 'divider',
  title: 'Divider',
  type: 'object',
  icon: RxDividerHorizontal,
  fields: [
    {
      name: 'divider',
      title: 'Divider',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Divider',
      }
    },
  },
}
