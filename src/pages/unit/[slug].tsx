import { ForwardRefRenderFunction, forwardRef } from 'react'
import groq from 'groq'
import type {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticProps,
  NextPage,
} from 'next'
import type { Unit as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { UNIT_QUERY, client, filterDataToSingleItem } from '@studio/lib'
import { Property } from '@components/property'
import { Unit } from '@components/unit'
import PageTransition from '@components/transition/PageTransition'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const ALL_SLUGS_QUERY = groq`*[_type == "unit" && defined(slug.current)][].slug.current`
const PROPERTY_QUERY = groq`
  *[_type == "unit" && slug.current == $slug]{
    ...,
    ${UNIT_QUERY}
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await client.fetch(ALL_SLUGS_QUERY)
  return {
    paths: pages.map((slug: string) => `/unit/${slug}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: PROPERTY_QUERY })

const UnitPage: NextPage<PageProps> = (
  {
    data,
    preview,
    siteSettings,
  }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)

  return page?.title && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article>
        <Unit unit={page} accordions={siteSettings?.howItWorksContent} />
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(UnitPage as ForwardRefRenderFunction<unknown, {}>)
