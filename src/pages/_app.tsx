import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Layout } from '@components/layout'
import { Scripts } from '@components/scripts'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { animateScroll as scroll } from 'react-scroll'
import { HomeProvider } from '@contexts/home'

import 'focus-visible'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/virtual'
import '../styles/main.css'
import '../styles/toast.css'

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
  // const router = useRouter()

  // useEffect(() => {
  //   const handleHashChange = (url: string) => {
  //     const el = document.getElementById(url.slice(url.lastIndexOf('#') + 1))
  //     const elRectTop = el?.getBoundingClientRect().top
  //     const scrollTop = window.pageYOffset || document.body.scrollTop
  //     const headerEl = document.getElementById('header')
  //     const headerStyle = getComputedStyle(headerEl as HTMLElement)
  //     const offset =
  //       parseInt(headerStyle.height) + parseInt(headerStyle.top) * 2
  //     elRectTop && scroll.scrollTo(Math.floor(elRectTop + scrollTop - offset))
  //   }

  //   router.events.on('hashChangeStart', handleHashChange)

  //   return () => {
  //     router.events.off('hashChangeStart', handleHashChange)
  //   }
  // }, [router.events])

  return draftMode && token ? (
    <PreviewProvider token={token}>
      <HomeProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
          <Scripts />
        </Layout>
      </HomeProvider>
    </PreviewProvider>
  ) : (
    <HomeProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
        <Scripts />
      </Layout>
    </HomeProvider>
  )
}

export default App
