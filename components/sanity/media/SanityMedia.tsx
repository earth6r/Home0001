import type { FC } from 'react'
import type { SanityMediaProps } from './types'
import { SanityImage } from './SanityImage'
import { SanityVideo } from './SanityVideo'

export const SanityMedia: FC<SanityMediaProps> = ({
  image,
  imageProps,
  video,
  className,
}) => {
  if (image?.asset)
    return <SanityImage {...image} props={imageProps} className={className} />
  if (video?.files?.length)
    return <SanityVideo video={video} className={className} />
  return null
}

export default SanityMedia
