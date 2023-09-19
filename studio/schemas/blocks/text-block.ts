import { BiText } from 'react-icons/bi'
import { textField } from './fields'

export default {
  name: 'textBlock',
  type: 'object',
  title: 'Text Block',
  icon: BiText,
  fields: [textField],
  preview: {
    prepare: (): { title: string } => ({ title: 'Text block' }),
  },
}
