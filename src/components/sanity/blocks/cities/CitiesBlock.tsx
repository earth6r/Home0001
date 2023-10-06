import { type FC, useContext, useEffect, useRef, memo } from 'react'
import classNames from 'classnames'
import type { CitiesBlockProps, KeyedProperty } from './types'
import { Block } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import { Property } from '@components/property'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import type { KeyedUnit } from '@components/unit'
import { Unit } from '@components/unit'
import { sendGoogleEvent, scrollToEl, sendHubspotEvent } from '@lib/util'

export const CitiesBlockComponent: FC<CitiesBlockProps> = ({
  headers,
  citiesList,
  howItWorksContent,
  className,
}) => {
  const propertyRef = useRef(null)
  const unitRef = useRef(null)
  const router = useRouter()
  const { dispatch, state } = useContext(HomeContext)

  const dispatchHome = (
    cityId: string,
    property: KeyedProperty,
    propertySlug?: string,
    unit?: KeyedUnit,
    unitSlug?: string
  ) => {
    dispatch({
      ...state,
      type: 'SET_HOME',
      payload: {
        cityId: cityId,
        property,
        propertySlug,
        unit,
        unitSlug,
      },
    })
  }

  const dispatchProperty = (
    cityId: string,
    property: KeyedProperty,
    propertySlug?: string
  ) => {
    dispatch({
      ...state,
      type: 'SET_PROPERTY',
      payload: {
        cityId: cityId,
        property,
        propertySlug,
      },
    })
  }

  const dispatchUnit = (unit: KeyedUnit, title?: string) => {
    dispatch({
      ...state,
      type: 'SET_UNIT',
      payload: {
        unit: unit,
        unitSlug: title,
      },
    })
  }

  const dispatchReset = () => {
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

  const updatePath = (title?: string) => {
    if (title !== router.query.city)
      router.push(`?city=${title}`, undefined, { shallow: true })
  }

  const updateProperty = (title?: string) => {
    const slugifiedTitle = title && slugify(title, { lower: true })
    updatePath(slugifiedTitle)
  }

  const filterListByTitleProp = (list: any[] | undefined, query: string) => {
    const filteredList = list?.filter(({ title }: any) => {
      const slugifiedTitle = title && slugify(title, { lower: true })
      return slugifiedTitle === query
    })
    return filteredList?.length === 1 && filteredList[0]
  }

  // handle scrolling after state change
  useEffect(() => {
    if (state.unit?._id && unitRef.current) {
      scrollToEl(unitRef.current)
    } else if (state.property?._id && propertyRef.current) {
      scrollToEl(propertyRef.current)
    }
  }, [state.property?._id, state.unit?._id])

  // check for path queries on path update
  // city assumes one property and assigns to that property ~ JLM
  useEffect(() => {
    const cityQuery = router.query.city
    const unitQuery = router.query.unit

    if ((cityQuery || unitQuery) && citiesList) {
      const activeCity = filterListByTitleProp(citiesList, cityQuery as string)
      if (!activeCity || !activeCity._id) return

      const property = activeCity.properties && activeCity.properties[0]
      if (!property) return

      const activeUnit = filterListByTitleProp(
        property?.unitsList,
        unitQuery as string
      )

      if (cityQuery !== state?.property?.cityId && !activeUnit && !state.unit) {
        dispatchProperty(activeCity._id, property, cityQuery as string)
      } else if (cityQuery === state?.property?.cityId && activeUnit) {
        dispatchUnit(activeUnit, unitQuery as string)
      } else {
        dispatchHome(
          activeCity._id,
          property,
          cityQuery as string,
          activeUnit,
          unitQuery as string
        )
      }
    } else {
      // just reset if path has been changed and no queries ~ JLM
      dispatchReset()
    }
  }, [router.asPath])

  return (
    <Block className={classNames(className)}>
      {headers &&
        headers.map(header => (
          <div key={header} className="rich-text md:pr-menu">
            <h2 className="uppercase pr-[40%] sm:pr-[30%] md:pr-0 mb-12 md:mb-16">
              {header}
            </h2>
          </div>
        ))}

      <ul className="grid grid-cols-3 gap-y-10 md:gap-y-20 pr-10 md:pr-menu">
        {citiesList &&
          citiesList.map(({ _id, title, active, properties }) => {
            const property = properties && properties[0]
            if (_id)
              return (
                <li key={_id}>
                  <button
                    disabled={!active || !property}
                    onClick={() => {
                      property && updateProperty(title)
                      sendGoogleEvent(`click_${title}_button`)
                      sendHubspotEvent(`clicked ${title}`, 'clicked')
                    }}
                    className={classNames(
                      state.property?.cityId === _id ? 'font-bold' : '',
                      'p-5 -m-5 uppercase disabled:bg-transparent disabled:opacity-30 disabled:shadow-none leading-none'
                    )}
                  >
                    <span
                      className={classNames(
                        active && property ? 'border-bottom' : ''
                      )}
                    >
                      {title}
                    </span>
                  </button>
                </li>
              )
          })}
      </ul>

      {state.property?._id && (
        <div ref={propertyRef} className="md:grid md:grid-cols-3 md:pr-menu">
          <Property
            className="md:col-start-2 md:col-span-1"
            property={state.property}
          />
        </div>
      )}

      {state.unit?._id && (
        <div ref={unitRef}>
          <Unit accordions={howItWorksContent} />
        </div>
      )}
    </Block>
  )
}

export const CitiesBlock = memo(CitiesBlockComponent)

export default CitiesBlock
