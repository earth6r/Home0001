import type { FC } from 'react'
import type { SanityMediaProps } from './types'
import { SanityImage } from './SanityImage'

export const SanityMedia: FC<SanityMediaProps> = ({
  image,
  imageProps,
  className,
}) => {
  if (image?.asset && imageProps)
    return <SanityImage {...image} props={imageProps} className={className} />
  return null
}

export default SanityMedia
