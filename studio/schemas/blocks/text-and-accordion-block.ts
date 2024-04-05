import { AiOutlinePlusSquare } from 'react-icons/ai'

export default {
  name: 'textAndAccordionBlock',
  type: 'object',
  title: 'Text And Accordion Block',
  icon: AiOutlinePlusSquare,
  fields: [
    {
      name: 'scrollHeader',
      type: 'richText',
      title: 'Scroll Header',
    },
    {
      name: 'header',
      type: 'richText',
      title: 'Header',
    },
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [
        {
          type: 'object',
          name: 'item',
          fields: [
            {
              name: 'copy',
              title: 'Copy',
              type: 'richText',
            },
            {
              name: 'accordions',
              title: 'Accordions',
              type: 'array',
              of: [{ type: 'accordion', title: 'Accordion' }],
            },
          ],
          preview: {
            prepare: () => ({
              title: `Item`,
            }),
          },
        },
      ],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Text and Accordions' }),
  },
}
