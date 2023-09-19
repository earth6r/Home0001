import { GiJoint } from 'react-icons/gi'
import { GrTextAlignCenter, GrImage } from 'react-icons/gr'
import JoinMark from '../marks/JoinMark'
import CenterMark from '../marks/CenterMark'

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
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        {
          title: 'Center',
          value: 'center',
          blockEditor: {
            icon: GrTextAlignCenter,
            render: CenterMark,
          },
        },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Join',
            value: 'join',
            blockEditor: {
              icon: GiJoint,
              render: JoinMark,
            },
          },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'link',
          },
        ],
      },
    },
    {
      title: 'Media',
      name: 'media',
      type: 'media',
      blockEditor: {
        icon: GrImage,
      },
    },
  ],
}
