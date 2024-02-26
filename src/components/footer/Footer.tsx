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
        'xl:grid xl:grid-cols-2 xl:gap-x px-x my-ydouble font-medium text-xs uppercase'
      )}
    >
      <div className="hidden xl:flex xl:flex-wrap gap-y">
        <p className="w-full">
          <span className="hidden xl:inline-block">
            &copy;{` ${year}`}&nbsp;
          </span>
          {`HOME0001`}
        </p>
        <p className="w-full">{`New york · los angeles · berlin · london · paris · mexico city`}</p>
      </div>

      <div className="xl:flex xl:flex-wrap xl:w-full xl:gap-y">
        <div className="hidden xl:block w-full mb-y"></div>
        <ul className="flex flex-col xl:flex-row xl:justify-between gap-y w-full pb-ydouble xl:pb-0">
          {footerMenu?.items?.map(({ _key, text, link }) => {
            return text && link ? (
              <li key={_key}>
                <SanityLink text={text} {...(link as SanityLinkType)} />
              </li>
            ) : null
          })}
        </ul>

        <div className="xl:hidden xl:justify-between xl:items-start w-full leading-[1.3] xl:leading-none">
          <p>&copy;{` ${year} HOME0001`}</p>

          <p>
            <span className="block">NY DRE #10351211814</span>
            <span className="block">CA DRE #01427385</span>
          </p>
        </div>
      </div>

      <div className="hidden xl:block">
        <p className="block mb-y">NY DRE #10351211814</p>
        <p className="block">CA DRE #01427385</p>
      </div>
    </footer>
  )
}

export default Footer
