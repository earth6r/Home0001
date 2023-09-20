import type { Rule } from '@sanity/types'
import { IoIosImages } from 'react-icons/io'
import { topFields } from './fields'
import type { FiguresBlock } from '../../gen/sanity-schema'

export default {
  name: 'figuresBlock',
  type: 'object',
  title: 'Figures Block',
  icon: IoIosImages,
  fields: [
    ...topFields,
    {
      name: 'figures',
      title: 'Figures',
      type: 'array',
      of: [{ type: 'figure', title: 'Figure' }],
      validation: (Rule: Rule): Rule => Rule.required().min(1),
    },
    {
      title: 'Column Count',
      name: 'columns',
      type: 'number',
      initialValue: 1,
      validation: (Rule: Rule): Rule => Rule.required().min(1).max(3),
    },
    {
      title: 'Carousel',
      name: 'carousel',
      type: 'boolean',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Figures block' }),
  },
  validation: (Rule: Rule): Rule =>
    Rule.custom<FiguresBlock>(block => {
      if (block?.figures?.length === 1 && block.carousel === true) {
        return 'Must have more than 1 figure to enable carousel'
      }
      return true
    }),
}
