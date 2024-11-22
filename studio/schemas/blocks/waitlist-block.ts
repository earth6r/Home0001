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
      name: 'showConsent',
      type: 'boolean',
      title: 'Show Consent Checkbox',
    },
    {
      name: 'consentCopy',
      type: 'richText',
      title: 'Consent Copy',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Waitlist block' }),
  },
}
