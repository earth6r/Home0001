import { BiText } from 'react-icons/bi'

export default {
  name: 'tooltip',
  type: 'object',
  title: 'Tooltip',
  icon: BiText,
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
