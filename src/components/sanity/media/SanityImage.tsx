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
}

export const SanityImage: FC<SanityImageProps> = ({
  asset,
  className,
  props,
}) => {
  const image = useNextSanityImage(client, asset)
  const placeholder = props?.lqip ? 'blur' : 'empty'
  const lenis = useLenis()

  return image ? (
    <NextImage
      placeholder={placeholder}
      blurDataURL={props?.lqip}
      onLoadingComplete={() => lenis && lenis.resize()}
      {...{ ...image, ...props, className }}
    />
  ) : null
}

export default SanityImage
