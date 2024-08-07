import {
  ForwardRefRenderFunction,
  forwardRef,
  useContext,
  useEffect,
  useState,
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
import { Waitlist } from '@components/waitlist'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { Property, PropertyContentProps } from '@components/property'
import { PropertyBlock } from '@components/sanity'

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
    siteSettings,
    preview,
  }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)
  const { state, dispatch } = useContext(HomeContext)

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [fullWidth, setFullWidth] = useState(false)

  useEffect(() => {
    dispatch({
      type: 'SET_UNIT',
      payload: {
        unit: page,
        unitSlug: page?.slug?.current,
      },
    })
  }, [])

  return page?.title && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article>
        <div className="pt-header">
          <Unit unit={page} />
          {page.property && (
            <div className="mt-header">
              <Property
                property={page.property as PropertyContentProps}
                block={true}
              />
            </div>
          )}
        </div>
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(UnitPage as ForwardRefRenderFunction<unknown, {}>)
