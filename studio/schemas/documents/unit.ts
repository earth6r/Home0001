import type { PreviewValue, Rule } from '@sanity/types'
import { MdMeetingRoom } from 'react-icons/md'

interface PreviewProps {
  title?: string
  propertyType?: string
  propertyHeader?: string
}

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
      name: 'headlineImage',
      title: 'Headline Image',
      type: 'media',
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
    // {
    //   name: 'inventory',
    //   title: 'Inventory',
    //   type: 'inventoryModule',
    // },
    {
      name: 'factSheet',
      title: 'Fact Sheet',
      type: 'table',
      options: { collapsable: true, collapsed: true },
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
      name: 'reserveFormCopy',
      title: 'Reservation Form Info',
      type: 'richText',
    },
    {
      name: 'confirmationCopy',
      title: 'Form Confirmation Message',
      type: 'richText',
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
      propertyType: 'propertyType.typeTitle',
      propertyHeader: 'property.location.title',
    },
    prepare({
      title,
      propertyType,
      propertyHeader,
    }: PreviewProps): PreviewValue {
      const preparedTitle = propertyType ? `${title} – ${propertyType}` : title
      return {
        title: preparedTitle,
        subtitle: propertyHeader,
      }
    },
  },
}
