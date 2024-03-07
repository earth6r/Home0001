import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Layout } from '@components/layout'
import { Scripts } from '@components/scripts'
import ContextProvider from '@/contexts'
// import { IntercomProvider } from '@components/intercom'

import 'focus-visible'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/virtual'
import '../styles/main.css'
import '../styles/toast.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { LenisInstance, useLenis } from '@studio-freight/react-lenis'

const PreviewProvider = dynamic(
  () => import('@components/preview/PreviewProvider')
)

function App({
  Component,
  pageProps,
}: AppProps<{
  draftMode: boolean
  token: string
}>) {
  const { draftMode, token } = pageProps
  const { query, events, asPath } = useRouter()
  const lenis = useLenis()

  const handleRouteChange = (path: string, lenis: LenisInstance) => {
    if (lenis) lenis.start()
    let routes = sessionStorage.getItem('routes')
    if (!routes) routes = '[]'
    console.log(path, routes)

    let paths: string[] = JSON.parse(routes)
    paths.push(path)
    sessionStorage.setItem('routes', JSON.stringify(paths))
  }

  useEffect(() => {
    if (!query || query.slug) {
      return
    }

    const stringifiedQuery = JSON.stringify(query)
    const localQuery = sessionStorage.getItem('query')

    if (localQuery !== stringifiedQuery) {
      sessionStorage.setItem('query', stringifiedQuery)
    }
  }, [query])

  useEffect(() => {
    events.on('routeChangeComplete', () => handleRouteChange(asPath, lenis))

    return () => {
      events.off('routeChangeComplete', () => handleRouteChange(asPath, lenis))
    }
  }, [events, asPath, lenis])

  useEffect(() => {
    const paths: string[] = [`${asPath}`]
    sessionStorage.setItem('routes', JSON.stringify(paths))
  }, [])

  return draftMode && token ? (
    <PreviewProvider token={token}>
      <ContextProvider>
        <Layout {...pageProps}>
          <Scripts />
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </PreviewProvider>
  ) : (
    <ContextProvider>
      {/* <IntercomProvider> */}
      <Layout {...pageProps}>
        <Scripts />
        <AnimatePresence initial={false} mode="popLayout">
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
      {/* </IntercomProvider> */}
    </ContextProvider>
  )
}

export default App
