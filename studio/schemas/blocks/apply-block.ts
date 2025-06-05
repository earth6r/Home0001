import { BiWorld } from 'react-icons/bi'

export default {
  name: 'applyBlock',
  type: 'object',
  title: 'Apply Block',
  icon: BiWorld,
  fields: [
    {
      name: 'header',
      type: 'richText',
      title: 'Header',
    },
    {
      name: 'joiningFee',
      type: 'number',
      title: 'Joining Fee',
      description: 'Fee to join the community in $USD',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Apply block' }),
  },
}
