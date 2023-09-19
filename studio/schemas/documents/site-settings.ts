import { GrSettingsOption } from 'react-icons/gr'
import type { Rule } from '@sanity/types'

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: GrSettingsOption,
  groups: [
    {
      name: 'global',
      title: 'Global Settings',
      default: true,
    },
    {
      name: 'header',
      title: 'Header Settings',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'global',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'global',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Site Image',
      type: 'image',
      group: 'global',
    },
    {
      name: 'siteKeywords',
      type: 'string',
      description: 'Phrase that you want your site to rank for.',
      title: 'Keyphrase',
      group: 'global',
    },
    {
      name: 'mainMenu',
      title: 'Main Menu',
      type: 'reference',
      description: 'Select menu for main navigation',
      to: { type: 'menu' },
      group: 'header',
    },
  ],
  // eslint-disable-next-line camelcase
  // __experimental_actions: ['update', 'publish'],
}
