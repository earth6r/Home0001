import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  load as loadIntercom,
  boot as bootIntercom,
  update as updateIntercom,
} from '@lib/util/intercom'

type ProviderProps = {
  children: React.ReactNode
}

export const IntercomProvider: React.FC<ProviderProps> = ({ children }) => {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    loadIntercom()
    bootIntercom()
  }

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        if (router.asPath.length > 1 && !router.asPath.includes('?')) {
          // hide = false
          updateIntercom(false)
        } else {
          // hide = true
          updateIntercom(true)
        }
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, router.asPath])

  return <>{children}</>
}
