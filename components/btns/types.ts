import type {
  ReactNode,
  Ref,
  HTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react'
import type * as CSS from 'csstype'
import type { LinkProps } from 'next/link'
import type { COLORS } from '@lib/globals'

export interface BtnCSSProperties extends CSS.Properties {
  '--btn-bg-up'?: COLORS
  '--btn-bg-down'?: COLORS
  '--btn-width'?: string
  '--btn-height'?: string
  '--btn-shadow-offset'?: string
}

export interface BaseBtnProps {
  children?: ReactNode
  className?: string
  style?: BtnCSSProperties
  color?: keyof typeof COLORS
  active?: boolean
  custom?: boolean
}

export interface BtnAsButton
  extends BaseBtnProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseBtnProps> {
  as?: 'button'
  type?: 'button' | 'submit'
  innerRef?: Ref<Element>
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export interface BtnAsLink
  extends BaseBtnProps,
    Omit<LinkProps, keyof BaseBtnProps> {
  as: 'link'
  href: LinkProps['href']
  external?: boolean
  innerRef?: Ref<Element>
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export interface BtnAsSpan
  extends BaseBtnProps,
    Omit<HTMLAttributes<HTMLSpanElement>, keyof BaseBtnProps> {
  as: 'span'
  innerRef?: Ref<Element>
  onClick?: MouseEventHandler<HTMLSpanElement>
}

export type BtnProps = BtnAsButton | BtnAsLink | BtnAsSpan
