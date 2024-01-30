import { CiViewTable } from 'react-icons/ci'
import type { Rule } from '@sanity/types'

export default {
  name: 'inventorySection',
  title: 'Inventory Section',
  type: 'object',
  icon: CiViewTable,
  fields: [
    {
      name: 'text',
      title: 'Menu Item Text',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Menu Item URL',
      type: 'link',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
  ],
}
