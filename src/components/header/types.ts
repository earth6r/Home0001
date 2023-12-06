import type {
  Property,
  RichText as RichTextType,
  Menus as SanityMenu,
  SanityReference,
  UnitGroup,
} from '@gen/sanity-schema'
import type { HTMLAttributes } from 'react'

export interface UnitGroupContent extends Omit<UnitGroup, 'property'> {
  property?: {
    _id?: string
  }
}

export interface HeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, 'property'> {
  path?: string
  currentTitle?: string
  property?: SanityReference<Property>
  mainMenu?: SanityMenu
  waitlist?: {
    id?: string
    header?: string
    copy?: RichTextType
    success?: RichTextType
  }
  inquiry?: {
    id?: string
    copy?: string
    success?: string
  }
}

export interface HeaderMenuProps extends HeaderProps {
  customOpen?: boolean
  onOpen?: (open: boolean) => void
  closeMenu?: () => void
}
