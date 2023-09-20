import type { FC } from 'react'
import type { SanityLinkType } from '@studio/lib'
import { getHrefBySanityLink } from '@studio/lib'
import type { BtnAsLink, BtnProps } from '@components/btns'
import { Btn } from '@components/btns'

export type SanityBtnProps = BtnProps & SanityLinkType

export const SanityBtn: FC<SanityBtnProps> = props => {
  const propsKeys = Object.keys(props)
  const hasLink =
    propsKeys.includes('internalLink') || propsKeys.includes('externalLink')
  const href = hasLink
    ? getHrefBySanityLink({
        internalLink: props.internalLink,
        externalLink: props.externalLink,
        anchor: props.anchor,
      } as SanityLinkType)
    : null
  const external = !!props.externalLink
  const as = href ? 'link' : 'button'
  return as === 'link' ? (
    <Btn {...({ ...props, as, href, external } as BtnAsLink)}>
      {props.children}
    </Btn>
  ) : (
    <Btn {...props}>{props.children}</Btn>
  )
}

export default SanityBtn
