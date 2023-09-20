import type { FC } from 'react'
import classNames from 'classnames'
import type { FigureProps } from './types'
import styles from './figure.module.css'

export const Figure: FC<FigureProps> = ({
  children,
  content,
  caption,
  captionClass,
  className,
  ...props
}) => (
  <figure className={classNames(styles.figure, className, 'figure')} {...props}>
    {content}
    <figcaption className={classNames(styles.figcaption, captionClass)}>
      {caption}
      {children}
    </figcaption>
  </figure>
)

export default Figure
