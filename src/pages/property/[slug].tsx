import { ForwardRefRenderFunction, forwardRef, useState } from 'react'
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
import { Property } from '@components/property'
import PageTransition from '@components/transition/PageTransition'
import { Waitlist } from '@components/waitlist'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const ALL_SLUGS_QUERY = groq`*[_type == "property" && defined(slug.current)][].slug.current`
const PROPERTY_QUERY = groq`
  *[_type == "property" && slug.current == $slug]{
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
  {
    data,
    siteSettings,
    preview,
  }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)

  const { register, handleSubmit, reset, trigger, getValues } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [fullWidth, setFullWidth] = useState(false)

  return page?.header && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article>
        <Property property={page} className="w-full pt-page" />

        <Waitlist
          waitlist={{
            header: siteSettings.waitlistHeader,
            text: siteSettings?.waitlistCopy,
            id: siteSettings.wailistId,
            successMessage: siteSettings?.waitlistSuccess,
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
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(PropertyPage as ForwardRefRenderFunction<unknown, {}>)
