import type { FC, HTMLAttributes } from 'react'
import { useRef } from 'react'
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
  return (
    <div
      ref={el}
      id={slug?.current}
      className={classNames(
        styles.block,
        styles.visible,
        className,
        `flex-auto md:grid md:grid-cols-3 pr-menu`
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Block
