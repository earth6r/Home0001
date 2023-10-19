import groq from 'groq'
import { useContext, useEffect, useRef } from 'react'
import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import type { Page as SanityPage } from '@gen/sanity-schema'
import type { PageProps } from '@lib/next'
import { getPageStaticProps } from '@lib/next'
import { BODY_QUERY, filterDataToSingleItem } from '@studio/lib'
import { BlockContent } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import { scrollToEl } from '@lib/util'
import { Property } from '@components/property'
import { Unit } from '@components/unit'
import slugify from 'slugify'
import { useRouter } from 'next/router'

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
        status: () => any
      }
    }
  }
}
export const getStaticProps: GetStaticProps = context =>
  getPageStaticProps({ ...context, query: HOME_QUERY })

const Page: NextPage<PageProps> = ({
  data,
  preview,
  siteSettings,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { dispatch, state } = useContext(HomeContext)
  const propertyRef = useRef(null)
  const unitRef = useRef(null)
  const page: SanityPage = filterDataToSingleItem(data)
  const filteredBlocks = page?.body?.filter(block => {
    return block._type === 'citiesBlock'
  })
  const citiesBlock: any = filteredBlocks && filteredBlocks[0]

  // handle scrolling after state change
  useEffect(() => {
    if (state.unit?._id && unitRef.current) {
      scrollToEl(unitRef.current)
    } else if (state.property?._id && propertyRef.current) {
      scrollToEl(propertyRef.current)
    }
  }, [state.property?._id, state.unit?._id])

  const filterListByTitleProp = (list: any[] | undefined, query: string) => {
    const filteredList = list?.filter(({ title }: any) => {
      const slugifiedTitle = title && slugify(title, { lower: true })
      return slugifiedTitle === query
    })
    return filteredList?.length === 1 && filteredList[0]
  }

  // check for path queries on path update
  // city assumes one property and assigns to that property ~ JLM
  useEffect(() => {
    const cityQuery = router.query.city as string
    const unitQuery = router.query.unit as string

    if (typeof window != 'undefined' && window.HubSpotConversations) {
      const status = window.HubSpotConversations.widget.status()
      console.log('status:', status)
      console.log('window', window)
      console.log('router.query.city', router.query.city)
      if (router.asPath == '/' && !router.query.city && status.loaded) {
        console.log('we are inside')
        window.HubSpotConversations.widget.close()
      } else {
        if (!status.loaded) {
          window.HubSpotConversations.widget.open()
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
    <article>
      <BlockContent
        blocks={page?.body}
        className="flex flex-col w-full px-x md:pr-0 pt-page"
      />

      {citiesBlock && (
        <>
          {state.property?._id && (
            <div
              ref={propertyRef}
              className="px-x md:grid md:grid-cols-3 md:pr-menu"
            >
              <Property
                property={state.property}
                className="md:col-start-2 md:col-span-1"
              />
            </div>
          )}

          {state.unit?._id && (
            <div ref={unitRef}>
              <Unit
                unit={state.unit}
                accordions={siteSettings?.howItWorksContent}
              />
            </div>
          )}
        </>
      )}
    </article>
  ) : null
}

export default Page
