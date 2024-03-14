import type { FC } from 'react'
import type { SanityMediaProps } from './types'
import { SanityImage } from './SanityImage'
import SanityVideo from './SanityVideo'

export const SanityMedia: FC<SanityMediaProps> = ({
  image,
  imageProps,
  video,
  className,
  onLoadingComplete,
}) => {
  if (image?.asset && imageProps)
    return (
      <SanityImage
        {...image}
        props={imageProps}
        onLoadingComplete={onLoadingComplete}
        className={className}
      />
    )
  if (video?.files?.length)
    return (
      <SanityVideo
        id="sanity-video"
        muted={video.autoplay}
        video={video}
        className={className}
      />
    )
  return null
}

export default SanityMedia
