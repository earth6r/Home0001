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
import { PROPERTIES_QUERY, client, filterDataToSingleItem } from '@studio/lib'
import { Property } from '@components/property'
import { Unit } from '@components/unit'

const ALL_SLUGS_QUERY = groq`*[_type == "unit" && defined(slug.current)][].slug.current`
const PROPERTY_QUERY = groq`
  *[_type == "unit" && slug.current == $slug]{
    ...,
    ${PROPERTIES_QUERY}
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

const Page: NextPage<PageProps> = ({
  data,
  preview,
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const page: SanityPage = filterDataToSingleItem(data)

  return page?.title && (!page?._id.includes('drafts.') || preview) ? (
    <article>
      <div className="px-x md:grid md:grid-cols-3 md:pr-menu">
        <div>
          <Unit unit={page} accordions={siteSettings?.howItWorksContent} />
        </div>
      </div>
    </article>
  ) : null
}

export default Page
