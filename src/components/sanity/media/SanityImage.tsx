import type { FC } from 'react'
import NextImage from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SanityImageProps as SanityImagePropsType } from './types'
import { client } from '@studio/lib'

interface SanityImageProps extends SanityImageObject {
  props: SanityImagePropsType
  className?: string
}

export const SanityImage: FC<SanityImageProps> = ({
  asset,
  className,
  props,
}) => {
  const image = useNextSanityImage(client, asset)
  return image ? <NextImage {...{ ...image, ...props, className }} /> : null
}

export default SanityImage
