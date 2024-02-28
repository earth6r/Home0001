import { useLocalCookies } from '@contexts/cookies'
import classNames from 'classnames'
import { useState, type FC, type HTMLProps, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { AnimatePresence, motion } from 'framer-motion'

type CookiesProps = {}

export const Cookies: FC<CookiesProps & HTMLProps<HTMLDivElement>> = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['hubspotutk'])
  const [hutk, setHutk] = useLocalCookies()
  const [showBanner, setShowBanner] = useState(false)

  const acceptCookies = () => {
    setHutk(cookies.hubspotutk)
    sessionStorage.setItem('cookieStorage', 'true')
    setShowBanner(false)
  }

  const ignoreCookies = () => {
    if (cookies.hubspotutk) {
      removeCookie('hubspotutk')
    }
    sessionStorage.setItem('cookieStorage', 'true')
    setShowBanner(false)
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
          transition: `opacity 0.2s ease-in-out`,
        }}
        className={classNames(
          'flex justify-between fixed w-full bottom-y px-x font-medium font-sansText z-modal'
        )}
      >
        <span>{`We use cookies`}</span>
        <div className="flex gap-xhalf">
          <button
            className="uppercase"
            onClick={() => acceptCookies()}
          >{`Accept`}</button>
          <span>{`/`}</span>
          <button
            className="uppercase"
            onClick={() => ignoreCookies()}
          >{`Ignore`}</button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Cookies
