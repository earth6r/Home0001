import type { FC, HTMLAttributes } from 'react'
import { useRef } from 'react'
import { useIntersectionObserver } from '@react-hookz/web'
import type { Slug } from '@sanity/types'
import classNames from 'classnames'
import styles from './block.module.css'

export interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  slug?: Slug | undefined
}

export const Block: FC<BlockProps> = ({
  slug,
  children,
  className,
  ...props
}) => {
  const el = useRef<HTMLDivElement>(null)
  const intersection = useIntersectionObserver(el, { threshold: [0.15] })
  return (
    <div
      ref={el}
      id={slug?.current}
      className={classNames(
        styles.block,
        intersection?.isIntersecting && styles.visible,
        className,
        `flex-auto pt-ylg pb-block`
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Block
