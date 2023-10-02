import { GrTooltip } from 'react-icons/gr'

export default {
  name: 'richText',
  type: 'array',
  title: 'Rich Text',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'link',
          },
          {
            name: 'anchor',
            title: 'Anchor',
            type: 'object',
            icon: () => '#',
            fields: [
              {
                name: 'anchorId',
                title: 'Anchor ID',
                type: 'string',
              },
            ],
          },
        ],
      },
      of: [
        {
          title: 'Tooltip',
          name: 'tooltip',
          type: 'tooltip',
          icon: GrTooltip,
        },
      ],
    },
  ],
}
