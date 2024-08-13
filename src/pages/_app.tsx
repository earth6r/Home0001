import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Layout } from '@components/layout'
import { Scripts } from '@components/scripts'
import ContextProvider from '@/contexts'
// import { IntercomProvider } from '@components/intercom'
import { Analytics } from '@vercel/analytics/react'

import 'focus-visible'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/virtual'
import '../styles/main.css'
import '../styles/toast.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useLenis } from '@studio-freight/react-lenis'

function App({ Component, pageProps }: AppProps<{}>) {
  const { query, events, asPath } = useRouter()
  const lenis = useLenis()

  const handleRouteChange = () => {
    if (lenis) lenis.start()
    let routes = sessionStorage.getItem('routes')
    if (!routes) routes = '[]'

    const path = typeof window !== 'undefined' ? window.location.pathname : ''
    let paths: string[] = JSON.parse(routes)
    const lastPath = paths[paths.length - 1]
    if (path === lastPath) return
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
    const paths: string[] = [`${asPath}`]
    sessionStorage.setItem('routes', JSON.stringify(paths))

    events.on('routeChangeComplete', handleRouteChange)

    return () => {
      events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ContextProvider>
      {/* <IntercomProvider> */}
      <Layout {...pageProps}>
        <Scripts />
        <AnimatePresence initial={false} mode="popLayout">
          <Component {...pageProps} />
          <Analytics />
        </AnimatePresence>
      </Layout>
      {/* </IntercomProvider> */}
    </ContextProvider>
  )
}

export default App
