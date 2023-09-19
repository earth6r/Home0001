import type { FC } from 'react'
import type { SanityVideoProps } from './types'

export const SanityVideo: FC<SanityVideoProps> = ({ video, ...props }) => {
  return video?.files?.length ? (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      {...(video.loop && { loop: true })}
      {...(video.autoplay && { autoPlay: true, muted: true })}
      {...(video.poster && { poster: video.poster.asset.url })}
      {...props}
    >
      {video.files.map(({ _key, asset }) => (
        <source key={_key} src={asset.url} type={asset.mimeType} />
      ))}
    </video>
  ) : null
}

export default SanityVideo
