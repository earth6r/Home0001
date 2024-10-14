import { LuTextCursorInput } from 'react-icons/lu'
import { newsletterFields } from './fields'
import { Rule } from '@sanity/types'

export default {
  title: 'Form Block',
  name: 'formBlock',
  icon: LuTextCursorInput,
  type: 'object',
  fields: [
    {
      title: 'Header',
      name: 'header',
      type: 'richText',
    },
    {
      name: 'urlSubmit',
      type: 'string',
      title: 'URL Submit',
      descriotion:
        'URL to submit form data to minus the form ID/GUID and API key',
    },
    {
      name: 'audienceId',
      type: 'string',
      title: 'Audience ID/Form GUID',
    },
    {
      name: 'successMessage',
      type: 'richText',
      title: 'Success Message',
    },
    {
      name: 'panes',
      title: 'Panes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pane',
          fields: [
            {
              name: 'header',
              title: 'Header',
              type: 'string',
            },
            {
              name: 'copy',
              title: 'Copy',
              type: 'string',
            },
            {
              name: 'formFields',
              title: 'Form Fields',
              type: 'array',
              of: [{ type: 'formField', title: 'Form Field' }],
            },
          ],
        },
      ],
    },
    // {
    //   name: 'submitText',
    //   title: 'Submit Button Text',
    //   type: 'string',
    //   description: 'Text for the submit button',
    //   validation: (Rule: Rule): Rule => Rule.required(),
    // },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Background color for the form',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'White', value: 'white' },
          { title: 'Yellow', value: 'yellow' },
        ],
      },
    },
  ],
  preview: {
    prepare: (): { title: string } => ({ title: 'Form block' }),
  },
}
