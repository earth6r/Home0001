import { LuTextCursorInput } from 'react-icons/lu'
import { newsletterFields } from './fields'

export default {
  title: 'Waitlist Block',
  name: 'waitlistBlock',
  icon: LuTextCursorInput,
  type: 'object',
  fields: [...newsletterFields],
  preview: {
    prepare: (): { title: string } => ({ title: 'Waitlist block' }),
  },
}
