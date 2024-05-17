import { toPlainText } from '@portabletext/react'
import type { Rule, Slug } from '@sanity/types'

export const titleField = {
  name: 'title',
  type: 'plainText',
  title: 'Title',
}

export const slugField = {
  name: 'slug',
  type: 'slug',
  title: 'Slug',
  description:
    'The block can be linked to using this slug as an anchor (optional)',
  options: {
    initialValue: (doc: Record<string, any>, { parent }: Record<string, any>) =>
      parent.title ? toPlainText(parent.title) : '',
    source: (doc: Record<string, any>, { parent }: Record<string, any>) =>
      parent.title ? toPlainText(parent.title) : '',
    disableArrayWarning: true,
  },
  validation: (Rule: Rule) =>
    Rule.custom<Slug>(input => {
      if (typeof input?.current !== 'string') return true
      if (input?.current.includes('#') || input?.current.includes('/'))
        return 'Block slug must only contain letters and dashes'
      return true
    }),
}

export const textField = {
  name: 'text',
  type: 'richText',
  title: 'Text',
}

export const headerField = {
  name: 'header',
  type: 'string',
  title: 'Header',
}

export const plainTextField = {
  name: 'text',
  type: 'plainText',
  title: 'Text',
}

export const idField = {
  name: 'audienceId',
  type: 'string',
  title: 'Audience ID',
}

export const successField = {
  name: 'successMessage',
  type: 'richText',
  title: 'Success Message',
}

export const topFields = [titleField, slugField]
export const newsletterFields = [headerField, textField, idField, successField]
export const contactFields = [headerField, textField, idField]
