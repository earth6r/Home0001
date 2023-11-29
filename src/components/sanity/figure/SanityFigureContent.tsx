import type { FC } from 'react'
import classNames from 'classnames'
import { SanityMedia } from '../media'
import type { SanityFigureProps } from './types'

interface SanityFigureContentProps extends SanityFigureProps {}

export const SanityFigureContent: FC<SanityFigureContentProps> = ({
  image,
  contentClass,
  mediaClass,
  ...props
}) => {
  console.log('props: ', props)
  return (
    image?.asset && (
      <div className={classNames(contentClass)}>
        <SanityMedia
          image={image}
          imageProps={{
            alt: props.alt,
            objectFit: 'contain',
          }}
          className={mediaClass}
          {...props}
        />
      </div>
    )
  )
}

export default SanityFigureContent
