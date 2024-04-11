import { GrSwitch } from 'react-icons/gr'

export default {
  name: 'cookiesToggle',
  title: 'Cookies Toggle',
  type: 'object',
  icon: GrSwitch,
  fields: [
    {
      title: 'Linked Copy',
      name: 'linkedCopy',
      type: 'string',
    },
    {
      name: 'cookiesToggle',
      title: 'Cookies Toggle',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Cookies Toggle',
      }
    },
  },
}
