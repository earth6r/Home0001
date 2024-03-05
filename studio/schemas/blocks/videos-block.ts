import { BiVideoPlus } from 'react-icons/bi'

export default {
  name: 'videosBlock',
  type: 'object',
  title: 'Videos Block',
  icon: BiVideoPlus,
  fields: [
    {
      name: 'videos',
      type: 'array',
      title: 'Videos',
      of: [{ type: 'video', title: 'Video' }],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Videos block' }),
  },
}
