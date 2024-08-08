import { ForwardRefRenderFunction, forwardRef } from 'react'
import groq from 'groq'
import type {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticProps,
  NextPage,
} from 'next'
import type { PropertyType as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import {
  PROPERTY_TYPE_QUERY,
  client,
  filterDataToSingleItem,
} from '@studio/lib'
import PageTransition from '@components/transition/PageTransition'
import { PropertyType } from '@components/property-type'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const ALL_SLUGS_QUERY = groq`*[_type == "propertyType" && defined(slug.current)][].slug.current`
const PAGE_QUERY = groq`
  *[_type == "propertyType" && slug.current == $slug]{
    ...,
    ${PROPERTY_TYPE_QUERY}
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await client.fetch(ALL_SLUGS_QUERY)
  return {
    paths: pages.map((slug: string) => `/property-type/${slug}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: PAGE_QUERY })

const PropertyTypePage: NextPage<PageProps> = (
  {
    data,
    siteSettings,
    preview,
  }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)

  return page?.typeTitle && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article>
        <div className="pt-header">
          <PropertyType propertyType={page} />
        </div>
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(
  PropertyTypePage as ForwardRefRenderFunction<unknown, {}>
)
