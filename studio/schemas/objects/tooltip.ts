import { BsChatSquareDots } from 'react-icons/bs'

export default {
  name: 'tooltip',
  type: 'object',
  title: 'Tooltip',
  icon: BsChatSquareDots,
  fields: [
    {
      title: 'Linked Copy',
      name: 'linkedCopy',
      type: 'string',
    },
    {
      title: 'Tooltip Content',
      name: 'tooltipContent',
      type: 'plainText',
    },
  ],
  preview: {
    select: {
      title: 'linkedCopy',
    },
  },
}
