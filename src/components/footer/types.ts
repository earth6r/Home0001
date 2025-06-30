import type { HTMLAttributes } from 'react'
import type { RichText, Menus as SanityMenu } from '@gen/sanity-schema'
import { ParsedUrlQuery } from 'querystring'
import { KeyedProperty } from '@components/sanity/blocks/properties/types'
import { SanityLinkType } from '@studio/lib'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  footerMenu?: SanityMenu
  path?: string
  linksOnly?: boolean
  query?: ParsedUrlQuery
  applyCopy?: RichText
  applyLink?: SanityLinkType
  propertiesList?: KeyedProperty[]
}
