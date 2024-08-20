import type { Rule } from '@sanity/types'
import { FaCalendarAlt } from 'react-icons/fa'

export default {
  title: 'Calendar Block',
  name: 'calendarBlock',
  icon: FaCalendarAlt,
  type: 'object',
  fields: [
    {
      title: 'Header',
      name: 'header',
      type: 'richText',
    },
    {
      title: 'Calendar Type',
      name: 'calendarType',
      type: 'string',
      description: 'Add the type of calendar',
      initialValue: 'phone',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Phone', value: 'phone' },
          { title: 'Tour', value: 'tour' },
        ],
      },
    },
    {
      title: 'email',
      name: 'email',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      title: 'Booking Notice',
      name: 'notice',
      type: 'string',
      description: 'Add the number of days to book out from today',
      initialValue: '2',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: '1', value: '1' },
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
          { title: '5', value: '5' },
          { title: '6', value: '6' },
          { title: '7', value: '7' },
        ],
      },
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      title: 'Start of week',
      name: 'start',
      type: 'string',
      description: 'Add the day of the week to start',
      initialValue: '1',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Mon', value: '1' },
          { title: 'Tues', value: '2' },
          { title: 'Wed', value: '3' },
          { title: 'Thurs', value: '4' },
          { title: 'Fri', value: '5' },
          { title: 'Sat', value: '6' },
        ],
      },
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      title: 'End of week',
      name: 'end',
      type: 'string',
      description: 'Add the day of the week to end',
      initialValue: '5',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Tues', value: '2' },
          { title: 'Wed', value: '3' },
          { title: 'Thurs', value: '4' },
          { title: 'Fri', value: '5' },
          { title: 'Sat', value: '6' },
          { title: 'Sun', value: '7' },
        ],
      },
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      title: 'Times',
      name: 'times',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add the times to show are possibly available to meet',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      title: 'Success Message',
      name: 'successMessage',
      type: 'richText',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Calendar block' }),
  },
}
