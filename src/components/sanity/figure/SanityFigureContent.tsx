import type { FC } from 'react'
import classNames from 'classnames'
import { SanityMedia } from '../media'
import type { SanityFigureProps } from './types'

interface SanityFigureContentProps extends SanityFigureProps {
  mediaRatio?: number | null
}

export const SanityFigureContent: FC<SanityFigureContentProps> = ({
  image,
  mediaRatio,
  contentClass,
  mediaClass,
  ...props
}) =>
  image?.asset ? (
    mediaRatio ? (
      <div className={classNames(contentClass || 'contents', 'figure-content')}>
        <div
          className="relative w-full"
          style={{ paddingTop: `${mediaRatio * 100}%` }}
        >
          <SanityMedia
            imageProps={{
              alt: '',
              layout: 'fill',
              objectFit: 'cover',
              width: undefined,
              height: undefined,
            }}
            image={image}
            className={mediaClass}
            {...props}
          />
        </div>
      </div>
    ) : (
      <div className={classNames(contentClass || 'contents', 'figure-content')}>
        <SanityMedia image={image} className={mediaClass} {...props} />
      </div>
    )
  ) : null

export default SanityFigureContent
