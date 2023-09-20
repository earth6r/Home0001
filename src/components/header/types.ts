import type { Menus as SanityMenu } from '@gen/sanity-schema'
import type { HTMLAttributes } from 'react'

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  mainMenu?: SanityMenu
}

export interface HeaderMenuProps extends HeaderProps {
  customOpen?: boolean
  onOpen?: (open: boolean) => void
  closeMenu?: () => void
}
