import classNames from 'classnames'
import { type FC, type HTMLProps } from 'react'
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
        'lg:flex lg:flex-row lg:justify-between lg:items-start px-x mt-20 lg:mt-10 lg:mb-y'
      )}
    >
      <ul className="flex flex-col lg:flex-row md:justify-between gap-14 lg:gap-0 w-full">
        {footerMenu?.items?.map(({ _key, text, link }, index) => {
          return text && link ? (
            <>
              {footerMenu.items && index === footerMenu.items.length - 1 && (
                <li className="md:hidden font-medium text-xs tracking-details uppercase">
                  <button onClick={() => setBrokerInquiryOpen(true)}>
                    ARE YOU A BROKER?
                  </button>
                </li>
              )}
              <li
                key={_key}
                className="font-medium text-xs tracking-details uppercase"
              >
                <SanityLink text={text} {...(link as SanityLinkType)} />
              </li>
            </>
          ) : null
        })}
      </ul>

      <p className="hidden lg:block w-[50%] ml-[5%] font-medium text-xs tracking-details leading-none">
        &copy;{` ${year} HOME0001`} NY DRE #10351211814 | CA DRE #01427385
      </p>

      <p className="lg:hidden font-medium text-xs tracking-details leading-normal mb-4 lg:mb-9 mt-20">
        &copy;{` ${year} HOME0001`}
        <br />
        NY DRE #10351211814 | CA DRE #01427385
      </p>
    </footer>
  )
}

export default Footer
