import {
  ForwardRefRenderFunction,
  forwardRef,
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
import type { Page as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { BODY_QUERY, client, filterDataToSingleItem } from '@studio/lib'
import { BlockContent } from '@components/sanity'
import PageTransition from '@components/transition/PageTransition'
import classNames from 'classnames'
import type { FormEvent } from 'react'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const ALL_SLUGS_QUERY = groq`*[_type == "page" && defined(slug.current)][].slug.current`
const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug]{
    _id,
    _type,
    slug,
    seo,
    password,
    hideMenuButton,
    showTourLink,
    ${BODY_QUERY}
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await client.fetch(ALL_SLUGS_QUERY)
  return {
    paths: pages.map((slug: string) => `/${slug}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: PAGE_QUERY })

const Page: NextPage<PageProps> = (
  { data, preview }: InferGetStaticPropsType<typeof getStaticProps>,
  ref: PageRefType
) => {
  const page: SanityPage = filterDataToSingleItem(data)
  const filteredBlocks = page.body?.filter(
    (block: any) =>
      block._type === 'propertyBlock' || block._type === 'propertiesBlock'
  )
  const hasApplicationForm = page.body?.some(
    (block: any) => block._type === 'web3Block'
  )
  const [showLogin, setShowLogin] = useState(true)

  const validatePassword = (e: FormEvent<HTMLInputElement>) => {
    if ((e.target as HTMLTextAreaElement).value === page.password) {
      setShowLogin(false)
      sessionStorage.setItem('loggedIn', 'true')
    }
  }

  useEffect(() => {
    setShowLogin(sessionStorage.getItem('loggedIn') !== 'true')
  }, [])

  return page?.body && (!page?._id.includes('drafts.') || preview) ? (
    <PageTransition ref={ref}>
      <article>
        {page?.password && showLogin ? (
          <div className="flex items-center justify-center w-full h-[60vh]">
            <form className="form">
              <input
                type="text"
                placeholder="Password"
                className="input"
                onInput={e => validatePassword(e)}
              />
            </form>
          </div>
        ) : (
          <BlockContent
            grid={filteredBlocks && filteredBlocks?.length === 0}
            blocks={page?.body}
            className={classNames(
              hasApplicationForm ? '' : 'pt-page',
              filteredBlocks && filteredBlocks?.length > 0 ? '' : 'container',
              'w-full overflow-hidden md:overflow-visible'
            )}
          />
        )}
      </article>
    </PageTransition>
  ) : null
}

export default forwardRef(Page as ForwardRefRenderFunction<unknown, {}>)
