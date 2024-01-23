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
        'px-x mt-[32px] md:mt-[56px] mb-[94px] lg:mb-yhalf'
      )}
    >
      <ul className="flex flex-col lg:flex-row md:justify-between gap-[24px] lg:gap-0 w-full pb-4 md:pb-0">
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

      <p className="font-medium text-xs tracking-details leading-normal mt-4">
        &copy;{` ${year} HOME0001`}
        <br />
        NY DRE #10351211814
        <br />
        CA DRE #01427385
      </p>
    </footer>
  )
}

export default Footer
