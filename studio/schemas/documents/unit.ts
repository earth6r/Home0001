import type { PreviewValue } from '@sanity/types'
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
  groups: [
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Header Text',
      name: 'headerText',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'hideMenuButton',
      title: 'Hide Menu Button',
      description: 'Hide waitlist or tour button in header',
      type: 'boolean',
    },
    {
      name: 'showTourLink',
      title: 'Show Tour Link',
      description: 'Show the tour link in the header instead of waitlist',
      type: 'boolean',
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
      title: 'Calendar Link',
      name: 'calendarLink',
      type: 'url',
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
      name: 'hidePrice',
      title: 'Hide Price',
      type: 'boolean',
      description: 'Hide the price except on dossier page',
    },
    {
      name: 'cryptoPrice',
      title: 'Crypto Price',
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
      of: [{ type: 'media' }],
    },
    {
      name: 'photoLimit',
      title: 'Unit List Photo Limit',
      type: 'number',
      description: 'Limit the number of photos shown on the property',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'richText',
    },
    {
      name: 'factSheet',
      title: 'Fact Sheet',
      type: 'table',
      options: { collapsable: true, collapsed: true },
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'richText',
      options: { collapsable: true, collapsed: true },
    },
    {
      name: 'dossierInventory',
      title: 'Dossier Inventory',
      type: 'richText',
      options: { collapsable: true, collapsed: true },
    },
    {
      name: 'unitDetails',
      title: 'Unit Details',
      type: 'richText',
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
    {
      name: 'secondUnitDetails',
      title: 'Second Unit Details',
      type: 'array',
      of: [{ type: 'accordion', title: 'Unit Details' }],
    },
    {
      name: 'closingDocuments',
      title: 'Closing Documents',
      type: 'file',
      description: 'Upload closing documents zip file here',
    },
    {
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      group: 'metadata',
      options: {
        hotspot: false,
      },
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'metadata',
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
