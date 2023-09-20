import type { FC } from 'react'
import type { SanityLinkType } from '@studio/lib'
import { getHrefBySanityLink } from '@studio/lib'
import type { LinkProps } from '@components/links'
import { Link } from '@components/links'

type SanityLinkProps = SanityLinkType &
  Omit<LinkProps, 'href'> & {
    text?: string
  }

export const SanityLink: FC<SanityLinkProps> = ({
  text,
  internalLink,
  externalLink,
  anchor,
  onClick,
  className,
  children,
}) => {
  const href = getHrefBySanityLink({
    internalLink,
    externalLink,
    anchor,
  } as SanityLinkType)
  const external = !!externalLink
  return (
    <Link
      href={href}
      external={external}
      className={className}
      onClick={onClick}
    >
      {text}
      {children}
    </Link>
  )
}

export default SanityLink
