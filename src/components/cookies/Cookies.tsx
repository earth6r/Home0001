import {
  useCookiesPrefs,
  useFunctionalPref,
  useLocalCookies,
} from '@contexts/cookies'
import classNames from 'classnames'
import { useState, type FC, type HTMLProps, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { AnimatePresence, motion } from 'framer-motion'
import { Dialog, Switch } from '@headlessui/react'
import {
  RichText as RichTextType,
  SanityKeyed,
} from '@studio/gen/sanity-schema'
import { RichText } from '@components/sanity'
import { Accordion, AccordionProps } from '@components/accordion'
import { disableGoogleEvents } from '@lib/util'
import IconSmallArrow from '@components/icons/IconSmallArrow'

interface CookieProps extends AccordionProps {
  setSetting: (type: string, active: boolean) => void
}

type CookiesProps = {
  copy?: RichTextType
  accordions?: Array<SanityKeyed<AccordionProps>>
}

interface CookiesDialogProps extends CookiesProps {
  open: boolean
  accordions?: Array<SanityKeyed<AccordionProps>>
  acceptAnalytics: () => void
  declineAnalytics: () => void
  declineFunctional: () => void
  close: () => void
}

const CookieSetting: FC<CookieProps> = ({
  header,
  firstIndex,
  largeHeader,
  initialText,
  text,
  cta,
  setSetting,
}) => {
  const [settingOn, setSettingOn] = useState(true)

  return (
    <div className="flex w-full gap-x mt-yhalf">
      <Accordion
        header={header}
        largeHeader={largeHeader}
        initialText={initialText}
        text={text}
        cta={cta}
        className="w-full max-w-[calc(100%-60px)] md:w-[calc(50%-var(--space-x-half))]"
      />
      <Switch
        disabled={firstIndex}
        onChange={() => {
          setSettingOn(!settingOn)
          if (header) setSetting(header, settingOn)
        }}
        className={classNames(
          settingOn ? 'bg-black' : 'bg-gray',
          firstIndex ? 'opacity-30' : 'opacity-100',
          `relative inline-flex h-6 w-11 items-center rounded-full pointer-events-auto`
        )}
      >
        {' '}
        <span
          className={classNames(
            settingOn ? 'translate-x-6' : 'translate-x-1',
            `block h-4 w-4 transform rounded-full bg-white transition`
          )}
        />
      </Switch>
    </div>
  )
}

const CookiesDialog: FC<CookiesDialogProps> = ({
  copy,
  accordions,
  open,
  acceptAnalytics,
  declineAnalytics,
  declineFunctional,
  close,
}) => {
  const [cookiesSettings, setCookiesSettings] = useState({
    analytics: true,
    functional: true,
  })

  const updateCookiesSetting = (type: string, active: boolean) => {
    if (type.toLowerCase() === 'analytics') {
      setCookiesSettings({ ...cookiesSettings, analytics: active })
    } else if (type.toLowerCase() === 'functional') {
      setCookiesSettings({ ...cookiesSettings, functional: active })
    }
  }

  const submitChoices = () => {
    if (cookiesSettings.analytics) {
      acceptAnalytics()
    } else {
      declineAnalytics()
    }

    if (!cookiesSettings.functional) {
      declineFunctional()
    }
  }

  return (
    <Dialog open={open} onClose={close}>
      <div className="fixed w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 bg-black opacity-40 z-header"></div>
      <Dialog.Panel className="fixed w-full md:max-w-[680px] h-[100svh] md:h-[75vh] md:max-h-[636px] top-0 md:top-1/2 md:transform md:-translate-y-1/2 py-xdouble px-x left-0 md:left-1/2 md:-translate-x-1/2 right-0 bg-white border-black overflow-scroll z-menu">
        {copy && (
          <div>
            <RichText blocks={copy} className="mt-ydouble" />
          </div>
        )}

        <div className="block mt-y">
          {accordions &&
            accordions.length > 0 &&
            accordions.map((accordion, index) => (
              <CookieSetting
                key={accordion._key}
                firstIndex={index === 0}
                setSetting={updateCookiesSetting}
                {...accordion}
              />
            ))}
        </div>

        <div className="grid grid-cols-2 gap-x w-full mt-y">
          <button
            className="flex justify-between items-center h-btn px-x text-button bg-black text-white"
            onClick={() => {
              declineAnalytics
              declineFunctional
            }}
          >
            {`Reject`}
            <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
          </button>
          <button
            className="flex justify-between items-center h-btn px-x text-button bg-black text-white"
            onClick={() => submitChoices()}
          >
            <div>
              <span>{`Confirm`}</span>
              <span className="hidden sm:inline-block">&nbsp;{`choices`}</span>
            </div>
            <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
          </button>
        </div>

        <button
          className="absolute flex justify-between w-full top-x left-0 px-x text-button"
          onClick={close}
        >
          <span>HOME0001</span>
          <span>Close</span>
        </button>
      </Dialog.Panel>
    </Dialog>
  )
}

export const Cookies: FC<CookiesProps & HTMLProps<HTMLDivElement>> = ({
  copy,
  accordions,
}) => {
  const [functionalActive, setFunctionalActive] = useFunctionalPref()
  const [cookies, setCookie, removeCookie] = useCookies(['hubspotutk'])
  const [hutk, setHutk] = useLocalCookies()
  const [showPrefs, setShowPrefs] = useCookiesPrefs()
  const [showBanner, setShowBanner] = useState(false)
  let [dialogOpen, setDialogOpen] = useState(showPrefs)

  const closeModal = () => {
    // layout updates
    setDialogOpen(false)
    setShowPrefs(false)
  }

  const acceptCookies = () => {
    setHutk(cookies.hubspotutk)
    sessionStorage.setItem('cookieStorage', 'true')
    sessionStorage.setItem('allowAnalytics', 'true')
    setShowBanner(false)
  }

  const declineCookies = () => {
    if (cookies.hubspotutk) {
      removeCookie('hubspotutk')
    }
    sessionStorage.setItem('cookieStorage', 'true')
    // turn off gtag and other analytics
    disableGoogleEvents()
    sessionStorage.setItem('allowAnalytics', 'false')
    closeModal()
    setShowBanner(false)
  }

  const declineFunctional = () => {
    setFunctionalActive(false)
    sessionStorage.removeItem('firstTime')
    sessionStorage.removeItem('allowAnalytics')
    sessionStorage.removeItem('routes')
    sessionStorage.removeItem('cookieStorage')
    sessionStorage.removeItem('query')
  }

  useEffect(() => {
    setDialogOpen(showPrefs)
  }, [showPrefs])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.getItem('cookieStorage') === 'true'
        ? setShowBanner(false)
        : sessionStorage.getItem('firstTime') === 'false'
        ? setShowBanner(true)
        : setTimeout(() => setShowBanner(true), 2400)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        style={{
          opacity: showBanner ? 1 : 0,
          transition: `opacity 100ms ease-in-out`,
        }}
        className={classNames(
          'flex justify-between items-center fixed w-full bottom-y px-x font-medium font-sansText text-[13px] xs:text-base z-modal'
        )}
      >
        {!dialogOpen && (
          <>
            <span>{`We use cookies`}</span>
            <div className="flex items-center gap-xhalf">
              <button
                className="uppercase"
                onClick={() => acceptCookies()}
              >{`Accept`}</button>
              <span>{`/`}</span>
              <button
                className="uppercase"
                onClick={() => {
                  declineCookies()
                  declineFunctional()
                }}
              >
                {`Reject`}
              </button>
              <span>{`/`}</span>
              <button
                className="uppercase"
                onClick={() => setDialogOpen(true)}
              >{`Settings`}</button>
            </div>
          </>
        )}

        <CookiesDialog
          copy={copy}
          accordions={accordions}
          open={dialogOpen}
          acceptAnalytics={acceptCookies}
          declineAnalytics={declineCookies}
          declineFunctional={declineFunctional}
          close={closeModal}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default Cookies
