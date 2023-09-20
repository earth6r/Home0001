import { GrPaint } from 'react-icons/gr'
import { COLORS } from '../../../globals'
import { toTitleCase } from '../../lib/util'

const colors = Object.keys(COLORS).map(color => ({
  title: toTitleCase(color),
  value: color.toLowerCase(),
}))

export default {
  name: 'color',
  type: 'string',
  title: 'Color',
  icon: GrPaint,
  options: {
    list: colors,
  },
}
