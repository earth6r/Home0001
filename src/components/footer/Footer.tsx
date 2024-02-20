import classNames from 'classnames'
import { Fragment, type FC, type HTMLProps } from 'react'
import type { FooterProps } from './types'
import { SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import { useBrokerInquiryModal } from '@contexts/modals'

export const Footer: FC<FooterProps & HTMLProps<HTMLDivElement>> = ({
  footerMenu,
}) => {
  const year = new Date().getFullYear()
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()

  return (
    <footer
      className={classNames(
        'xl:grid xl:grid-cols-2 xl:gap-xdouble px-x my-ydouble font-sansText font-medium tracking-details text-xs uppercase'
      )}
    >
      <div className="hidden xl:flex xl:flex-wrap gap-y">
        <p className="w-full">{`HOME0001`}</p>
        <p className="w-full">{`New york · los angeles · berlin · london · paris · mexico city`}</p>
      </div>

      <div className="xl:flex xl:flex-wrap xl:w-full xl:gap-y">
        <ul className="flex flex-col xl:flex-row xl:justify-between gap-y w-full pb-y xl:pb-0">
          {footerMenu?.items?.map(({ _key, text, link }) => {
            return text && link ? (
              <li key={_key}>
                <SanityLink text={text} {...(link as SanityLinkType)} />
              </li>
            ) : null
          })}
          <li className="hidden xl:inline-block">
            <span>&copy;{` ${year} HOME0001`}</span>
          </li>
        </ul>

        <div className="xl:flex xl:justify-between xl:items-start w-full leading-[1.3] xl:leading-none">
          <p className="xl:hidden">&copy;{` ${year} HOME0001`}</p>

          <p className="xl:flex xl:justify-between xl:w-full">
            <span className="block xl:inline-block">NY DRE #10351211814</span>
            <span className="block xl:inline-block">CA DRE #01427385</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
