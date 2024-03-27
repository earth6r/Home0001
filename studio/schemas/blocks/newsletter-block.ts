import { LuTextCursorInput } from 'react-icons/lu'
import { newsletterFields } from './fields'

export default {
  title: 'Newsletter Block',
  name: 'newsletterBlock',
  icon: LuTextCursorInput,
  type: 'object',
  fields: [
    ...newsletterFields,
    {
      name: 'hideName',
      type: 'boolean',
      title: 'Hide Name',
      initialValue: false,
    },
    {
      name: 'brandStyle',
      type: 'boolean',
      title: 'Brand Input Style',
      initialValue: false,
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Newsletter block' }),
  },
}
