import { ForwardRefRenderFunction, forwardRef, useEffect } from 'react'
import groq from 'groq'
import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import type { Page as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { BODY_QUERY, filterDataToSingleItem } from '@studio/lib'
import { BlockContent } from '@components/sanity'
import PageTransition from '@components/transition/PageTransition'
import { useRouter } from 'next/router'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const HOME_QUERY = groq`
  *[_type == "page" && slug.current == $slug]{
    _id,
    ${BODY_QUERY}
  }
`
declare global {
  interface Window {
    HubSpotConversations: {
      widget: {
        close: () => void
        open: () => void
        load: () => void
        remove: () => void
        status: () => any
      }
    }
    hsConversationsOnReady: any[]
  }
}
export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: HOME_QUERY })

const Page: NextPage<PageProps> = (
  { data, preview }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const router = useRouter()
  const page: SanityPage = filterDataToSingleItem(data)

  useEffect(() => {
    if (typeof window != 'undefined' && window.HubSpotConversations) {
      const status = window.HubSpotConversations.widget.status()

      if (router.asPath == '/' && !router.query.city && status.loaded) {
        window.HubSpotConversations.widget.remove()
      } else {
        if (!status.loaded) {
          window.HubSpotConversations.widget.load()
        }
      }
    }
  }, [router.asPath, router.query])

  return page?.body && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article>
        <BlockContent
          blocks={page?.body}
          className="flex flex-col w-full md:px-x pt-page"
        />
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(Page as ForwardRefRenderFunction<unknown, {}>)
