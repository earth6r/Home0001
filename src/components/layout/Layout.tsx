import { useEffect, type FC, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import type {
  Menus,
  Page,
  Property,
  SiteSettings,
  Unit,
} from '@gen/sanity-schema'
import { Head } from '@components/head'
import { Header } from '@components/header'
import { Footer } from '@components/footer'
import { filterDataToSingleItem } from '@studio/lib'
import { ReactLenis } from '@studio-freight/react-lenis'
import { triggerToastPreview } from '@components/toast'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
type PageData = Page | Property | Unit

interface LayoutProps {
  children?: ReactNode | undefined
  preview?: boolean
  data?: PageData[]
  siteSettings?: SiteSettings | undefined
}

export const Layout: FC<LayoutProps> = ({
  children,
  data,
  preview = false,
  siteSettings,
}) => {
  const { asPath, query } = useRouter()
  const page: PageData = filterDataToSingleItem(data)

  useEffect(() => {
    if (preview)
      triggerToastPreview({
        deactivateUrl: `${BASE_URL}/api/exit-preview?path=${asPath}`,
      })
  }, [])

  return (
    <>
      <Head
        siteTitle={siteSettings?.title || 'Home0001'}
        siteDescription={siteSettings?.description}
        siteImage={siteSettings?.image}
        siteKeywords={siteSettings?.siteKeywords}
        seoTitle={page?.seo?.title}
        pageType={page?._type}
        pageTitle={page?.title}
        pageDescription={page?.seo?.description}
        pageKeywords={page?.seo?.keywords}
        pageImage={page?.previewImage}
        pageUrl={`${BASE_URL}${asPath}`}
      />
      <div className="flex flex-col min-h-full">
        <Header
          className="flex-initial"
          path={asPath}
          title={
            page?._type && (page._type as string) === 'rdPage'
              ? '0001'
              : 'HOME0001'
          }
          hideMenuButton={
            page?.hideMenuButton ||
            (page?._type && (page._type as string) === 'buy') ||
            (page?._type && (page._type as string) === 'rdPage')
          }
          hideMenu={page?._type && (page._type as string) === 'buy'}
          showTourLink={page?.showTourLink}
          property={(page as Unit)?.property}
          currentTitle={
            ((page as Property) || (page as Unit))?.headerText || page?.title
          }
          waitlist={{
            id: siteSettings?.waitlistId,
            copy: siteSettings?.waitlistCopy,
            header: siteSettings?.waitlistHeader,
            success: siteSettings?.waitlistSuccess,
          }}
          inquiry={{
            id: siteSettings?.inquiryId,
            copy: siteSettings?.inquiryCopy,
            success: siteSettings?.inquirySuccess,
            brokerId: siteSettings?.brokerInquiryId,
            brokerCopy: siteSettings?.brokerInquiryCopy,
            brokerSuccess: siteSettings?.brokerInquirySuccess,
          }}
          mainMenu={siteSettings?.mainMenu as Menus | undefined}
        />

        <ReactLenis
          root
          options={{
            smoothWheel: false,
          }}
        >
          <main className="flex-auto">{children}</main>
        </ReactLenis>

        <Footer
          path={asPath}
          query={query}
          footerMenu={siteSettings?.footerMenu as Menus | undefined}
        />
      </div>
      <ToastContainer />
    </>
  )
}
