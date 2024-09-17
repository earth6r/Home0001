import { MdInventory2 } from 'react-icons/md'

export default {
  name: 'inventoryToggle',
  title: 'Inventory Toggle',
  type: 'object',
  icon: MdInventory2,
  fields: [
    {
      title: 'Linked Copy',
      name: 'linkedCopy',
      type: 'string',
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'reference',
      to: [{ type: 'inventory' }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Inventory Toggle',
      }
    },
  },
}
