import { LuTextCursorInput } from 'react-icons/lu'
import type { Rule } from '@sanity/types'

export default {
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  icon: LuTextCursorInput,
  fields: [
    {
      name: 'fieldId',
      title: 'Field ID',
      type: 'string',
      description:
        'A unique identifier for this field from Hubspot etc. (first_name, last_name, email, etc.)',
      validation: (Rule: Rule): Rule => Rule.required(),
    },
    {
      name: 'isRequired',
      title: 'Is required',
      type: 'boolean',
      description: 'Is this field required for form submission?',
    },
    {
      name: 'fieldType',
      title: 'Field Type',
      type: 'string',
      validation: (Rule: Rule): Rule => Rule.required(),
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Text Area', value: 'textArea' },
          { title: 'Email', value: 'email' },
          { title: 'Tel', value: 'tel' },
          { title: 'Select', value: 'select' },
          { title: 'Hidden', value: 'hidden' },
        ],
      },
    },
    {
      name: 'rows',
      title: 'Text Area Rows',
      type: 'number',
      // This field will not be hidden if the type is 'textArea'
      hidden: ({ parent }: any) => parent?.fieldType !== 'textArea',
    },
    {
      name: 'placeholder',
      title: 'Input Placeholder',
      type: 'string',
      // This field will be hidden if the type is 'select' or 'hidden'
      hidden: ({ parent }: any) =>
        parent?.fieldType === 'select' || parent?.fieldType === 'hidden',
    },
    {
      name: 'optionsLabel',
      title: 'Options Label',
      type: 'string',
      // This field will not be hidden if the type is 'select'
      hidden: ({ parent }: any) => parent?.fieldType !== 'select',
    },
    {
      name: 'selectType',
      title: 'Select Type',
      type: 'string',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Radio', value: 'radio' },
          { title: 'Checkbox', value: 'checkbox' },
        ],
      },
      // This field will not be hidden if the type is 'select'
      hidden: ({ parent }: any) => parent?.fieldType !== 'select',
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'optionItem',
          fields: [
            {
              name: 'id',
              type: 'string',
            },
            {
              name: 'value',
              type: 'string',
            },
            {
              name: 'label',
              type: 'string',
            },
          ],
        },
      ],
      // This field will not be hidden if the type is 'select'
      hidden: ({ parent }: any) => parent?.fieldType !== 'select',
    },
  ],
}
