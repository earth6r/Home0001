import type { Rule } from '@sanity/types'
import { string } from 'prop-types'
import { MdHomeWork } from 'react-icons/md'
import richText from 'schemas/objects/rich-text'

export default {
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: MdHomeWork,
  groups: [
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'longTitle',
      title: 'Long Title',
      type: 'string',
      description: 'Used on the Cities Block property link',
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
      name: 'headerText',
      type: 'string',
      title: 'Header Text',
      description: 'Used for page breadcrumb',
    },
    {
      name: 'header',
      type: 'richText',
      title: 'Header',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'image',
      type: 'media',
      title: 'Property Image',
    },
    {
      type: 'coordinates',
      name: 'coordinates',
    },
    // {
    //   name: 'description',
    //   type: 'richText',
    //   title: 'Description',
    // },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'waitlistLinkText',
      title: 'Waitlist Link Text',
      type: 'string',
    },
    {
      title: 'Location',
      name: 'location',
      type: 'reference',
      to: [{ type: 'city' }],
      validation: (Rule: Rule): Rule => Rule.required(),
      options: {
        getOptionLabel: (reference: any) => `${reference.title}`,
      },
    },
    {
      name: 'availableText',
      title: 'Available Text',
      type: 'string',
    },
    {
      name: 'unitsList',
      title: 'Units',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'unit' }] }],
    },
    // {
    //   name: 'propertyDetails',
    //   title: 'Property Details',
    //   type: 'array',
    //   of: [{ type: 'accordion', title: 'Property Details' }],
    // },
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
      title: 'header',
      subtitle: 'location.title',
    },
  },
}
