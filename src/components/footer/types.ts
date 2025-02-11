import type { HTMLAttributes } from 'react'
import type { RichText, Menus as SanityMenu } from '@gen/sanity-schema'
import { ParsedUrlQuery } from 'querystring'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  footerMenu?: SanityMenu
  path?: string
  query?: ParsedUrlQuery
  applyCopy?: RichText
}
