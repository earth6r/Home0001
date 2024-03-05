import { BiText } from 'react-icons/bi'
import { textField } from './fields'

export default {
  name: 'textBlock',
  type: 'object',
  title: 'Text Block',
  icon: BiText,
  fields: [
    {
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description:
        'Number of columns to display on larger screens. Defaults to 3 if blank',
      initialValue: 3,
    },
    textField,
    {
      name: 'yellowBackground',
      type: 'boolean',
      title: 'Yellow Background',
      description:
        'This will give the text block a full-width yellow background',
    },
    {
      name: 'bottomBorder',
      type: 'boolean',
      title: 'Black Bottom Border',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Text block' }),
  },
}
