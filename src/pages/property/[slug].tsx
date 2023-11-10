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

const Page: NextPage<PageProps> = ({
  data,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const page: SanityPage = filterDataToSingleItem(data)

  return page?.header && (!page?._id.includes('drafts.') || preview) ? (
    <article>
      <div className="px-x md:grid md:grid-cols-3 md:pr-menu md:mt-[95px] mt-[80px]">
        <Property property={page} className="md:col-start-2 md:col-span-1" />
      </div>
    </article>
  ) : null
}

export default Page
