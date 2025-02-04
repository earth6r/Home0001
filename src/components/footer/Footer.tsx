import classNames from 'classnames'
import { type FC, type HTMLProps } from 'react'
import type { FooterProps } from './types'
import { SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import { useBrokerInquiryModal, useWaitlisModal } from '@contexts/modals'
import { useCookiesPrefs } from '@contexts/cookies'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'

export const Footer: FC<FooterProps & HTMLProps<HTMLDivElement>> = ({
  footerMenu,
}) => {
  const year = new Date().getFullYear()
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  const [showPrefs, setShowPrefs] = useCookiesPrefs()

  return (
    <footer
      className={classNames(
        'flex flex-col gap-ylg pl-x pr-menu md:px-x pt-y pb-ydouble mt-header font-medium text-xs uppercase bg-gray'
      )}
    >
      <div className="flex flex-col justify-start gap-ydouble">
        <div className="w-full">
          <p>{`To join our community submit an application here:`}</p>
          <button
            onClick={setWaitlistOpen}
            className={classNames(
              'inline-flex justify-between items-center gap-[5px] relative px-[6px] pt-[3px] pb-[4px] mt-yhalf bg-black text-white font-medium text-left uppercase border-black'
            )}
          >
            <IconRightArrowBold
              className="relative w-[14px] mt-[0.1em]"
              fill="white"
            />
            <span className="leading-none">{`Apply`}</span>
          </button>
        </div>

        <div className="w-full">
          <p>{`For any other questions, please reach out here:`}</p>
          <a href="mailto:info@home0001.com" target="_blank">
            <button
              className={classNames(
                'inline-flex justify-between items-center gap-[5px] relative px-[6px] pt-[3px] pb-[4px] mt-yhalf bg-white font-medium text-left uppercase border-black'
              )}
            >
              <IconRightArrowBold
                className="relative w-[14px] mt-[0.1em]"
                fill="black"
              />
              <span className="leading-none">{`Get in touch`}</span>
            </button>
          </a>
        </div>

        <div className="w-full">
          <p>{`Are you a broker?`}</p>
          <button
            className={classNames(
              'inline-flex justify-between items-center gap-[5px] relative px-[6px] pt-[3px] pb-[4px] mt-yhalf bg-white font-medium text-left uppercase border-black'
            )}
            onClick={() => {
              setBrokerInquiryOpen(true)
            }}
          >
            <IconRightArrowBold
              className="relative w-[14px] mt-[0.1em]"
              fill="black"
            />
            <span className="leading-none">{`Send us a message`}</span>
          </button>
        </div>
      </div>

      <ul className="flex flex-col xl:flex-row xl:justify-between gap-y w-full xl:w-1/2">
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

      <div className="flex flex-wrap gap-yhalf">
        <p className="w-full">
          <span className="hidden xl:inline-block">
            &copy;{` ${year}`}&nbsp;
          </span>
          {`HOME0001`}
        </p>
        <p className="w-full">{`New york · los angeles · berlin · london · paris · mexico city`}</p>

        <p className="block w-full">NY DRE #10991239104</p>
        <p className="block w-full">CA DRE #02236922</p>
      </div>
    </footer>
  )
}

export default Footer
