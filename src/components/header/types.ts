import { KeyedProperty } from '@components/sanity/blocks/properties/types'
import type {
  Link,
  Media,
  Property,
  RichText as RichTextType,
  SanityImageAsset,
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
    consentCopy?: RichTextType
    showConsent?: boolean
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
  rdSettings?: {
    image?: {
      _type: 'image'
      asset: SanityReference<SanityImageAsset>
    }
    link?: Link
  }
  inventory?: any
  properties?: KeyedProperty[]
}

export interface HeaderMenuProps extends HeaderProps {
  customOpen?: boolean
  setCustomOpen: Dispatch<SetStateAction<boolean>>
  onOpen?: (open: boolean) => void
  closeMenu?: () => void
}
