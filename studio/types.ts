import type { SanityDocument } from '@sanity/types'

export type PageDocument = SanityDocument & {
  slug?: {
    _type: 'slug'
    current: string
  }
}
