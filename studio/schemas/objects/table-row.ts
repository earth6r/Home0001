import safeGet from 'lodash/get'
import type { Rule } from '@sanity/types'

export default {
  title: 'Table Row',
  name: 'tableRow',
  type: 'object',
  fields: [
    {
      name: 'cells',
      type: 'array',
      title: 'Cells',
      of: [
        {
          title: 'cell',
          name: 'cell',
          type: 'string',
          validation: (Rule: Rule) => Rule.min(1),
        },
      ],
    },
  ],
  preview: {
    select: {
      cells: 'cells',
    },
    prepare(selection: any) {
      const { cells } = selection

      if (!cells.length) {
        return {
          title: '<Empty>',
        }
      }
      const txts = []
      for (let idx = 0; idx < cells.length && idx < 5; idx++) {
        const cell = cells[idx]
        const txt = safeGet(cell, 'desktopText.nn') || ' '
        txts.push(txt)
      }
      return {
        title: txts.join(', '),
        subtitle: `size: ${cells.length}`,
      }
    },
  },
}
