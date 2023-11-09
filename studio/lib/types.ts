import type { Slug } from '@sanity/types'
import type { PortableTextBlock } from '@portabletext/types'

export interface PageHeading {
  title: PortableTextBlock
  slug: string | undefined
  h2s: PortableTextBlock[]
}

export interface BlockHeading {
  title: string
  slug: string
}

export enum SANITY_DOCUMENT_TYPES {
  PAGE = 'page',
  PROPERTY = 'property',
}

export interface SanityInternalLink {
  _type: SANITY_DOCUMENT_TYPES
  slug?: Slug
}

/**
 * Until `sanity-codegen` resolves reference types correctly we
 * need to roll our own, unfortunately.
 *
 * Example `groq` query:
 * ```
 * {
 *   externalLink,
 *   "internalLink": internalLink.reference->{
 *     _type,
 *     slug
 *   },
 *   "anchor": internalLink.anchor
 * }
 * ```
 *
 * @url https://github.com/ricokahler/sanity-codegen/issues/191
 */
export interface SanityLinkType {
  externalLink?: string
  internalLink?: SanityInternalLink
  anchor?: Slug
  query?: Slug
}
