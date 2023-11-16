import classNames from 'classnames'
import { type FC, type HTMLProps } from 'react'
import type { FooterProps } from './types'
import { SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'

export const Footer: FC<FooterProps & HTMLProps<HTMLDivElement>> = ({
  mainMenu,
  path,
  query,
}) => {
  const year = new Date().getFullYear()
  return (
    <footer className={classNames('px-x mt-20 md:mt-y')}>
      <div>
        <ul className="flex flex-col gap-10 md:gap-12 w-full">
          {mainMenu?.items?.map(({ _key, text, link }) => {
            return text && link ? (
              <li key={_key} className="uppercase">
                <SanityLink text={text} {...(link as SanityLinkType)} />
              </li>
            ) : null
          })}
        </ul>
      </div>

      <p className="mb-4 md:mb-9 mt-20">
        &copy;{` ${year} HOME0001`}
        <br />
        <br />
        NY DRE #10351211814 | CA DRE #01427385
      </p>
    </footer>
  )
}

export default Footer
