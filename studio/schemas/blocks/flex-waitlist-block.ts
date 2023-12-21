import { LuTextCursorInput } from 'react-icons/lu'
import { newsletterFields } from './fields'

export default {
  title: 'Flex Waitlist Block',
  name: 'flexWaitlistBlock',
  icon: LuTextCursorInput,
  type: 'object',
  fields: [
    ...newsletterFields,
    {
      name: 'formPanes',
      title: 'Form Panes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Location', value: 'location' },
          { title: 'Timeline', value: 'timeline' },
          { title: 'Bedrooms', value: 'bedrooms' },
          { title: 'Price', value: 'price' },
        ],
      },
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Flex waitlist block' }),
  },
}
