import classNames from 'classnames'
import { useContext, type FC, type HTMLProps } from 'react'
import type { FooterProps } from './types'
import { SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import { HomeContext } from '@contexts/home'

export const Footer: FC<FooterProps & HTMLProps<HTMLDivElement>> = ({
  mainMenu,
  path,
}) => {
  const { state } = useContext(HomeContext)
  const year = new Date().getFullYear()
  return (
    <footer
      className={classNames(
        state.property?.cityId || path !== '/' ? '' : 'hidden',
        'px-x mt-20 md:mt-y'
      )}
    >
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
      <p className="mb-10 md:mb-6 my-20">&copy;{` ${year} HOME0001`}</p>
    </footer>
  )
}

export default Footer
