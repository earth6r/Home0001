import { BiWorld } from 'react-icons/bi'

export default {
  name: 'web3Block',
  type: 'object',
  title: 'Web3 Block',
  icon: BiWorld,
  fields: [
    {
      name: 'header',
      type: 'richText',
      title: 'Header',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Web3 block' }),
  },
}
