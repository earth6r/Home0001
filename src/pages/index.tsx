import { ForwardRefRenderFunction, forwardRef } from 'react'
import groq from 'groq'
import { useContext, useEffect, useRef } from 'react'
import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import type { Page as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { BODY_QUERY, filterDataToSingleItem } from '@studio/lib'
import { BlockContent } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import PageTransition from '@components/transition/PageTransition'

type PageRefType = React.ForwardedRef<HTMLDivElement>

const HOME_QUERY = groq`
  *[_type == "page"]{
    ...,
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
  const { dispatch, state } = useContext(HomeContext)
  const page: SanityPage = filterDataToSingleItem(data)
  const filteredBlocks = page?.body?.filter(block => {
    return block._type === 'citiesBlock'
  })
  const citiesBlock: any = filteredBlocks && filteredBlocks[0]

  const filterListByTitleProp = (list: any[] | undefined, query: string) => {
    const filteredList = list?.filter(({ title }: any) => {
      const slugifiedTitle = title && slugify(title, { lower: true })
      return slugifiedTitle === query
    })
    return filteredList?.length === 1 && filteredList[0]
  }

  // useEffect(() => {
  //   if (window.HubSpotConversations) {
  //     window.HubSpotConversations.widget.remove()
  //   } else {
  //     window.hsConversationsOnReady = [
  //       () => {
  //         window.HubSpotConversations.widget.remove()
  //       },
  //     ]
  //   }
  // }, [])

  // check for path queries on path update
  // city assumes one property and assigns to that property ~ JLM
  useEffect(() => {
    const cityQuery = router.query.city as string
    const unitQuery = router.query.unit as string

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

    if ((cityQuery || unitQuery) && citiesBlock?.citiesList) {
      const activeCity = filterListByTitleProp(
        citiesBlock?.citiesList,
        cityQuery
      )
      if (!activeCity || !activeCity._id) return
      const property = activeCity.properties && activeCity.properties[0]
      if (!property) return
      const activeUnit = filterListByTitleProp(property?.unitsList, unitQuery)
      if (cityQuery !== state?.property?.cityId && !activeUnit && !state.unit) {
        dispatch({
          ...state,
          type: 'SET_PROPERTY',
          payload: {
            cityId: activeCity._id,
            property,
            propertySlug: cityQuery,
          },
        })
      } else if (cityQuery === state?.property?.cityId && activeUnit) {
        dispatch({
          ...state,
          type: 'SET_UNIT',
          payload: {
            unit: activeUnit,
            unitSlug: unitQuery,
          },
        })
      } else {
        dispatch({
          ...state,
          type: 'SET_HOME',
          payload: {
            cityId: activeCity._id,
            property,
            propertySlug: cityQuery,
            unit: activeUnit,
            unitSlug: unitQuery,
          },
        })
      }
    } else {
      // just reset if path has been changed and no queries ~ JLM
      dispatch({
        type: 'RESET_HOME',
        payload: {
          cityId: undefined,
          propertySlug: undefined,
          unit: undefined,
          unitSlug: undefined,
        },
      })
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
