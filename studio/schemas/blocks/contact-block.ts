import { LuMessageCircle } from 'react-icons/lu'
import { contactFields } from './fields'

export default {
  title: 'Contact Block',
  name: 'contactBlock',
  icon: LuMessageCircle,
  type: 'object',
  fields: [...contactFields],
  preview: {
    prepare: (): { title: string } => ({ title: 'Contact block' }),
  },
}
