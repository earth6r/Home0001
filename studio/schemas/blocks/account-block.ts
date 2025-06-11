import { MdPerson } from 'react-icons/md'

export default {
  name: 'accountBlock',
  type: 'object',
  title: 'Account Block',
  icon: MdPerson,
  fields: [
    {
      name: 'content',
      type: 'richText',
      title: 'Content',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Account block' }),
  },
}
