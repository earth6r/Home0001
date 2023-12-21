import type { Rule } from '@sanity/types'
import { MdHomeWork } from 'react-icons/md'

export default {
  name: 'propertyBlock',
  type: 'object',
  title: 'Property Block',
  icon: MdHomeWork,
  fields: [
    {
      name: 'propertyRef',
      title: 'Property Reference',
      type: 'reference',
      to: [{ type: 'property' }],
      validation: (Rule: Rule): Rule => Rule.required(),
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Property block' }),
  },
}
