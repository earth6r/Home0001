import { GiButtonFinger } from 'react-icons/gi'
import type { Rule } from '@sanity/types'
import type { Cta } from 'gen/sanity-schema'

export default {
  name: 'cta',
  type: 'object',
  title: 'CTA',
  icon: GiButtonFinger,
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Text',
    },
    {
      name: 'link',
      type: 'link',
      title: 'Link',
    },
  ],
  validation: (Rule: Rule): Rule =>
    Rule.custom<Cta>(cta => {
      const internalLink = cta?.link?.internalLink
      const externalLink = cta?.link?.externalLink
      if ((internalLink || externalLink) && !cta?.text) {
        return 'Text is required'
      } else if (!!cta?.text && !internalLink && !externalLink) {
        return 'A link is required'
      }
      return true
    }),
}
