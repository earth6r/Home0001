import { ForwardRefRenderFunction, forwardRef } from 'react'
import groq from 'groq'
import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import type { Buy as SanityBuy } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { BUY_UNIT_QUERY, filterDataToSingleItem } from '@studio/lib'
import PageTransition from '@components/transition/PageTransition'
import classNames from 'classnames'
import { BuyContainer } from '@components/buy'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const BUY_QUERY = groq`
  *[_type == "buy" && slug.current == $slug]{
    _id,
    _type,
    title,
    slug,
    seo,
    ${BUY_UNIT_QUERY}
  }
`

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: BUY_QUERY })

const Page: NextPage<PageProps> = (
  { data, preview }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityBuy = filterDataToSingleItem(data)

  return !page?._id.includes('drafts.') || preview ? (
    <PageTransition ref={ref}>
      <article className={classNames('grid md:grid-cols-3 container pt-page')}>
        <BuyContainer
          units={page?.unitsList as any}
          className="md:col-start-2"
        />
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(Page as ForwardRefRenderFunction<unknown, {}>)
