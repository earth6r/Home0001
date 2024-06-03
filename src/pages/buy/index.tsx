import { ForwardRefRenderFunction, forwardRef } from 'react'
import groq from 'groq'
import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import type { Page as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { BODY_QUERY, filterDataToSingleItem } from '@studio/lib'
import PageTransition from '@components/transition/PageTransition'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const HOME_QUERY = groq`
  *[_type == "buy" && slug.current == $slug]{
    _id,
    _type,
    seo,
    ${BODY_QUERY}
  }
`

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: HOME_QUERY })

const Page: NextPage<PageProps> = (
  { data, preview }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)

  return page?.body && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article>{`buy page`}</article>
    </PageTransition>
  ) : null
}

export default forwardRef(Page as ForwardRefRenderFunction<unknown, {}>)
