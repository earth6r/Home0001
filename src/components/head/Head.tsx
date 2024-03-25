import type { FC } from 'react'
import NextHead from 'next/head'
import type { HeadProps } from './types'
import { useHeadTitle } from './use-title'
import { useHeadImages } from './use-images'
import { COLORS } from '@globals/colors'
const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID

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
      {/* eslint-disable-next-line @next/next/next-script-for-ga */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GOOGLE_ID}');`,
        }}
      ></script>
      <title key="title">{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1 maximum-scale=1"
      />
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
      <link
        rel="icon"
        type="image/svg+xml"
        href={
          props.pageType === 'brand' ? '/favicon-earth.png' : '/favicon.png'
        }
      />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color={COLORS.black}
      />
    </NextHead>
  )
}

export default Head
