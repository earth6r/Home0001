import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import type { HeaderProps } from './types'
import { Logo } from '@components/logos'
import HeaderMenu from './HeaderMenu'
import type { Property, Menus as SanityMenu } from '@gen/sanity-schema'
import { Btn } from '@components/btns'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { AnimatedModal, Modal } from '@components/modal'
import { Form, MultiPaneInputs } from '@components/form'
import { sendGoogleEvent } from '@lib/util/analytics'
import { useForm } from 'react-hook-form'
import { useWaitlisModal } from '@contexts/modals'
import Link from 'next/link'
import { useHeaderLinks } from '@contexts/header'
import { useRouter } from 'next/router'

export const Header: FC<HeaderProps> = ({
  waitlistId,
  waitlistHeader,
  waitlistCopy,
  waitlistSuccess,
  path,
  currentTitle,
  property,
  mainMenu,
  className,
}) => {
  const router = useRouter()
  const onOpen = useCallback((open: boolean) => setMenuOpen(open), [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()
  const { register, handleSubmit, reset, trigger } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const el = useRef<HTMLElement>(null)

  const openWaitlist = () => {
    setWaitlistOpen(true)
    const options = { location: window.location.pathname }
    sendGoogleEvent('opened waitlist modal', options)
  }

  const onClose = () => {
    setWaitlistOpen(false)
    reset({})
  }

  useEffect(() => {
    if (router.asPath !== '/') {
      setHeaderLinksShown(true)
    }
  }, [])

  return (
    <div
      id="header"
      className={classNames(
        className,
        'fixed w-full pointer-events-none font-medium tracking-details text-xs z-header'
      )}
    >
      <header
        ref={el}
        role="banner"
        className="flex justify-between items-center relative w-full h-header px-x"
      >
        <div className="flex items-baseline">
          <Logo className="flex items-center h-header pointer-events-auto" />

          {(path?.includes('property') || path?.includes('unit')) && (
            <span>:</span>
          )}

          {path?.includes('unit') && (
            <Link
              href={`/property/${
                (property as unknown as Property)?.slug?.current
              }`}
            >
              <span className="uppercase pointer-events-auto">
                &nbsp;{`${(property as unknown as Property)?.headerText}`}
              </span>
            </Link>
          )}

          {path?.includes('unit') && <span>:</span>}
          {(path?.includes('property') || path?.includes('unit')) && (
            <span className="uppercase">&nbsp;{`${currentTitle}`}</span>
          )}
        </div>

        <div className={classNames('flex items-center gap-[1.12rem] md:gap-5')}>
          <AnimatedModal isOpen={waitlistOpen} onClose={onClose}>
            <div className="flex flex-col max-w-md h-full py-6 md:py-10 pl-x md:pl-10">
              <Form
                formType={'modal'}
                audienceId={waitlistId}
                successMessage={waitlistSuccess}
                formSubmitted={formSubmitted}
                handleSubmit={handleSubmit}
                setFormSubmitted={setFormSubmitted}
                className="w-full h-full"
              >
                <MultiPaneInputs
                  header={waitlistHeader}
                  copy={waitlistCopy}
                  buttonCopy="Join waitlist"
                  register={register}
                  className={classNames('h-full')}
                  trigger={trigger}
                />
              </Form>
            </div>
          </AnimatedModal>

          <Btn
            type="button"
            onClick={openWaitlist}
            className={classNames(
              headerLinksShown ? 'opacity-100' : 'opacity-0',
              'flex p-3 -m-3 pointer-events-auto z-header transition-all duration-100'
            )}
          >
            <div className="w-[100px] h-[25px] flex justify-center items-center bg-black text-white leading-none font-medium uppercase">
              <IconSmallArrow width="16" className="mr-[5px]" />
              {`Waitlist`}
            </div>
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
