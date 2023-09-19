import groq from 'groq'
import type {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticProps,
  NextPage,
} from 'next'
import type { Page as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import {
  BODY_QUERY,
  client,
  usePreviewSubscription,
  filterDataToSingleItem,
} from '@lib/sanity'
import { BlockContent } from '@components/sanity'

const ALL_SLUGS_QUERY = groq`*[_type == "page" && defined(slug.current)][].slug.current`
const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug]{
    ...,
    ${BODY_QUERY}
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await client.fetch(ALL_SLUGS_QUERY)
  return {
    paths: pages.map((slug: string) => `/${slug}`),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: PAGE_QUERY })

const Page: NextPage<PageProps> = ({
  data,
  preview,
  query,
  slug = null,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: previewData } = usePreviewSubscription(query, {
    params: { slug },
    initialData: data,
    enabled: preview,
  })
  const page: SanityPage = filterDataToSingleItem(
    previewData as SanityPage,
    preview
  )

  return page?.body ? (
    <article>
      <BlockContent blocks={page.body} className="flex flex-col" />
    </article>
  ) : null
}

export default Page
