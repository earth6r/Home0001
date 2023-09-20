import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { ImageUrlBuilder } from 'next-sanity-image'
import type { UseNextSanityImageProps } from 'next-sanity-image'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from '@studio/lib'
import type { HeadImageProps } from './types'

const imageBuilder = (builder: ImageUrlBuilder) =>
  builder.width(1200).fit('clip')

export const useHeadImages = ({
  pageImage: sanityPageImage,
  siteImage: sanitySiteImage,
}: HeadImageProps): {
  pageImage: UseNextSanityImageProps
  siteImage: UseNextSanityImageProps
} => {
  const pageImage = useNextSanityImage(
    client,
    sanityPageImage as SanityImageObject,
    { imageBuilder }
  )
  const siteImage = useNextSanityImage(
    client,
    sanitySiteImage as SanityImageObject,
    { imageBuilder }
  )
  return {
    pageImage,
    siteImage,
  }
}

export default useHeadImages
