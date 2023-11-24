import classNames from 'classnames'
import { type FC, type HTMLProps } from 'react'
import type { FooterProps } from './types'
import { SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'

export const Footer: FC<FooterProps & HTMLProps<HTMLDivElement>> = ({
  mainMenu,
}) => {
  const year = new Date().getFullYear()
  return (
    <footer
      className={classNames(
        'lg:flex lg:flex-row lg:justify-between lg:items-start px-x mt-20 lg:mt-10 lg:mb-y'
      )}
    >
      <ul className="flex flex-col lg:flex-row md:justify-between gap-14 lg:gap-0 w-full">
        {mainMenu?.items?.map(({ _key, text, link }) => {
          return text && link ? (
            <li
              key={_key}
              className="font-bold text-xs tracking-tight uppercase"
            >
              <SanityLink text={text} {...(link as SanityLinkType)} />
            </li>
          ) : null
        })}
      </ul>

      <p className="hidden lg:block w-[50%] ml-[5%] font-bold text-xs tracking-tight leading-none">
        &copy;{` ${year} HOME0001`} NY DRE #10351211814 | CA DRE #01427385
      </p>

      <p className="lg:hidden font-bold text-xs tracking-tight leading-normal mb-4 lg:mb-9 mt-20">
        &copy;{` ${year} HOME0001`}
        <br />
        NY DRE #10351211814 | CA DRE #01427385
      </p>
    </footer>
  )
}

export default Footer
