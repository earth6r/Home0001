import type { Rule } from '@sanity/types'
import { MdMeetingRoom } from 'react-icons/md'

export default {
  name: 'unit',
  title: 'unit',
  type: 'document',
  icon: MdMeetingRoom,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Available',
      name: 'available',
      type: 'boolean',
      initialValue: true,
    },
    {
      title: 'Property',
      name: 'property',
      type: 'reference',
      to: [{ type: 'property' }],
      options: {
        getOptionLabel: (reference: any) => `${reference.title}`,
      },
    },
    {
      title: 'Property Type',
      name: 'propertyType',
      type: 'reference',
      to: [{ type: 'propertyType' }],
      weak: true,
      disableNew: false,
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'area',
      title: 'Area',
      type: 'string',
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'richText',
    },
    {
      name: 'photographs',
      title: 'Photographs',
      type: 'array',
      of: [
        {
          type: 'media',
        },
      ],
    },
    {
      name: 'details',
      title: 'Details',
      type: 'richText',
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'inventoryModule',
    },
    {
      name: 'layoutImages',
      title: 'Layout Images',
      type: 'array',
      of: [
        {
          type: 'media',
        },
      ],
    },
    {
      name: 'moreInfo',
      title: 'More Info',
      type: 'richText',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'property.header',
    },
  },
}
