import groq from 'groq'
import { useContext } from 'react'
import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import type { Page as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { BODY_QUERY, filterDataToSingleItem } from '@studio/lib'
import { BlockContent } from '@components/sanity'

const HOME_QUERY = groq`
  *[_type == "page"]{
    ...,
    ${BODY_QUERY}
  }
`

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: HOME_QUERY })

const Page: NextPage<PageProps> = ({
  data,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const page: SanityPage = filterDataToSingleItem(data)
  return page?.body && (!page?._id.includes('drafts.') || preview) ? (
    <article>
      <BlockContent
        blocks={page?.body}
        className="flex flex-col container pt-page"
      />
    </article>
  ) : null
}

export default Page
