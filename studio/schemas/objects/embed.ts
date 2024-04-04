import { BiCode } from 'react-icons/bi'

export default {
  name: 'embed',
  title: 'Embed',
  type: 'object',
  icon: BiCode,
  fields: [
    {
      name: 'embed',
      title: 'embed',
      type: 'text',
      description:
        'Paste the embed code here, will be wrapped with <script> tags',
    },
  ],
}
