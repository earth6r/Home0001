import type { FC } from 'react'
import { Figure } from '@components/figure'
import type { SanityFigureProps } from './types'
import { SanityFigureContent } from './SanityFigureContent'
import { SanityFigureCaption } from './SanityFigureCaption'

export const SanityFigure: FC<SanityFigureProps> = ({
  children,
  caption,
  captionClass,
  contentClass,
  mediaClass,
  mediaRatio,
  className,
  ...props
}) => {
  console.log(props)

  return (
    <Figure
      className={className}
      media={
        <SanityFigureContent
          contentClass={contentClass}
          mediaClass={mediaClass}
          {...props}
        />
      }
      caption={
        caption ? <SanityFigureCaption caption={caption} {...props} /> : null
      }
      captionClass={captionClass}
    >
      {children}
    </Figure>
  )
}

export default Figure
