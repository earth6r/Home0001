import { LuTextCursorInput } from 'react-icons/lu'
import { newsletterFields } from './fields'

export default {
  title: 'Form Block',
  name: 'formBlock',
  icon: LuTextCursorInput,
  type: 'object',
  fields: [
    ...newsletterFields,
    {
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [{ type: 'formField', title: 'Form Field' }],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Form block' }),
  },
}
