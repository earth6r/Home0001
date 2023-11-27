import { type FC, type ReactNode } from 'react'
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
import { KeyedUnitGroup } from '@components/form'
import { filterDataToSingleItem } from '@studio/lib'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
type PageData = Page | Property | Unit

interface LayoutProps {
  children?: ReactNode | undefined
  preview?: boolean
  data?: PageData[]
  siteSettings?: SiteSettings | undefined
}

export const Layout: FC<LayoutProps> = ({ children, data, siteSettings }) => {
  const { asPath, query } = useRouter()
  const page: PageData = filterDataToSingleItem(data)

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
        <div className="fixed w-full h-gradient header-gradient z-base" />
        <Header
          className="flex-initial"
          path={asPath}
          property={(page as Unit)?.property}
          currentTitle={
            ((page as Property) || (page as Unit))?.headerText || page?.title
          }
          waitlistId={siteSettings?.waitlistId}
          waitlistHeader={siteSettings?.waitlistHeader}
          waitlistCopy={siteSettings?.waitlistCopy}
          waitlistSuccess={siteSettings?.waitlistSuccess}
          waitlistUnits={siteSettings?.waitlistUnits as KeyedUnitGroup[]}
          mainMenu={siteSettings?.mainMenu as Menus | undefined}
        />
        <main className="flex-auto">{children}</main>
        <Footer
          path={asPath}
          query={query}
          mainMenu={siteSettings?.mainMenu as Menus | undefined}
        />
      </div>
      <ToastContainer />
    </>
  )
}
