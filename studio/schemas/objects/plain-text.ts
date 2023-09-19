import { GiJoint } from 'react-icons/gi'
import JoinMark from '../marks/JoinMark'

export default {
  name: 'plainText',
  type: 'array',
  title: 'Plain Text',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
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
  ],
}
