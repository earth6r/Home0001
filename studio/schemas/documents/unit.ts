import { Property } from '@gen/sanity-schema'
import type { PreviewValue } from '@sanity/types'
import { MdMeetingRoom } from 'react-icons/md'

interface PreviewProps {
  title?: string
  property?: Property
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
      title: 'Property Type',
      name: 'propertyType',
      type: 'reference',
      to: [{ type: 'propertyType' }],
      weak: true,
      disableNew: false,
    },
    {
      name: 'address',
      title: 'Address',
      type: 'richText',
    },
    {
      type: 'coordinates',
      name: 'coordinates',
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
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
    },
    {
      name: 'factSheet',
      title: 'Fact Sheet',
      type: 'table',
      options: { collapsable: true, collapsed: true },
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
      title: 'First Content Block',
      type: 'richText',
    },
    {
      name: 'inventory',
      title: 'Inventory',
      type: 'reference',
      to: [{ type: 'inventory' }],
    },
    {
      name: 'unitDetails',
      title: 'Second Content Block',
      type: 'richText',
    },
    {
      name: 'layoutImages',
      title: 'Layout Images',
      type: 'array',
      of: [{ type: 'media' }],
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
      subtitle: 'property.title',
    },
  },
}
