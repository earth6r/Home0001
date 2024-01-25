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

  const { register, handleSubmit, reset, trigger, getValues } = useForm({
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
        <div className="pt-page">
          <Unit unit={page} />

          <Waitlist
            formType="unit"
            waitlist={{
              header: siteSettings.waitlistHeader,
              text: siteSettings?.inquiryCopy,
              id: siteSettings.inquiryId,
              successMessage: siteSettings?.inquirySuccess,
            }}
            formActions={{
              formSubmitted,
              setFormSubmitted,
              handleSubmit,
              trigger,
              register,
              getValues,
            }}
            setFullWidth={() => setFullWidth(true)}
            fullWidth={fullWidth}
            className={classNames(
              fullWidth ? 'md:left-0 md:w-full' : 'md:left-1/3 md:w-2/3',
              'relative mt-page transition-all duration-200 ease-in-out'
            )}
          />
        </div>
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(UnitPage as ForwardRefRenderFunction<unknown, {}>)
