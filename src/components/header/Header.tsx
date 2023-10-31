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
import { Form, MultiPaneInputs } from '@components/form'
import { RichText } from '@components/sanity'
import { sendGoogleEvent } from '@lib/util/analytics'

export const Header: FC<HeaderProps> = ({
  waitlistId,
  waitlistHeader,
  waitlistCopy,
  waitlistSuccess,
  waitlistUnits,
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

        <div className="flex items-center gap-[1.12rem] md:gap-16">
          <Modal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)}>
            <div className="flex flex-col max-w-md h-full py-6 md:py-10 pl-x md:pl-10">
              <Form
                formType={'general'}
                audienceId={waitlistId}
                successMessage={waitlistSuccess}
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
                className="w-full h-full"
              >
                <MultiPaneInputs
                  header={waitlistHeader}
                  copy={waitlistCopy}
                  unitGroups={waitlistUnits}
                  buttonCopy="Join waitlist"
                  className={classNames('h-full')}
                />
              </Form>
            </div>
          </Modal>

          <Btn
            type="button"
            onClick={() => {
              setWaitlistOpen(true)
              // sendGoogleEvent('opened waitlist modal')
            }}
            className="pointer-events-auto flex pt-[5.5px] pb-[5px] px-[5.5px] md:pt-[8px] md:pb-[7px] md:px-[7px] bg-black text-white leading-[11px] uppercase z-header"
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
