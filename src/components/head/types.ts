import type { SanityImageObject } from '@sanity/image-url/lib/types/types'

export interface HeadProps {
  siteTitle: string
  siteDescription?: string
  siteImage?: SanityImageObject
  siteKeywords?: string
  seoTitle?: string
  pageTitle?: string
  pageType?: 'page' | 'property' | 'unit' | 'brand' | 'rdPage' | 'buy'
  pageDescription?: string
  pageKeywords?: string
  pagePublishDate?: string
  pageImage?: SanityImageObject
  pageUrl?: string
}

export interface HeadTitleProps {
  siteTitle: string
  seoTitle?: string
  pageTitle?: string
}

export interface HeadImageProps {
  pageImage?: SanityImageObject
  siteImage?: SanityImageObject
}

export interface HeadSchemaProps extends HeadProps {
  title?: string
}
