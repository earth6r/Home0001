import type { Rule } from '@sanity/types'
import { IoImagesSharp } from 'react-icons/io5'

export default {
  name: 'animatingBlock',
  type: 'object',
  title: 'Animating Block',
  icon: IoImagesSharp,
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'array',
      of: [{ type: 'string', name: 'item' }],
    },
    {
      name: 'textAndImages',
      title: 'Text and Images',
      type: 'array',
      of: [{ type: 'textAndImage', title: 'Text and Image' }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
    {
      name: 'citiesList',
      title: 'Cities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
    {
      name: 'citiesPosition',
      title: 'Cities Position',
      type: 'number',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'featuredList',
      title: 'Featured Property Types',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'propertyType' }] }],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Animating block' }),
  },
}
