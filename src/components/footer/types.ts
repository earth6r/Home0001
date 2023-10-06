import type { HTMLAttributes } from 'react'
import type { Menus as SanityMenu } from '@gen/sanity-schema'
import { ParsedUrlQuery } from 'querystring'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  mainMenu?: SanityMenu
  path?: string
  query?: ParsedUrlQuery
}
