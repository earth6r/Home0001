import {
  ForwardRefRenderFunction,
  forwardRef,
  useContext,
  useEffect,
} from 'react'
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
import { Unit } from '@components/unit'
import PageTransition from '@components/transition/PageTransition'
import { HomeContext } from '@contexts/home'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const ALL_SLUGS_QUERY = groq`*[_type == "unit" && defined(slug.current)][].slug.current`
const PROPERTY_QUERY = groq`
  *[_type == "unit" && slug.current == $slug]{
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
  { data, preview }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)
  const { state, dispatch } = useContext(HomeContext)

  useEffect(() => {
    dispatch({
      type: 'SET_UNIT',
      payload: {
        unit: page,
        unitSlug: page?.slug?.current,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return page?.title && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article className="pt-header mb-ydouble">
        <Unit unit={page} />
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(UnitPage as ForwardRefRenderFunction<unknown, {}>)
