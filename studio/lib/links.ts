import type { SanityInternalLink, SanityLinkType } from './types'

export const getSanityLinkPath = (link?: SanityInternalLink): string => {
  switch (link?._type) {
    default:
      return '/'
  }
}

export const getHrefBySanityLink = (link?: SanityLinkType): string =>
  link?.externalLink ||
  `${getSanityLinkPath(link?.internalLink)}${
    link?.internalLink?.slug?.current || ''
  }${link?.anchor?.current || ''}`