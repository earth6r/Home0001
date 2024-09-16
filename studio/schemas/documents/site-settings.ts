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
      name: 'content',
      title: 'Global Content',
    },
    {
      name: 'menus',
      title: 'Menus',
    },
    {
      name: 'forms',
      title: 'Forms',
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
      name: 'cookiesPaneCopy',
      title: 'Cookies Pane Copy',
      type: 'richText',
      group: 'global',
    },
    {
      name: 'cookiesAccordions',
      title: 'Cookies Accordions',
      type: 'array',
      of: [{ type: 'accordion', title: 'Accordion' }],
      group: 'global',
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
      to: { type: 'menus' },
      group: 'menus',
    },
    {
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'reference',
      to: { type: 'menus' },
      group: 'menus',
    },
    {
      name: 'RDFooterMenu',
      title: 'R + D Footer Menu',
      type: 'reference',
      to: { type: 'menus' },
      group: 'menus',
    },
    {
      name: 'waitlistId',
      title: 'Waitlist Audience ID',
      type: 'string',
      group: 'forms',
    },
    {
      name: 'waitlistHeader',
      title: 'Waitlist Header',
      type: 'string',
      group: 'forms',
    },
    {
      name: 'waitlistCopy',
      title: 'Waitlist Copy',
      type: 'richText',
      group: 'forms',
    },
    {
      name: 'waitlistSuccess',
      title: 'Waitlist Success',
      type: 'richText',
      group: 'forms',
    },
    {
      name: 'inquiryId',
      title: 'Inquiry Audience ID',
      type: 'string',
      group: 'forms',
    },
    {
      name: 'inquiryCopy',
      title: 'Inquiry Copy',
      type: 'string',
      group: 'forms',
    },
    {
      name: 'inquirySuccess',
      title: 'Inquiry Success',
      type: 'string',
      group: 'forms',
    },
    {
      name: 'brokerInquiryId',
      title: 'Broker Inquiry Audience ID',
      type: 'string',
      group: 'forms',
    },
    {
      name: 'brokerInquiryCopy',
      title: 'Broker Inquiry Copy',
      type: 'richText',
      group: 'forms',
    },
    {
      name: 'brokerInquirySuccess',
      title: 'Broker Inquiry Success',
      type: 'richText',
      group: 'forms',
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
