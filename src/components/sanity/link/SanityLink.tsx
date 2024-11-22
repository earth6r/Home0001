import type { FC, MouseEventHandler } from 'react'
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
  query,
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
    query,
  } as SanityLinkType)
  const external = !!externalLink
  return (
    <Link href={href} external={external}>
      <button
        className={className}
        onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
      >
        {text}
        {children}
      </button>
    </Link>
  )
}

export default SanityLink
