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
    updateIntercom(true)
  }

  useEffect(() => {
    const handleRouteChange = () => {
      //@ts-ignore
      console.log('window', window.hsConversationsOnReady)
      if (
        typeof window !== 'undefined' &&
        (window as any).hsConversationsOnReady
      ) {
        if (router.asPath == '/' && router.query.city == undefined) {
          // hide hubspot chat
          //@ts-ignore
          window.hsConversations.widget.close()
        } else {
          // show hubspot chat
          //@ts-ignore
          window.hsConversations.widget.open()
        }
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, router.asPath, router.query.city])

  return <>{children}</>
}
