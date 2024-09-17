import classNames from 'classnames'
import { type FC, type HTMLProps } from 'react'
import type { FooterProps } from './types'
import { SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import { useCookiesPrefs } from '@contexts/cookies'

export const Footer: FC<FooterProps & HTMLProps<HTMLDivElement>> = ({
  footerMenu,
  fullContent = true,
}) => {
  const year = new Date().getFullYear()
  const [showPrefs, setShowPrefs] = useCookiesPrefs()

  return (
    <footer
      className={classNames(
        'xl:grid xl:grid-cols-2 xl:gap-x px-x my-ydouble font-medium text-xs uppercase'
      )}
    >
      {fullContent && (
        <div className="hidden xl:flex xl:flex-wrap gap-y">
          <p className="w-full">
            <span className="hidden xl:inline-block">
              &copy;{` ${year}`}&nbsp;
            </span>
            {`HOME0001`}
          </p>
          <p className="w-full">{`New york · los angeles · berlin · london · paris · mexico city`}</p>
        </div>
      )}

      <div className="xl:flex xl:flex-wrap xl:w-full xl:gap-y">
        <div className="hidden xl:block w-full mb-y"></div>
        <ul
          className={classNames(
            fullContent
              ? 'xl:flex-row xl:justify-end gap-y'
              : 'gap-y md:gap-yhalf',
            'flex flex-col w-full pb-ydouble xl:pb-0'
          )}
        >
          {footerMenu?.items?.map(({ _key, text, link }) => {
            return text && link ? (
              <li key={_key}>
                <SanityLink text={text} {...(link as SanityLinkType)} />
              </li>
            ) : null
          })}
          <li>
            <button
              className="text-button"
              onClick={() => {
                setShowPrefs(true)
              }}
            >
              {`Cookies Settings`}
            </button>
          </li>
        </ul>

        {fullContent && (
          <div className="xl:hidden xl:justify-between xl:items-start w-full leading-[1.3] xl:leading-none">
            <p>&copy;{` ${year} HOME0001`}</p>

            <p>
              <span className="block">NY DRE #10351211814</span>
              <span className="block">CA DRE #01427385</span>
            </p>
          </div>
        )}
      </div>

      {fullContent && (
        <div className="hidden xl:block">
          <p className="block mb-y">NY DRE #10351211814</p>
        </div>
      )}
    </footer>
  )
}

export default Footer
