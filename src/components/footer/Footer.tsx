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
        'md:grid md:grid-cols-2 md:gap-xdouble px-x my-ydouble'
      )}
    >
      <div className="hidden md:block">
        <p className="font-medium tracking-details text-xs uppercase">{`HOME0001`}</p>
      </div>

      <div className="md:grid md:grid-cols-3">
        <ul className="flex flex-col gap-y w-full pb-y md:pb-0">
          {footerMenu?.items?.slice(0, 3).map(({ _key, text, link }) => {
            return text && link ? (
              <li
                key={_key}
                className="font-medium text-xs tracking-details uppercase"
              >
                <SanityLink text={text} {...(link as SanityLinkType)} />
              </li>
            ) : null
          })}
        </ul>

        <ul className="flex flex-col gap-y w-full pb-ydouble md:pb-0">
          {footerMenu?.items
            ?.slice(3, footerMenu.items.length)
            .map(({ _key, text, link }, index) => {
              return text && link ? (
                <Fragment key={_key}>
                  <li className="font-medium text-xs tracking-details uppercase">
                    <SanityLink text={text} {...(link as SanityLinkType)} />
                  </li>
                  {footerMenu.items &&
                    index === footerMenu.items.length - 4 && (
                      <li className="md:hidden font-medium text-xs tracking-details">
                        <button
                          onClick={() => setBrokerInquiryOpen(true)}
                          className="uppercase"
                        >
                          Are you a realtor?
                        </button>
                      </li>
                    )}
                </Fragment>
              ) : null
            })}
        </ul>

        <div className="md:flex md:justify-between md:items-start w-full text-xs tracking-details leading-[1.3] md:leading-none">
          <p className="md:hidden font-sansText">&copy;{` ${year} HOME0001`}</p>

          <p className="font-medium">
            <span className="block md:hidden">NY DRE #10351211814</span>
            <span className="block md:hidden md:mt-4">CA DRE #01427385</span>

            <span className="hidden md:block">
              NY DRE
              <br></br>
              #10351211814
            </span>
            <span className="hidden md:block md:mt-4">
              CA DRE
              <br></br>
              #01427385
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
