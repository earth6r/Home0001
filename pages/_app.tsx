import type { AppProps } from 'next/app'
import { Layout } from '@components/layout'
import { Scripts } from '@components/scripts'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { animateScroll as scroll } from 'react-scroll'

import 'focus-visible'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/virtual'
import 'windi.css'
import '@/styles/reset.css'
import '@/styles/globals.css'
import '@/styles/toast.css'
import '@/styles/rich-text.css'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleHashChange = (url: string) => {
      const el = document.getElementById(url.slice(url.lastIndexOf('#') + 1))
      const elRectTop = el?.getBoundingClientRect().top
      const scrollTop = window.pageYOffset || document.body.scrollTop
      const headerEl = document.getElementById('header')
      const headerStyle = getComputedStyle(headerEl as HTMLElement)
      const offset =
        parseInt(headerStyle.height) + parseInt(headerStyle.top) * 2
      elRectTop && scroll.scrollTo(Math.floor(elRectTop + scrollTop - offset))
    }

    router.events.on('hashChangeStart', handleHashChange)

    return () => {
      router.events.off('hashChangeStart', handleHashChange)
    }
  }, [router.events])

  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
      <Scripts />
    </Layout>
  )
}

export default App
