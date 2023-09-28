import { LuTextCursorInput } from 'react-icons/lu'
import { newsletterFields } from './fields'

export default {
  title: 'Newsletter Block',
  name: 'newsletterBlock',
  icon: LuTextCursorInput,
  type: 'object',
  fields: [...newsletterFields],
  preview: {
    prepare: (): { title: string } => ({ title: 'Newsletter block' }),
  },
}
