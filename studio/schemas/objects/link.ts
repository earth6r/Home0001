import { GrLink } from 'react-icons/gr'
import slugify from 'slugify'
import type { Rule, Slug } from '@sanity/types'
import type { Link } from '@gen/sanity-schema'

export default {
  name: 'link',
  type: 'object',
  title: 'Link',
  icon: GrLink,
  fields: [
    {
      name: 'internalLink',
      type: 'object',
      title: 'Internal link',
      fields: [
        {
          name: 'reference',
          type: 'reference',
          to: [
            { type: 'page' },
            { type: 'property' },
            { type: 'propertyType' },
            { type: 'unit' },
          ],
          weak: true,
        },
        {
          name: 'anchor',
          type: 'slug',
          title: 'Anchor Slug',
          options: {
            slugify: (input?: string): string | undefined => {
              if (!input) return
              const slug = slugify(input)
              if (slug.charAt(0) !== '#') return `#${slug}`
              return slug
            },
            disableArrayWarning: true,
          },
          validation: (Rule: Rule) =>
            Rule.custom<Slug>(input => {
              if (typeof input?.current !== 'string') return true
              if (input?.current.charAt(0) !== '#')
                return 'Slug must start with #'
              return true
            }),
        },
      ],
    },
    {
      name: 'externalLink',
      type: 'url',
      title: 'External Link',
      validation: (Rule: Rule): Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
  ],
  validation: (Rule: Rule): Rule =>
    Rule.custom<Link>(({ internalLink, externalLink }) => {
      if (!internalLink && !externalLink) {
        return 'An internal or external link is required'
      }
      if (internalLink && externalLink) {
        return 'Internal and external links are mutually exclusive'
      }
      return true
    }),
}
