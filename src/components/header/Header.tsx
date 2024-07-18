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
import { RichText } from '@components/sanity'
import { useLenis } from '@studio-freight/react-lenis'
import { IconWaitlist } from '@components/icons'

export const Header: FC<HeaderProps> = ({
  waitlist,
  inquiry,
  path,
  hideMenu,
  hideMenuButton,
  showTourLink,
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
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const el = useRef<HTMLElement>(null)
  const [lastScrolled, setLastScrolled] = useState(0)
  const [hideBreadcrumb, setHideBreadcrumb] = useState(false)

  const openWaitlist = () => {
    setWaitlistOpen(true)
    const options = { location: window.location.pathname }
    sendGoogleEvent('opened waitlist modal', options)
  }

  const onClose = () => {
    setWaitlistOpen(false)
    setFormSubmitted(false)
    reset({})
  }

  const onInquiryClose = () => {
    setInquiryOpen(false)
    setFormSubmitted(false)
    reset({})
  }

  const onBrokerInquiryClose = () => {
    setBrokerInquiryOpen(false)
    setFormSubmitted(false)
    reset({})
  }

  const lenis = useLenis(() => {
    if (lenis.direction !== 1 || lenis.targetScroll <= 0) {
      setHideBreadcrumb(false)
    } else {
      setHideBreadcrumb(true)
    }
  })

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
        menuOpen || waitlistOpen || inquiryOpen || brokerInquiryOpen
          ? 'z-menu'
          : 'z-header',
        'fixed w-full pointer-events-none font-medium text-xs'
      )}
    >
      <header
        ref={el}
        role="banner"
        className="flex justify-between items-center relative w-full h-header px-x"
      >
        <div className="flex items-baseline">
          <Logo
            className={classNames(
              hideBreadcrumb ? 'opacity-0' : '',
              'flex items-center h-header pointer-events-auto transition-opacity duration-200'
            )}
          />

          {(path?.includes('property') || path?.includes('unit')) && (
            <span
              className={classNames(
                hideBreadcrumb ? 'opacity-0' : '',
                'transition-opacity duration-200'
              )}
            >
              :
            </span>
          )}

          {path?.includes('unit') && (
            <Link
              href={`/property/${
                (property as unknown as Property)?.slug?.current
              }`}
            >
              <span
                className={classNames(
                  hideBreadcrumb ? 'opacity-0' : '',
                  'uppercase pointer-events-auto transition-opacity duration-200'
                )}
              >
                &nbsp;{`${(property as unknown as Property)?.headerText}`}
              </span>
            </Link>
          )}

          {path?.includes('unit') && (
            <span
              className={classNames(
                hideBreadcrumb ? 'opacity-0' : '',
                'transition-opacity duration-200'
              )}
            >
              :
            </span>
          )}
          {(path?.includes('property') || path?.includes('unit')) && (
            <span
              className={classNames(
                hideBreadcrumb ? 'opacity-0' : '',
                'uppercase transition-opacity duration-200'
              )}
            >
              &nbsp;{`${currentTitle}`}
            </span>
          )}
        </div>

        <div className={classNames('flex items-center gap-[1rem] md:gap-5')}>
          <AnimatedModal isOpen={waitlistOpen} onClose={onClose}>
            <div className="flex flex-col max-w-md md:max-w-none h-full pt-20 md:py-ydouble pl-x md:pl-10 pr-menu">
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
                  isSubmitting={isSubmitting}
                  register={register}
                  className={classNames('h-full')}
                  trigger={trigger}
                  formValues={getValues}
                />
              </Form>
            </div>
          </AnimatedModal>

          <AnimatedModal isOpen={inquiryOpen} onClose={onInquiryClose}>
            <div className="flex flex-col max-w-md md:max-w-none h-[calc(100%-var(--btn-height)-[6rem])] md:h-full py-y md:py-ydouble pl-x md:pl-10">
              <h2 className="text-h3 pt-page md:pt-0 md:mb-y">
                {formSubmitted ? inquiry?.success || `Thanks!` : `Inquire`}
              </h2>

              <div className="md:grid md:grid-cols-2 md:pr-menu">
                <p className="my-ydouble md:my-0 text-md pr-menu md:pr-0">
                  {formSubmitted
                    ? `We’ll be in touch with information on ${state.unit?.title} and on how to schedule a tour.`
                    : inquiry?.copy ||
                      `For more information and to schedule a tour:`}
                </p>

                {!formSubmitted && (
                  <Form
                    formType="unit"
                    audienceId={inquiry?.id}
                    formSubmitted={formSubmitted}
                    handleSubmit={handleSubmit}
                    setFormSubmitted={setFormSubmitted}
                    className="w-full h-full"
                  >
                    <SinglePaneInputs
                      isSubmitting={isSubmitting}
                      fields={{ showName: true, showPhone: true }}
                      register={register}
                      modal={true}
                      className={classNames('h-full pr-menu md:pr-0')}
                    />
                  </Form>
                )}
              </div>
            </div>
          </AnimatedModal>

          <AnimatedModal
            isOpen={brokerInquiryOpen}
            onClose={onBrokerInquiryClose}
          >
            <div className="flex flex-col max-w-md md:max-w-none h-[calc(100%-var(--btn-height)-[6rem])] md:h-full py-y md:py-ydouble pl-x md:pl-10">
              <div className="pt-page mb-ydouble md:pr-menu lg:pr-fullmenu">
                {formSubmitted ? (
                  <>
                    {inquiry?.brokerSuccess ? (
                      <RichText blocks={inquiry?.brokerSuccess} />
                    ) : (
                      <p className="text-md font-bold">{`We'll be in touch with more information soon!`}</p>
                    )}
                  </>
                ) : (
                  <>
                    {inquiry?.brokerCopy ? (
                      <RichText blocks={inquiry?.brokerCopy} className="bold" />
                    ) : (
                      <p className="text-md font-bold">{`For more information and to schedule a tour:`}</p>
                    )}
                  </>
                )}
              </div>

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
                    isSubmitting={isSubmitting}
                    fields={{ showName: true }}
                    register={register}
                    modal={true}
                    className={classNames('h-full pr-menu')}
                  />
                </Form>
              )}
            </div>
          </AnimatedModal>

          {!hideMenuButton && (
            <>
              {showTourLink ? (
                <Btn
                  type="button"
                  className={classNames(
                    headerLinksShown ? 'opacity-100' : 'opacity-0',
                    'flex p-3 -m-3 pointer-events-auto z-header transition-opacity duration-200'
                  )}
                  onClick={() => {
                    window.open(
                      'https://www.home0001.com/schedule-phone-call',
                      '_blank'
                    )
                  }}
                >
                  <div className="px-[6px] h-[26px] flex justify-center items-center bg-black text-white leading-none font-medium uppercase">
                    <IconSmallArrow width="16" className="mr-[5px]" />
                    {`Schedule a call`}
                  </div>
                </Btn>
              ) : (
                <Btn
                  type="button"
                  onClick={openWaitlist}
                  className={classNames(
                    headerLinksShown ? 'opacity-100' : 'opacity-0',
                    'flex p-3 -m-3 pointer-events-auto z-header transition-all duration-200'
                  )}
                >
                  <IconWaitlist className="w-[96.85px] md:w-[93px] mt-[3px] md:mt-[4px]" />
                </Btn>
              )}
            </>
          )}

          {!hideMenu && (
            <HeaderMenu
              customOpen={menuOpen}
              setCustomOpen={setMenuOpen}
              onOpen={onOpen}
              mainMenu={mainMenu as SanityMenu}
              className="flex flex-col pointer-events-auto"
            />
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
