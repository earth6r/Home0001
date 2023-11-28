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
