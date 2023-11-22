import { ForwardRefRenderFunction, forwardRef } from 'react'
import groq from 'groq'
import type {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticProps,
  NextPage,
} from 'next'
import type { Property as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { PROPERTIES_QUERY, client, filterDataToSingleItem } from '@studio/lib'
import { BlockContent, RichText } from '@components/sanity'
import { Property } from '@components/property'
import PageTransition from '@components/transition/PageTransition'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const ALL_SLUGS_QUERY = groq`*[_type == "property" && defined(slug.current)][].slug.current`
const PROPERTY_QUERY = groq`
  *[_type == "property" && slug.current == $slug]{
    ...,
    ${PROPERTIES_QUERY}
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await client.fetch(ALL_SLUGS_QUERY)
  return {
    paths: pages.map((slug: string) => `/property/${slug}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: PROPERTY_QUERY })

const PropertyPage: NextPage<PageProps> = (
  { data, preview }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)

  return page?.header && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article>
        <div className="">
          <Property property={page} className="w-full pt-page md:pr-menu" />
        </div>
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(PropertyPage as ForwardRefRenderFunction<unknown, {}>)
