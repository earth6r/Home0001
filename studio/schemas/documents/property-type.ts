import { IoBedSharp } from 'react-icons/io5'
import { Rule } from 'sanity'

export default {
  name: 'propertyType',
  title: 'Property Type',
  type: 'document',
  icon: IoBedSharp,
  groups: [
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fields: [
    {
      title: 'Type Title',
      name: 'typeTitle',
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
        source: 'typeTitle',
        maxLength: 96,
      },
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
      validation: (Rule: Rule): Rule => Rule.required(),
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
      name: 'photographs',
      title: 'Photographs',
      type: 'array',
      of: [{ type: 'media' }],
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'richText',
    },
    {
      name: 'moreInfo',
      title: 'More Info',
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
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
      title: 'typeTitle',
      subtitle: 'property.title',
    },
  },
}
