import { useLocalCookies } from '@contexts/cookies'
import classNames from 'classnames'
import { useState, type FC, type HTMLProps, useEffect } from 'react'
import { useCookies } from 'react-cookie'

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
        : setShowBanner(true)
    }
  }, [])

  return (
    <div
      className={classNames(
        showBanner ? 'flex' : 'hidden',
        'justify-between fixed w-full bottom-y px-x font-medium font-sansText z-modal'
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
    </div>
  )
}

export default Cookies
