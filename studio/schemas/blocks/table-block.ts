import { CiViewTable } from 'react-icons/ci'

export default {
  name: 'tableBlock',
  type: 'object',
  title: 'Table Block',
  icon: CiViewTable,
  fields: [
    {
      name: 'table',
      title: 'Table',
      type: 'array',
      of: [{ type: 'contentRow', title: 'Table Row' }],
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Table block' }),
  },
}
