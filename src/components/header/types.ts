import { KeyedUnitGroup } from '@components/form'
import type {
  RichText as RichTextType,
  Menus as SanityMenu,
  UnitGroup,
} from '@gen/sanity-schema'
import type { HTMLAttributes } from 'react'

export interface UnitGroupContent extends Omit<UnitGroup, 'property'> {
  property?: {
    _id?: string
  }
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  mainMenu?: SanityMenu
  waitlistId?: string
  waitlistHeader?: string
  waitlistCopy?: RichTextType
  waitlistSuccess?: RichTextType
  waitlistUnits?: KeyedUnitGroup[]
}

export interface HeaderMenuProps extends HeaderProps {
  customOpen?: boolean
  onOpen?: (open: boolean) => void
  closeMenu?: () => void
}
