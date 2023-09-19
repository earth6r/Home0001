import type { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import type { SiteSettings, Page } from '@gen/sanity-schema'
import {
  previewClient,
  filterDataToSingleItem,
  getSiteSettingsProps,
} from '@lib/sanity'

export interface PageProps {
  preview: boolean
  slug: string | string[] | null
  siteSettings: SiteSettings | undefined
  data: Page
  query: string
}

export interface PageStaticProps extends GetStaticPropsContext {
  query: string
}

export const getPageStaticProps = async ({
  params,
  query,
  preview = false,
}: PageStaticProps): Promise<GetStaticPropsResult<PageProps>> => {
  const slug = params?.slug || null
  const siteSettingsPromise = getSiteSettingsProps({ preview })
  const pagePromise = previewClient.fetch(query, { slug })
  const [siteSettings, page] = await Promise.all([
    siteSettingsPromise,
    pagePromise,
  ])
  if (!page) return { notFound: true }
  const data = filterDataToSingleItem(page, preview)
  return {
    props: {
      preview,
      siteSettings,
      slug,
      data,
      query,
    },
  }
}

export default getPageStaticProps
