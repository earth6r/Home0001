import type { FC } from 'react'
import classNames from 'classnames'
import type { VideosBlock as VideosBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement, SanityVideoType } from '@components/sanity'
import { Block, SanityMedia } from '@components/sanity'

type VideosBlockProps = Omit<SanityBlockElement, keyof VideosBlockType> &
  VideosBlockType

export const VideosBlock: FC<VideosBlockProps> = ({ videos, className }) => {
  return (
    <Block
      className={classNames(className, 'grid md:grid-cols-2 gap-x mt-y -mb-y')}
    >
      {videos &&
        videos.length > 0 &&
        videos.map(video => (
          <div key={video._key} className="md:col-span-1">
            <SanityMedia
              video={video as SanityVideoType}
              className="w-full aspect-square object-cover"
            />
            {video.caption && (
              <p className="text-sm font-sansText font-medium text-left mt-y">
                {video.caption}
              </p>
            )}
          </div>
        ))}
    </Block>
  )
}

export default VideosBlock
