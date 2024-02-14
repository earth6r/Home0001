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
    <footer className={classNames('px-x mt-ydouble mb-ydouble lg:mb-y')}>
      <ul className="flex flex-col lg:flex-row md:justify-between gap-y lg:gap-0 w-full pb-[30px] md:pb-0">
        {footerMenu?.items?.map(({ _key, text, link }, index) => {
          return text && link ? (
            <Fragment key={_key}>
              {footerMenu.items && index === footerMenu.items.length - 1 && (
                <li className="md:hidden font-medium text-xs tracking-details">
                  <button
                    onClick={() => setBrokerInquiryOpen(true)}
                    className="uppercase"
                  >
                    Are you a realtor?
                  </button>
                </li>
              )}
              <li className="font-medium text-xs tracking-details uppercase">
                <SanityLink text={text} {...(link as SanityLinkType)} />
              </li>
            </Fragment>
          ) : null
        })}
      </ul>

      <div className="md:flex md:justify-between md:items-start w-full text-xs tracking-details leading-[1.3] md:leading-none md:mt-4">
        <p className="font-sansText font-bold">&copy;{` ${year} HOME0001`}</p>

        <p className="font-medium md:text-right">
          <span className="block">NY DRE #10351211814</span>
          <span className="block md:mt-4">CA DRE #01427385</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
