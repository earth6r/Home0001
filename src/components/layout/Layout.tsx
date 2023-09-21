import type { FC, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import type { Menus, Page, SiteSettings } from '@gen/sanity-schema'
import { Head } from '@components/head'
import { Header } from '@components/header'
import { Footer } from '@components/footer'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
type PageData = Page

interface LayoutProps {
  children?: ReactNode | undefined
  preview?: boolean
  data?: PageData
  siteSettings?: SiteSettings | undefined
}

export const Layout: FC<LayoutProps> = ({ children, data, siteSettings }) => {
  const { asPath } = useRouter()
  console.log('asPath: ', asPath)
  return (
    <>
      <Head
        siteTitle={siteSettings?.title || 'Home0001'}
        siteDescription={siteSettings?.description}
        siteImage={siteSettings?.image}
        siteKeywords={siteSettings?.siteKeywords}
        seoTitle={data?.seo?.title}
        pageType={data?._type}
        pageTitle={data?.title}
        pageDescription={data?.seo?.description}
        pageKeywords={data?.seo?.keywords}
        pageImage={data?.previewImage}
        pageUrl={`${BASE_URL}${asPath}`}
      />
      <div className="flex flex-col min-h-full">
        <Header
          className="flex-initial"
          mainMenu={siteSettings?.mainMenu as Menus | undefined}
        />
        <main className="flex-auto">{children}</main>
        {asPath !== '/' && (
          <Footer mainMenu={siteSettings?.mainMenu as Menus | undefined} />
        )}
      </div>
      <ToastContainer />
    </>
  )
}
