import type { FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import classNames from 'classnames'
import type { HeaderProps } from './types'
import { Logo } from '@components/logos'
import HeaderMenu from './HeaderMenu'
import type { Menus as SanityMenu } from '@gen/sanity-schema'
import { Btn } from '@components/btns'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { Modal } from '@components/modal'
import { HubspotForm } from '@components/form'
import { RichText } from '@components/sanity'

export const Header: FC<HeaderProps> = ({
  waitlistId,
  waitlistHeader,
  waitlistCopy,
  mainMenu,
  className,
}) => {
  const onOpen = useCallback((open: boolean) => setMenuOpen(open), [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const el = useRef<HTMLElement>(null)

  return (
    <div
      id="header"
      className={classNames(
        className,
        'fixed w-full pointer-events-none z-header'
      )}
    >
      <header
        ref={el}
        role="banner"
        className="flex justify-between items-center relative w-full h-header px-x"
      >
        <Logo className="flex items-center h-header pointer-events-auto" />

        <div className="flex items-center gap-5 md:gap-16">
          <Modal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)}>
            <div className="flex flex-col max-w-md mx-auto h-full py-6 md:py-10 px-x md:px-10">
              {waitlistHeader && (
                <h2 className="pb-ylg uppercase">
                  {waitlistHeader || `Join waitlist`}
                </h2>
              )}

              {waitlistCopy && !formSubmitted && (
                <RichText
                  blocks={waitlistCopy}
                  className={classNames('mb-4 clear-both')}
                />
              )}
              <HubspotForm
                formType={'general'}
                audienceId={waitlistId}
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
              />
            </div>
          </Modal>

          <Btn
            type="button"
            onClick={() => setWaitlistOpen(true)}
            className="pointer-events-auto flex pt-[8px] px-[7px] pb-[7px] md:p-[6px] bg-black text-white leading-none uppercase z-header"
          >
            <IconSmallArrow width="13" height="9" className="mr-[3px]" />
            {`Waitlist`}
          </Btn>
          <HeaderMenu
            customOpen={menuOpen}
            onOpen={onOpen}
            mainMenu={mainMenu as SanityMenu}
            className="flex flex-col pointer-events-auto"
          />
        </div>
      </header>
    </div>
  )
}

export default Header
