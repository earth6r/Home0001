import { FaLocationDot } from 'react-icons/fa6'

export default {
  name: 'propertiesBlock',
  type: 'object',
  title: 'Properties Block',
  icon: FaLocationDot,
  fields: [
    {
      name: 'header',
      type: 'string',
      title: 'Header',
    },
    {
      name: 'cities',
      type: 'array',
      title: 'Cities',
      of: [
        {
          type: 'object',
          title: 'City',
          fields: [
            {
              type: 'string',
              name: 'header',
              title: 'Header',
            },
            {
              name: 'properties',
              type: 'array',
              title: 'Properties',
              of: [{ type: 'reference', to: [{ type: 'property' }] }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Properties block' }),
  },
}
