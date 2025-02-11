import type { FC } from 'react'
import NextImage from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SanityImageProps as SanityImagePropsType } from './types'
import { client } from '@studio/lib'
import { useLenis } from '@studio-freight/react-lenis'

interface SanityImageProps extends SanityImageObject {
  props: SanityImagePropsType
  className?: string
  onLoad?: () => void
}

export const SanityImage: FC<SanityImageProps> = ({
  asset,
  className,
  props,
  onLoad,
}) => {
  const image = useNextSanityImage(client, asset)
  const placeholder = props?.lqip ? 'blur' : 'empty'

  return image ? (
    <NextImage
      placeholder={placeholder}
      blurDataURL={props?.lqip}
      onLoad={onLoad}
      {...{ ...image, ...props, className }}
    />
  ) : null
}

export default SanityImage
