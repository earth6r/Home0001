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
        updateIntercom()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  return <>{children}</>
}
