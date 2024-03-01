import { useLocalCookies } from '@contexts/cookies'
import classNames from 'classnames'
import { useState, type FC, type HTMLProps, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { AnimatePresence, motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { RichText } from '@components/sanity'
import { IconX } from '@components/icons'

type CookiesProps = {
  copy?: RichTextType
}

interface CookiesDialogProps extends CookiesProps {
  open: boolean
  accept: () => void
  decline: () => void
}

const CookiesDialog: FC<CookiesDialogProps> = ({
  copy,
  open,
  accept,
  decline,
}) => {
  return (
    <Dialog open={open} onClose={decline}>
      <Dialog.Panel className="fixed xl:max-w-[1280px] bottom-y py-xdouble px-x m-x md:m-xdouble xl:mx-auto left-0 right-0 bg-white border-black z-menu">
        {copy && (
          <Dialog.Description>
            <RichText blocks={copy} className="mt-yhalf" />
          </Dialog.Description>
        )}

        <div className="flex justify-end w-full mt-y gap-x">
          <button className="text-button" onClick={accept}>
            Accept
          </button>
          <button className="text-button" onClick={decline}>
            Decline
          </button>
        </div>

        <button
          className="absolute top-x right-x text-button"
          onClick={decline}
        >
          <IconX className="w-xhalf" />
        </button>
      </Dialog.Panel>
    </Dialog>
  )
}

export const Cookies: FC<CookiesProps & HTMLProps<HTMLDivElement>> = ({
  copy,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['hubspotutk'])
  const [hutk, setHutk] = useLocalCookies()
  const [showBanner, setShowBanner] = useState(false)
  let [dialogOpen, setDialogOpen] = useState(false)

  const acceptCookies = () => {
    setHutk(cookies.hubspotutk)
    sessionStorage.setItem('cookieStorage', 'true')
    setShowBanner(false)
    setDialogOpen(false)
  }

  const declineCookies = () => {
    if (cookies.hubspotutk) {
      removeCookie('hubspotutk')
    }
    sessionStorage.setItem('cookieStorage', 'true')
    setShowBanner(false)
    setDialogOpen(false)
  }

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
              >{`More`}</button>
            </div>
          </>
        )}

        <CookiesDialog
          copy={copy}
          open={dialogOpen}
          accept={acceptCookies}
          decline={declineCookies}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default Cookies
