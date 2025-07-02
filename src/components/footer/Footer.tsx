import classNames from 'classnames'
import { type FC, type HTMLProps } from 'react'
import type { FooterProps } from './types'
import { RichText, SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import { useBrokerInquiryModal } from '@contexts/modals'
import { useCookiesPrefs } from '@contexts/cookies'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import { TypedObject } from 'sanity'
import { PropertyList } from '@components/property'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowBtn } from '@components/btns'

export const Footer: FC<FooterProps & HTMLProps<HTMLDivElement>> = ({
  footerMenu,
  applyCopy,
  applyLink,
  linksOnly,
  propertiesList,
}) => {
  const year = new Date().getFullYear()
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()
  const [showPrefs, setShowPrefs] = useCookiesPrefs()
  const { asPath } = useRouter()

  return (
    <>
      {asPath !== '/' && !linksOnly && (
        <div className="grid lg:grid-cols-2 mt-header">
          {propertiesList && (
            <PropertyList
              header={`0001 homes are available in:`}
              properties={propertiesList}
              className="pl-x pr-[calc(var(--space-menu)+var(--space-x))] md:pr-[calc(var(--space-menu-sm)+var(--space-x)+3px)] lg:pr-0"
            />
          )}
        </div>
      )}

      {asPath !== '/how-it-works' && !linksOnly && (
        <div className="w-full h-[173px] bg-black mt-y px-x text-white">
          <Link
            href="/how-it-works"
            className="flex items-center justify-start gap-x text-h3 h-full"
          >
            {`How it works`}
            <IconRightArrowBold className="w-[35px] h-auto" fill="white" />
          </Link>
        </div>
      )}

      <footer
        className={classNames(
          'flex flex-col gap-y lg:gap-yquad pb-yquad font-medium text-xs uppercase'
        )}
      >
        {!linksOnly && (
          <div className="flex flex-col justify-start gap-ydouble py-ydouble pl-x pr-menu lg:px-x bg-gray">
            <div className="w-full lg:w-1/2 pr-x">
              <RichText
                blocks={applyCopy as TypedObject | TypedObject[]}
                className="normal-case"
              />
              {applyLink && (
                <SanityLink {...applyLink}>
                  <ArrowBtn
                    text="Connect wallet to apply"
                    className="mt-yhalf"
                  />
                </SanityLink>
              )}
            </div>

            <div className="w-full">
              <p>{`If you have questions:`}</p>
              <a href="http://home0001.com/contact" target="_blank">
                <ArrowBtn text={`Get in touch`} className="mt-yhalf" />
              </a>
            </div>

            <div className="w-full">
              <p>{`Are you a broker?`}</p>
              <a href="http://home0001.com/contact" target="_blank">
                <ArrowBtn
                  text="Talk to us"
                  background="white"
                  className="mt-yhalf"
                />
              </a>
            </div>
          </div>
        )}

        <ul className="flex flex-col xl:flex-row xl:justify-start gap-y xl:gap-xdouble w-full pl-x">
          {footerMenu?.items?.map(({ _key, text, link }) => {
            return text && link ? (
              <li key={_key}>
                <SanityLink
                  className="uppercase"
                  text={text}
                  {...(link as SanityLinkType)}
                />
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

        <div className="flex flex-wrap gap-yhalf pl-x pr-menu md:px-x">
          <p className="w-full">
            <span className="hidden xl:inline-block">
              &copy;{` ${year}`}&nbsp;
            </span>
            {`HOME0001 International Inc.`}
          </p>
          <p className="block w-full">NY DRE #10991239104</p>
          <p className="block w-full">CA DRE #02236922</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
