import type { Rule } from '@sanity/types'
import { initial } from 'lodash'
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
      validation: (Rule: Rule): Rule => Rule.required().max(15),
      desciption:
        'Used for the Property Block verticle text, max 15 characters',
    },
    {
      name: 'longTitle',
      title: 'Long Title',
      type: 'richText',
      description: 'Used on the Properties Block property link',
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
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'headerText',
      type: 'string',
      title: 'Header Text',
      description: 'Used for page breadcrumb',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
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
      name: 'propertyImages',
      title: 'Property Images',
      type: 'array',
      of: [{ type: 'media' }],
    },
    {
      name: 'propertyTypesList',
      title: 'Property Types',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'propertyType' }] }],
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
      title: 'header',
      subtitle: 'location.title',
    },
  },
}
