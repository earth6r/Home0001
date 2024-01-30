import { BiText } from 'react-icons/bi'

export default {
  name: 'richText',
  type: 'array',
  title: 'Rich Text',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Small', value: 'small' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Inventory', value: 'inventoryList' },
      ],
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
          icon: BiText,
        },
      ],
    },
  ],
}
