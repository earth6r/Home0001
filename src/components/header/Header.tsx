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
  useAvailableModal,
  useInventoryModal,
} from '@contexts/modals'
import Link from 'next/link'
import { useHeaderLinks } from '@contexts/header'
import { useRouter } from 'next/router'
import { HomeContext } from '@contexts/home'
import { RichText, SanityImage, SanityLink } from '@components/sanity'
import { useLenis } from '@studio-freight/react-lenis'
import { IconWaitlist } from '@components/icons'
import { SanityLinkType } from '@studio/lib'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Modal } from '@components/modal'
import posthog from 'posthog-js'
import { TypedObject } from 'sanity'

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
  title,
  rdSettings,
  inventory,
  properties,
  className,
}) => {
  const router = useRouter()
  const { state, dispatch } = useContext(HomeContext)
  const onOpen = useCallback((open: boolean) => setMenuOpen(open), [])
  const [menuOpen, setMenuOpen] = useState(false)

  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  const [availableOpen, setAvailableOpen] = useAvailableModal()
  const [inventoryOpen, setInventoryOpen] = useInventoryModal()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const [inquiryOpen, setInquiryOpen] = useInquiryModal()
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()
  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const el = useRef<HTMLElement>(null)
  const [showRdImage, setShowRdImage] = useState(false)
  const [hideBreadcrumb, setHideBreadcrumb] = useState(false)

  const { scrollYProgress } = useScroll()

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080])

  const openWaitlist = () => {
    setWaitlistOpen(true)
    const options = { location: window.location.pathname }
    sendGoogleEvent('opened waitlist modal', options)

    if (typeof window !== undefined) {
      document.body.style.overflow = 'hidden'
    }
  }

  const onClose = () => {
    setWaitlistOpen(false)
    setFormSubmitted(false)
    reset({})

    if (typeof window !== undefined) {
      document.body.style.overflow = 'scroll'
    }
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

    if (lenis.targetScroll > 250) {
      setShowRdImage(true)
    } else {
      setShowRdImage(false)
    }
  })

  useEffect(() => {
    if (router.asPath !== '/') {
      setHeaderLinksShown(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      id="header"
      className={classNames(
        className,
        menuOpen || waitlistOpen || inquiryOpen || brokerInquiryOpen
          ? 'z-menu'
          : 'z-header transition-z delay-300',
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
            content={title}
            className={classNames(
              hideBreadcrumb ? '-translate-y-[46px]' : 'translate-y-0',
              'flex items-center relative h-header pointer-events-auto transform transition-transform duration-200'
            )}
          />

          {(path?.includes('property') || path?.includes('property-type')) && (
            <span
              className={classNames(
                hideBreadcrumb ? '-translate-y-[46px]' : 'translate-y-0',
                'hidden sm:inline-block relative transform transition-transform duration-200'
              )}
            >
              :
            </span>
          )}

          {path?.includes('property-type') && (
            <Link
              href={`/property/${
                (property as unknown as Property)?.slug?.current
              }`}
            >
              <span
                className={classNames(
                  hideBreadcrumb ? '-translate-y-[46px]' : 'translate-y-0',
                  'hidden sm:inline-block relative uppercase pointer-events-auto transform transition-transform duration-200'
                )}
              >
                &nbsp;{`${(property as unknown as Property)?.headerText}`}
              </span>
            </Link>
          )}

          {path?.includes('property-type') && (
            <span
              className={classNames(
                hideBreadcrumb ? '-translate-y-[46px]' : 'translate-y-0',
                'hidden sm:inline-block relative transform transition-transform duration-200'
              )}
            >
              :
            </span>
          )}
          {(path?.includes('property') || path?.includes('property-type')) && (
            <span
              className={classNames(
                hideBreadcrumb ? '-translate-y-[46px]' : 'translate-y-0',
                'hidden sm:inline-block relative uppercase transform transition-transform duration-200'
              )}
            >
              &nbsp;{`${currentTitle}`}
            </span>
          )}
        </div>

        <div className={classNames('flex items-center gap-[1rem] md:gap-5')}>
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
                      'https://www.home0001.com/schedule-call',
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
                  <IconWaitlist className="w-[77px] mt-[3px] md:mt-[4px]" />
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

          {hideMenu && rdSettings?.image && (
            <motion.div
              style={{ rotate }}
              transition={{ type: 'spring' }}
              className={classNames(
                showRdImage ? 'opacity-100' : 'opacity-0',
                'flex-inline w-auto origin-center pointer-events-auto transition-opacity duration-200'
              )}
            >
              <SanityLink
                {...(rdSettings.link as SanityLinkType)}
                className="block leading-[0]"
              >
                <SanityImage
                  asset={rdSettings.image.asset}
                  props={{
                    alt: 'Smiley',
                    quality: 100,
                    sizes: '88px',
                  }}
                  className="relative w-[24px] h-[24px] object-contain"
                />
              </SanityLink>
            </motion.div>
          )}

          <AnimatedModal isOpen={waitlistOpen} onClose={onClose}>
            <div className="flex flex-col max-w-md md:max-w-none h-[calc(100svh-var(--space-y))] md:h-full py-y  pl-x lg:pl-x pr-menu overflow-scroll">
              <Form
                formType={'modal'}
                audienceId={waitlist?.id}
                successMessage={waitlist?.success}
                formSubmitted={formSubmitted}
                handleSubmit={handleSubmit}
                setFormSubmitted={setFormSubmitted}
                className="w-full h-full pr-x"
              >
                <MultiPaneInputs
                  header={waitlist?.header}
                  copy={waitlist?.copy}
                  showConsent={waitlist?.showConsent}
                  consentCopy={waitlist?.consentCopy}
                  buttonCopy="Apply"
                  isSubmitting={isSubmitting}
                  errors={errors}
                  control={control}
                  register={register}
                  className={classNames('h-full')}
                  trigger={trigger}
                  formValues={getValues}
                />
              </Form>
            </div>
          </AnimatedModal>

          <AnimatedModal isOpen={inquiryOpen} onClose={onInquiryClose}>
            <div className="flex flex-col max-w-md md:max-w-none h-[calc(100%-var(--btn-height)-[6rem])] md:h-full py-y md:py-ydouble pl-x">
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

          {inventory && (
            <Modal
              title="Inventory"
              isOpen={inventoryOpen}
              onClose={() => {
                setInventoryOpen(false)
              }}
            >
              <div className="pt-header pb-[6rem] md:pb-ydouble px-x h-full flex flex-col text-sm overflow-y-scroll pointer-events-auto">
                <div className="flex flex-wrap gap-xhalf">
                  {inventory &&
                    inventory.items.map((item: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          activeIndex === index
                            ? setActiveIndex(null)
                            : setActiveIndex(index)
                        }}
                        className={classNames(
                          activeIndex === index
                            ? 'w-full text-black bg-gray duration-500'
                            : 'w-[calc(34.08%-var(--space-x-half))] xl:w-[calc(33.9%-var(--space-x-half))] text-white bg-black duration-500',
                          'flex items-center justify-center relative p-x aspect-square transition-[width]'
                        )}
                      >
                        <SanityImage
                          asset={item.image}
                          props={{ alt: 'Inventory Image', sizes: '400px' }}
                          className={classNames(
                            activeIndex === index ? 'opacity-100' : 'opacity-0',
                            'absolute w-full h-full aspect-square top-0 left-0 duration-500'
                          )}
                        />
                        <span
                          className={classNames(
                            activeIndex === index
                              ? 'top-xhalf duration-700'
                              : 'top-1/2 -translate-y-1/2 duration-700',
                            'p-xhalf absolute text-sm uppercase font-medium transform transition-all'
                          )}
                        >
                          {item.title}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </Modal>
          )}

          {properties && (
            <Modal
              title="Available Homes"
              isOpen={availableOpen}
              onClose={() => {
                setAvailableOpen(false)
              }}
            >
              <div className="w-full pt-header pb-[6rem] md:pb-ydouble px-x h-full flex flex-col text-sm overflow-y-scroll pointer-events-auto">
                <div className="flex flex-wrap gap-xhalf">
                  {properties &&
                    properties.map(({ longTitle, slug, available }) => {
                      return (
                        <div
                          key={`property-${slug?.current}`}
                          className={classNames(
                            available === false ? 'pointer-events-none' : '',
                            'w-full border-bottom--gray last-of-type:border-none'
                          )}
                        >
                          <Link
                            href={`/property/${slug?.current}`}
                            onClick={() => {
                              sendGoogleEvent('Click home property tile', {
                                tileProperty: slug.current,
                              })
                              posthog.capture('property_click', {
                                slug: slug.current,
                                route: router.asPath,
                              })
                            }}
                            className={classNames(
                              available === false ? 'opacity-40' : '',
                              'flex justify-between items-center gap-x relative w-full h-[59px]'
                            )}
                          >
                            <RichText
                              blocks={longTitle as TypedObject | TypedObject[]}
                              className={classNames(
                                available === false ? '' : 'underlined',
                                'w-[calc(100%-99px-var(--space-x))] uppercase line-clamp-2'
                              )}
                            />
                            {available !== false && (
                              <div
                                className={classNames(
                                  'inline-flex justify-between items-center w-[99px] relative px-[6px] pt-[4px] pb-[5px] bg-black text-white font-medium text-left uppercase'
                                )}
                              >
                                <IconSmallArrow
                                  className="relative w-[1em] mt-[0.1em]"
                                  fill="white"
                                />
                                <span className="leading-none">{`Explore`}</span>
                              </div>
                            )}
                          </Link>
                        </div>
                      )
                    })}
                </div>
              </div>
            </Modal>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
