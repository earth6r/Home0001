import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import type { Page, SiteSettings } from '@gen/sanity-schema'
import {
  SITE_SETTINGS_QUERY,
  usePreviewSubscription,
  filterDataToSingleItem,
} from '@lib/sanity'
import { Head } from '@components/head'
import { Header } from '@components/header'
import { Footer } from '@components/footer'
import { triggerToastPreview } from '@components/toast'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
type PageData = Page

interface LayoutProps {
  children?: ReactNode | undefined
  preview?: boolean
  data?: PageData
  siteSettings?: SiteSettings | undefined
}

export const Layout: FC<LayoutProps> = ({
  children,
  preview = false,
  data,
  siteSettings,
}) => {
  const { asPath } = useRouter()
  const { data: previewSiteSettings } = usePreviewSubscription(
    SITE_SETTINGS_QUERY,
    {
      initialData: siteSettings,
      enabled: preview,
    }
  )
  const settings: SiteSettings = filterDataToSingleItem(
    previewSiteSettings as SiteSettings,
    preview
  )
  // notify users when in preview mode
  useEffect(() => {
    if (preview)
      triggerToastPreview({
        deactivateUrl: `${BASE_URL}/api/exit-preview?path=${asPath}`,
      })
  }, [asPath, preview])

  return (
    <>
      <Head
        siteTitle={settings?.title || 'Example Repo'}
        siteDescription={settings?.description}
        siteImage={settings?.image}
        siteKeywords={settings?.siteKeywords}
        seoTitle={data?.seo?.title}
        pageType={data?._type}
        pageTitle={data?.title}
        pageDescription={data?.seo?.description}
        pageKeywords={data?.seo?.keywords}
        pageImage={data?.previewImage}
        pageUrl={`${BASE_URL}${asPath}`}
      />
      <div className="flex flex-col min-h-full">
        <Header className="flex-initial" />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
      <ToastContainer />
    </>
  )
}
