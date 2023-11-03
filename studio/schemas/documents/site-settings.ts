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
      title: 'Meta Settings',
      default: true,
    },
    {
      name: 'header',
      title: 'Header Settings',
    },
    {
      name: 'content',
      title: 'Global Content',
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
      to: { type: 'menus' },
      group: 'header',
    },
    {
      name: 'waitlistId',
      title: 'Waitlist Audience ID',
      type: 'string',
      group: 'header',
    },
    {
      name: 'waitlistHeader',
      title: 'Waitlist Header',
      type: 'string',
      group: 'header',
    },
    {
      name: 'waitlistCopy',
      title: 'Waitlist Copy',
      type: 'richText',
      group: 'header',
    },
    {
      name: 'waitlistUnitSelection',
      title: 'Waitlist Unit Selection',
      type: 'richText',
      group: 'header',
    },
    {
      name: 'waitlistSuccess',
      title: 'Waitlist Success',
      type: 'richText',
      group: 'header',
    },
    {
      name: 'waitlistUnits',
      title: 'Waitlist Units',
      type: 'array',
      of: [{ type: 'unitGroup' }],
      group: 'header',
    },
    {
      name: 'howItWorksContent',
      title: 'How It Works Accordions',
      description: 'Currently shows in how to modal on unit',
      type: 'array',
      of: [{ type: 'accordion', title: 'Accordion' }],
      group: 'content',
    },
  ],
  // eslint-disable-next-line camelcase
  // __experimental_actions: ['update', 'publish'],
}
