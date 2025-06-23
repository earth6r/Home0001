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
import { Form, SinglePaneInputs } from '@components/form'
import { useForm } from 'react-hook-form'
import {
  useInquiryModal,
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
import { PropertyList } from '@components/property'
import { Inventory } from '@components/inventory'
import IconConnect from '@components/icons/IconConnect'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const Header: FC<HeaderProps> = ({
  inquiry,
  path,
  hideMenu,
  hideMenuButton,
  hidePageLinks,
  showTourLink,
  currentTitle,
  property,
  applyLink,
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

  const [availableOpen, setAvailableOpen] = useAvailableModal()
  const [inventoryOpen, setInventoryOpen] = useInventoryModal()

  const [inquiryOpen, setInquiryOpen] = useInquiryModal()
  const [brokerInquiryOpen, setBrokerInquiryOpen] = useBrokerInquiryModal()
  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const el = useRef<HTMLElement>(null)
  const [showRdImage, setShowRdImage] = useState(false)
  const [hideBreadcrumb, setHideBreadcrumb] = useState(false)

  const { scrollYProgress } = useScroll()

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080])

  const onClose = () => {
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
        menuOpen || inquiryOpen || brokerInquiryOpen
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
            href={BASE_URL}
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
                // <Link
                //   href={'https://dashboard.home0001.com'}
                //   className={classNames(
                //     headerLinksShown ? 'opacity-100' : 'opacity-0',
                //     'flex p-3 -m-3 pointer-events-auto z-header transition-all duration-200'
                //   )}
                // >
                //   <IconConnect className="w-[118px]" />
                // </Link>
                <SanityLink
                  {...(applyLink as SanityLinkType)}
                  className={classNames(
                    headerLinksShown ? 'opacity-100' : 'opacity-0',
                    'flex p-3 -m-3 pointer-events-auto z-header transition-all duration-200'
                  )}
                >
                  <IconConnect className="w-[118px]" />
                </SanityLink>
              )}
            </>
          )}

          {!hideMenu && (
            <HeaderMenu
              customOpen={menuOpen}
              setCustomOpen={setMenuOpen}
              onOpen={onOpen}
              mainMenu={mainMenu as SanityMenu}
              hidePageLinks={hidePageLinks}
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

          <AnimatedModal isOpen={inquiryOpen} onClose={onInquiryClose}>
            <div className="flex flex-col max-w-md md:max-w-none h-[calc(100%-var(--btn-height)-[6rem])] lg:h-full py-y md:py-ydouble pl-x">
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
            <div className="flex flex-col max-w-md md:max-w-none h-[calc(100%-var(--btn-height)-[6rem])] lg:h-full py-y md:py-ydouble pl-x md:pl-10">
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
                  successMessage={inquiry?.success}
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
              <Inventory
                inventory={inventory}
                className="pt-header pb-[6rem] md:pb-ydouble px-x h-full flex flex-col text-sm overflow-y-scroll pointer-events-auto"
              />
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
              <PropertyList
                header=""
                properties={properties}
                className="w-full pt-header pb-[6rem] md:pb-ydouble px-x h-full flex flex-col text-sm overflow-y-scroll pointer-events-auto"
              />
            </Modal>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
