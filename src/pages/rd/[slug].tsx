import { ForwardRefRenderFunction, forwardRef } from 'react'
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
import { BODY_QUERY, client, filterDataToSingleItem } from '@studio/lib'
import { BlockContent } from '@components/sanity'
import PageTransition from '@components/transition/PageTransition'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const ALL_SLUGS_QUERY = groq`*[_type == "rdPage" && defined(slug.current)][].slug.current`
const PAGE_QUERY = groq`
  *[_type == "rdPage" && slug.current == $slug]{
    _id,
    _type,
    title,
    seo,
    ${BODY_QUERY}
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await client.fetch(ALL_SLUGS_QUERY)
  return {
    paths: pages.map((slug: string) => `/rd/${slug}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: PAGE_QUERY })

const RDPage: NextPage<PageProps> = (
  { data, preview }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)

  return page?.body && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article className="flex flex-col pt-page">
        <BlockContent
          grid={true}
          blocks={page?.body}
          className="px-x overflow-hidden md:overflow-visible"
        />
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(RDPage as ForwardRefRenderFunction<unknown, {}>)
