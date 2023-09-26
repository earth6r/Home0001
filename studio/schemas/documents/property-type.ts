import { IoBedSharp } from 'react-icons/io5'

export default {
  name: 'propertyType',
  title: 'Property Type',
  type: 'document',
  icon: IoBedSharp,
  fields: [
    {
      title: 'Type Title',
      name: 'typeTitle',
      type: 'string',
    },
    {
      title: 'Type Value',
      name: 'typeValue',
      type: 'string',
    },
    {
      title: 'Related Cities',
      name: 'relatedCities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
    },
  ],
}
