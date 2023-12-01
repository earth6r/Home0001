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
}) =>
  image?.asset ? (
    <div className={classNames(contentClass)}>
      <SanityMedia image={image} className={mediaClass} {...props} />
    </div>
  ) : null

export default SanityFigureContent
