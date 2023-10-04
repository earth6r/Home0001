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
        if (
          router.pathname !== '/' ||
          (router.query.city && router.query.city.length > 0)
        ) {
          // shows Intercom
          updateIntercom(false)
        } else {
          // does not show Intercom
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
