import type { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import type { SiteSettings, Page, Buy } from '@gen/sanity-schema'
import { previewClient, getSiteSettingsProps } from '@studio/lib'

export interface PageProps {
  preview: boolean
  slug: string | string[] | null
  siteSettings: SiteSettings | undefined
  data: Page | Buy
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
  const siteSettingsPromise = getSiteSettingsProps()
  const pagePromise = previewClient.fetch(query, { slug })
  const [siteSettings, page] = await Promise.all([
    siteSettingsPromise,
    pagePromise,
  ])
  if (!page) return { notFound: true }
  const data = page
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
