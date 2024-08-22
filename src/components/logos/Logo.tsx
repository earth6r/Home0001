import type { FC } from 'react'
import classNames from 'classnames'
import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'

export interface LogoProps extends Omit<NextLinkProps, 'href'> {
  href?: string
  external?: boolean
  active?: boolean
  className?: string
  content?: string
}

export const Logo: FC<LogoProps> = ({
  external,
  active,
  className,
  href = '/',
  content,
  ...props
}) => {
  return (
    <NextLink href={href} {...props} legacyBehavior>
      <a
        className={classNames({
          [className || '']: !!className,
        })}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        <span className="uppercase">{content || 'HOME0001'}</span>
      </a>
    </NextLink>
  )
}

export default Logo
