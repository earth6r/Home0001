import type { FC } from 'react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import type { HeaderProps } from './types'
import { Logo } from '@components/logos'
import HeaderMenu from './HeaderMenu'
import type { Property, Menus as SanityMenu } from '@gen/sanity-schema'
import { Btn } from '@components/btns'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { AnimatedModal } from '@components/modal'
import { Form, MultiPaneInputs, SinglePaneInputs } from '@components/form'
import { sendGoogleEvent } from '@lib/util/analytics'
import { useForm } from 'react-hook-form'
import {
  useInquiryModal,
  useWaitlisModal,
  useBrokerInquiryModal,
} from '@contexts/modals'
import Link from 'next/link'
import { useHeaderLinks } from '@contexts/header'
import { useRouter } from 'next/router'
import { HomeContext } from '@contexts/home'

export const Header: FC<HeaderProps> = ({
  waitlist,
  inquiry,
  path,
  currentTitle,
  property,
  mainMenu,
  className,
}) => {
  const router = useRouter()
  const { state, dispatch } = useContext(HomeContext)
  const onOpen = useCallback((open: boolean) => setMenuOpen(open), [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  const [inquiryOpen, setInquiryOpen] = useInquiryModal()
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()
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

  const onInquiryClose = () => {
    setInquiryOpen(false)
    reset({})
  }
  const onBrokerInquiryClose = () => {
    setBrokerInquiryOpen(false)
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
            <div className="flex flex-col max-w-md md:max-w-none h-full py-6 md:py-10 pl-x md:pl-10">
              <Form
                formType={'modal'}
                audienceId={waitlist?.id}
                successMessage={waitlist?.success}
                formSubmitted={formSubmitted}
                handleSubmit={handleSubmit}
                setFormSubmitted={setFormSubmitted}
                className="w-full h-full"
              >
                <MultiPaneInputs
                  header={waitlist?.header}
                  copy={waitlist?.copy}
                  buttonCopy="Join waitlist"
                  register={register}
                  className={classNames('h-full')}
                  trigger={trigger}
                />
              </Form>
            </div>
          </AnimatedModal>

          <AnimatedModal isOpen={inquiryOpen} onClose={onInquiryClose}>
            <div className="flex flex-col max-w-md md:max-w-none h-[calc(100%-var(--btn-height)-[6rem])] md:h-full py-6 md:py-10 pl-x md:pl-10">
              <h2 className="text-xl font-bold uppercase pt-page">
                {formSubmitted ? inquiry?.success || `Thanks!` : `Inquire`}
              </h2>

              <p className="my-ylg text-md pr-menu">
                {formSubmitted
                  ? `We’ll be in touch with information on ${state.unit?.title} and on how to schedule a tour.`
                  : inquiry?.copy ||
                    `For more information and to schedule a tour:`}
              </p>

              {!formSubmitted && (
                <Form
                  formType={'modal'}
                  audienceId={inquiry?.id}
                  //! why does this say waitlist success?
                  successMessage={waitlist?.success}
                  formSubmitted={formSubmitted}
                  handleSubmit={handleSubmit}
                  setFormSubmitted={setFormSubmitted}
                  className="w-full h-full"
                >
                  <SinglePaneInputs
                    fields={{ showName: true, showPhone: true }}
                    register={register}
                    modal={true}
                    className={classNames('h-full pr-menu')}
                  />
                </Form>
              )}
            </div>
          </AnimatedModal>

          <AnimatedModal
            isOpen={brokerInquiryOpen}
            onClose={onBrokerInquiryClose}
          >
            <div className="flex flex-col max-w-md md:max-w-none h-[calc(100%-var(--btn-height)-[6rem])] md:h-full py-6 md:py-10 pl-x md:pl-10">
              <h2 className="text-xl font-bold uppercase pt-page">
                {formSubmitted
                  ? `Thanks for reaching out.  We will be in touch!`
                  : `Join our brokerage program`}
              </h2>

              <p className="my-ylg text-md pr-menu">
                {formSubmitted
                  ? `We’ll be in touch with information soon!`
                  : inquiry?.brokerCopy ||
                    `For more information and to schedule a tour:`}
              </p>

              {!formSubmitted && (
                <Form
                  formType={'broker'}
                  audienceId={inquiry?.brokerId}
                  successMessage={waitlist?.success}
                  formSubmitted={formSubmitted}
                  handleSubmit={handleSubmit}
                  setFormSubmitted={setFormSubmitted}
                  className="w-full h-full"
                >
                  <SinglePaneInputs
                    fields={{ showName: true, showPhone: true }}
                    register={register}
                    modal={true}
                    className={classNames('h-full pr-menu')}
                  />
                </Form>
              )}
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
