import { MdMeetingRoom } from 'react-icons/md'

export default {
  name: 'propertyTypesBlock',
  type: 'object',
  title: 'Property Types Block',
  icon: MdMeetingRoom,
  fields: [
    {
      name: 'header',
      type: 'string',
      title: 'Header',
    },
    {
      name: 'propertyTypes',
      type: 'array',
      title: 'Property Types',
      of: [{ type: 'reference', to: [{ type: 'propertyType' }] }],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Property types block' }),
  },
}
