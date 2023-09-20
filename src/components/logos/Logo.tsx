import type { FC } from 'react'
import classNames from 'classnames'
import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'

export interface LogoProps extends Omit<NextLinkProps, 'href'> {
  href?: string
  external?: boolean
  active?: boolean
  className?: string
}

export const Logo: FC<LogoProps> = ({
  external,
  active,
  className,
  href = '/',
  ...props
}) => {
  return (
    <NextLink href={href} {...props} passHref>
      <a
        className={classNames({
          [className || '']: !!className,
        })}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        <span className="sr-only">Home0001</span>
        <svg viewBox="0 0 124 32">
          <path d="M.207 16c0-3.143.935-6.216 2.688-8.83a15.936 15.936 0 017.157-5.853 15.998 15.998 0 019.214-.904 15.965 15.965 0 018.165 4.35 15.876 15.876 0 014.364 8.137 15.84 15.84 0 01-.907 9.183 15.905 15.905 0 01-5.874 7.132A15.986 15.986 0 014.878 27.24 15.866 15.866 0 01.207 16z" />
          <path d="M52.673.988v17.084h-9.39V.988h-9.166v17.084c0 3.666 1.461 7.18 4.062 9.773a13.891 13.891 0 009.806 4.048c3.678 0 7.205-1.457 9.806-4.048a13.797 13.797 0 004.061-9.773V.988h-9.179z" />
          <path d="M79.737.106A14.874 14.874 0 0069.238 4.44a14.773 14.773 0 00-4.35 10.462v16.044h9.173V14.902h20.526c0-3.924-1.565-7.688-4.35-10.462A14.874 14.874 0 0079.74.106" />
          <path d="M115.111 13.01h-10.797a3.056 3.056 0 01-2.112-.915 3.035 3.035 0 010-4.25 3.056 3.056 0 012.112-.915h16.68V.988h-16.68c-2.39 0-4.681.946-6.371 2.63a8.964 8.964 0 00-2.64 6.35c0 2.382.95 4.666 2.64 6.35a9.025 9.025 0 006.371 2.63h5.275v6.081H96.73v5.94h18.381a9.023 9.023 0 006.293-2.673 8.963 8.963 0 002.597-6.307c0-2.36-.933-4.626-2.597-6.307a9.023 9.023 0 00-6.293-2.672z" />
        </svg>
      </a>
    </NextLink>
  )
}

export default Logo
