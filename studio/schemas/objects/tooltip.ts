import { GrTooltip } from 'react-icons/gr'

export default {
  name: 'tooltip',
  type: 'object',
  title: 'Tooltip',
  icon: GrTooltip,
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
