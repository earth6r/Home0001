import { BiText } from 'react-icons/bi'
import { textField } from './fields'

export default {
  name: 'textBlock',
  type: 'object',
  title: 'Text Block',
  icon: BiText,
  fields: [
    textField,
    {
      name: 'yellowBackground',
      type: 'boolean',
      title: 'Yellow Background',
      description:
        'This will give the text block a full-width yellow background',
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Text block' }),
  },
}
