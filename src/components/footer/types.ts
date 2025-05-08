import type { HTMLAttributes } from 'react'
import type { RichText, Menus as SanityMenu } from '@gen/sanity-schema'
import { ParsedUrlQuery } from 'querystring'
import { KeyedProperty } from '@components/sanity/blocks/properties/types'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  footerMenu?: SanityMenu
  path?: string
  query?: ParsedUrlQuery
  applyCopy?: RichText
  propertiesList?: KeyedProperty[]
}
