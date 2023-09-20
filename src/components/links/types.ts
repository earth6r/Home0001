import type { HTMLAttributes, MouseEventHandler } from 'react'
import type { LinkProps as NextLinkProps } from 'next/link'

export interface LinkProps
  extends Omit<HTMLAttributes<HTMLAnchorElement>, 'onTouchStart'>,
    NextLinkProps {
  external?: boolean
  active?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>
}
