export default {
  name: 'inventoryModule',
  title: 'Inventory Module',
  type: 'object',
  fields: [
    {
      name: 'headers',
      title: 'Headers',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'rows',
      title: 'Rows',
      type: 'table',
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
  preview: {
    select: {
      title: 'headers',
    },
  },
}
