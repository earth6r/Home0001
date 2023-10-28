import type {
  RichText as RichTextType,
  Menus as SanityMenu,
  UnitGroup,
} from '@gen/sanity-schema'
import type { HTMLAttributes } from 'react'

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  mainMenu?: SanityMenu
  waitlistId?: string
  waitlistHeader?: string
  waitlistCopy?: RichTextType
  waitlistUnits?: (UnitGroup & {
    _key: string
  })[]
}

export interface HeaderMenuProps extends HeaderProps {
  customOpen?: boolean
  onOpen?: (open: boolean) => void
  closeMenu?: () => void
}
