import type {
  Property,
  RichText as RichTextType,
  Menus as SanityMenu,
  SanityReference,
  UnitGroup,
} from '@gen/sanity-schema'
import type { Dispatch, HTMLAttributes, SetStateAction } from 'react'

export interface UnitGroupContent extends Omit<UnitGroup, 'property'> {
  property?: {
    _id?: string
    slug?: { current?: string }
  }
}

export interface HeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, 'property'> {
  path?: string
  currentTitle?: string
  property?: SanityReference<Property>
  mainMenu?: SanityMenu
  hideMenu?: boolean
  hideMenuButton?: boolean
  showTourLink?: boolean
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
    brokerId?: string
    brokerCopy?: RichTextType
    brokerSuccess?: RichTextType
  }
  title?: string
}

export interface HeaderMenuProps extends HeaderProps {
  customOpen?: boolean
  setCustomOpen: Dispatch<SetStateAction<boolean>>
  onOpen?: (open: boolean) => void
  closeMenu?: () => void
}
