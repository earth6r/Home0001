import { LuTextCursorInput } from 'react-icons/lu'
import { newsletterFields } from './fields'

export default {
  title: 'Waitlist Block',
  name: 'waitlistBlock',
  icon: LuTextCursorInput,
  type: 'object',
  fields: [
    ...newsletterFields,
    {
      name: 'formType',
      type: 'string',
      title: 'Form Type',
      layout: 'radio',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Unit', value: 'unit' },
        ],
      },
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Waitlist block' }),
  },
}
