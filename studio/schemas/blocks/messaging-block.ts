import { BiMessage } from 'react-icons/bi'

export default {
  name: 'messagingBlock',
  type: 'object',
  title: 'Messaging Block',
  icon: BiMessage,
  fields: [
    {
      name: 'messaginBlock',
      type: 'text',
      title: 'Messaging Name',
      initialValue: false,
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Messaging block' }),
  },
}
