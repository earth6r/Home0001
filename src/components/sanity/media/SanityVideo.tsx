import { useRef, type FC, useEffect } from 'react'
import type { SanityVideoProps } from './types'
import { getFileAsset } from '@sanity/asset-utils'
import lenis from '@studio-freight/react-lenis'

const PROJECT_ID = process.env.SANITY_STUDIO_API_PROJECT_ID || 'cr71fv96'
const DATASET = process.env.SANITY_STUDIO_API_DATASET || 'dev'

export const SanityVideo: FC<SanityVideoProps> = ({
  video,
  muted,
  className,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const getFileType = (url: string) => {
    if (url.includes('.webm')) {
      return 'video/webm'
    } else if (url.includes('.m4v')) {
      return 'video/x-m4v'
    } else {
      return 'video/mp4'
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video && video.autoplay) {
      video.setAttribute('muted', 'true')
      video.play()
    }
  }, [])

  return video?.files?.length ? (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      key={video?.files[0]._key}
      ref={videoRef}
      playsInline
      className={className}
      {...(video.loop && { loop: true })}
      {...(video.autoplay && {
        autoPlay: true,
        muted,
      })}
      {...(video.poster && { poster: video.poster.asset.url })}
      {...props}
    >
      {video.files.map(({ _key, asset }) => {
        const video = getFileAsset(asset, {
          projectId: PROJECT_ID,
          dataset: DATASET,
        })
        const mimeType = getFileType(video.url)
        return <source key={_key} src={video.url} type={mimeType} />
      })}
    </video>
  ) : null
}

export default SanityVideo
