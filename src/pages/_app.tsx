/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Layout } from '@components/layout'
import { Scripts } from '@components/scripts'
import ContextProvider from '@/contexts'
import { Analytics } from '@vercel/analytics/react'
import { animateScroll as scroll } from 'react-scroll'

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

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const PS_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (typeof window !== 'undefined' || !PS_KEY) {
  posthog.init(PS_KEY as string, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    // Enable debug mode in development
    loaded: posthog => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
  })
}

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
    posthog?.capture('$pageview')
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

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      scroll.scrollToTop()
    }

    const handleHashChange = (url: string) => {
      const el = document.getElementById(url.slice(url.lastIndexOf('#') + 1))
      const elRectTop = el?.getBoundingClientRect().top
      const scrollTop = window.pageYOffset || document.body.scrollTop
      const headerEl = document.getElementById('header')
      const headerStyle = getComputedStyle(headerEl as HTMLElement)
      const offset = parseInt(headerStyle.height) + parseInt(headerStyle.top)
      elRectTop && scroll.scrollTo(Math.floor(elRectTop + scrollTop - offset))
    }

    events.on('routeChangeStart', handleRouteChange)
    events.on('hashChangeStart', handleHashChange)

    return () => {
      events.off('routeChangeStart', handleRouteChange)
      events.off('hashChangeStart', handleHashChange)
    }
  }, [events])

  return (
    <ContextProvider>
      <PostHogProvider client={posthog}>
        <Layout {...pageProps}>
          <Scripts />
          <AnimatePresence initial={false} mode="popLayout">
            <Component {...pageProps} key="component" />
          </AnimatePresence>
          <Analytics />
        </Layout>
      </PostHogProvider>
    </ContextProvider>
  )
}

export default App
