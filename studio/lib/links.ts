import type { SanityInternalLink, SanityLinkType } from './types'

export const getSanityLinkPath = (link?: SanityInternalLink): string => {
  switch (link?._type) {
    case 'property':
      return '/property/'
    case 'propertyType':
      return '/property-type/'
    case 'unit':
      return '/unit/'
    case 'page':
      return '/'
    default:
      return ''
  }
}

export const getHrefBySanityLink = (link?: SanityLinkType): string =>
  link?.externalLink ||
  `${getSanityLinkPath(link?.internalLink)}${
    link?.internalLink?.slug?.current || ''
  }${link?.anchor?.current || ''}${link?.query?.current || ''}`
