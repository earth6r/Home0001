import type { FC } from 'react'
import NextHead from 'next/head'
import { COLORS } from '@lib/globals'
import type { HeadProps } from './types'
import { useHeadTitle } from './use-title'
import { useHeadImages } from './use-images'

export const Head: FC<HeadProps> = props => {
  const title = useHeadTitle({
    seoTitle: props.seoTitle,
    pageTitle: props.pageTitle,
    siteTitle: props.siteTitle,
  })
  const { pageImage, siteImage } = useHeadImages({
    pageImage: props.pageImage,
    siteImage: props.siteImage,
  })
  return (
    <NextHead>
      <title key="title">{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content={props.pageDescription || props.siteDescription}
        key="description"
      />
      <meta
        name="keywords"
        content={props.pageKeywords || props.siteKeywords}
        key="keywords"
      />
      <link rel="canonical" href={props.pageUrl} />
      {/* og */}
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={props.pageDescription || props.siteDescription}
      />
      <meta property="og:site_name" content={props.siteTitle} />
      <meta property="og:url" content={props.pageUrl} />
      <meta property="og:image" content={pageImage?.src || siteImage?.src} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={props.pageDescription || props.siteDescription}
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color={COLORS.black}
      />
    </NextHead>
  )
}

export default Head
