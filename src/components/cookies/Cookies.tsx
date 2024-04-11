import { useCookiesPrefs, useLocalCookies } from '@contexts/cookies'
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

type CookiesProps = {
  copy?: RichTextType
  accordions?: Array<SanityKeyed<AccordionProps>>
}

interface CookiesDialogProps extends CookiesProps {
  open: boolean
  accordions?: Array<SanityKeyed<AccordionProps>>
  accept: () => void
  decline: () => void
}

const CookieSetting: FC<AccordionProps> = ({
  header,
  firstIndex,
  largeHeader,
  initialText,
  text,
  cta,
}) => {
  const [settingOn, setSettingOn] = useState(false)

  useEffect(() => {
    // do something if setting changes
  }, [settingOn])

  return (
    <div className="flex w-full gap-x mt-yhalf">
      <Accordion
        header={header}
        largeHeader={largeHeader}
        initialText={initialText}
        text={text}
        cta={cta}
        className="w-full md:w-[calc(50%-var(--space-x-half))]"
      />
      <Switch
        disabled={firstIndex ? true : false}
        onChange={() => setSettingOn(!settingOn)}
        className={classNames(
          settingOn ? 'bg-black' : 'bg-gray',
          firstIndex ? 'opacity-50' : 'opacity-100',
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
  accept,
  decline,
}) => {
  return (
    <Dialog open={open} onClose={decline}>
      <div className="fixed w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 bg-black opacity-40 z-header"></div>
      <Dialog.Panel className="fixed w-full md:max-w-[680px] h-[100svh] md:h-[75vh] md:max-h-[636px] top-0 md:top-1/2 md:transform md:-translate-y-1/2 py-xdouble px-x left-0 md:left-1/2 md:-translate-x-1/2 right-0 bg-white border-black overflow-scroll z-menu">
        {copy && (
          <Dialog.Description>
            <RichText blocks={copy} className="mt-ydouble" />
          </Dialog.Description>
        )}

        <div className="block">
          {accordions &&
            accordions.length > 0 &&
            accordions.map((accordion, index) => (
              <CookieSetting
                key={accordion._key}
                firstIndex={index === 0}
                {...accordion}
              />
            ))}
        </div>

        <div className="grid grid-cols-2 gap-x w-full mt-y">
          <button
            className="h-btn text-button bg-black text-white"
            onClick={decline}
          >
            Reject
          </button>
          <button
            className="h-btn text-button bg-black text-white"
            onClick={accept}
          >
            Confirm choices
          </button>
        </div>

        <button
          className="absolute flex justify-between w-full top-x left-0 px-x text-button"
          onClick={decline}
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
  const [cookies, setCookie, removeCookie] = useCookies(['hubspotutk'])
  const [hutk, setHutk] = useLocalCookies()
  const [showPrefs, setShowPrefs] = useCookiesPrefs()
  const [showBanner, setShowBanner] = useState(false)
  let [dialogOpen, setDialogOpen] = useState(showPrefs)

  const acceptCookies = () => {
    setHutk(cookies.hubspotutk)
    sessionStorage.setItem('cookieStorage', 'true')
    setShowBanner(false)
    setDialogOpen(false)
    setShowPrefs(false)
  }

  const declineCookies = () => {
    if (cookies.hubspotutk) {
      removeCookie('hubspotutk')
    }
    sessionStorage.setItem('cookieStorage', 'true')
    setShowBanner(false)
    setDialogOpen(false)
    setShowPrefs(false)
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
          'flex justify-between fixed w-full bottom-y px-x font-medium font-sansText z-modal'
        )}
      >
        {!dialogOpen && (
          <>
            <span>{`We use cookies`}</span>
            <div className="flex gap-xhalf">
              <button
                className="uppercase"
                onClick={() => acceptCookies()}
              >{`Accept`}</button>
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
          accept={acceptCookies}
          decline={declineCookies}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default Cookies
