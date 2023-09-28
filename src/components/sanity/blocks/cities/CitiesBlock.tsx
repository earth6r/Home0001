import { type FC, useContext, useEffect } from 'react'
import classNames from 'classnames'
import type { CitiesBlockProps, KeyedProperty } from './types'
import { Block } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import { Property } from '@components/property'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import type { KeyedUnit } from '@components/unit'
import { Unit } from '@components/unit'

export const CitiesBlock: FC<CitiesBlockProps> = ({
  headers,
  citiesList,
  howItWorksContent,
  className,
}) => {
  const router = useRouter()
  const { dispatch, state } = useContext(HomeContext)

  const dispatchUnit = (
    cityId: string,
    property: KeyedProperty,
    unit: KeyedUnit,
    title?: string
  ) => {
    dispatch({
      ...state,
      type: 'SET_UNIT',
      payload: {
        cityId: cityId,
        property: property,
        unit: unit,
        slug: title,
      },
    })
  }

  const dispatchProperty = (
    cityId: string,
    property: KeyedProperty,
    title?: string
  ) => {
    dispatch({
      ...state,
      type: 'SET_PROPERTY',
      payload: {
        cityId: cityId,
        property: property,
        slug: title,
      },
    })
  }

  const updatePath = (title?: string) => {
    if (title !== router.query.city)
      router.push(`?city=${title}`, undefined, { shallow: true })
  }

  const updateProperty = (
    cityId: string,
    property: KeyedProperty,
    title?: string
  ) => {
    const slugifiedTitle = title && slugify(title, { lower: true })
    dispatchProperty(cityId, property, slugifiedTitle)
    updatePath(slugifiedTitle)
  }

  const filterListByTitleProp = (list: any[] | undefined, query: string) => {
    const filteredList = list?.filter(({ title }: any) => {
      const slugifiedTitle = title && slugify(title, { lower: true })
      return slugifiedTitle === query
    })
    return filteredList?.length === 1 && filteredList[0]
  }

  // check for path queries on first load
  // city assumes on property and assigns ~ JLM
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

      unitQuery && activeUnit
        ? dispatchUnit(
            activeCity._id,
            property,
            activeUnit,
            unitQuery as string
          )
        : dispatchProperty(activeCity._id, property, cityQuery as string)
    }
  }, [])

  return (
    <Block className={classNames(className)}>
      {headers &&
        headers.map(header => (
          <div key={header} className="rich-text">
            <h2 className="uppercase pr-[30%] md:pr-0 mb-12 md:mb-16">
              {header}
            </h2>
          </div>
        ))}

      <ul className="grid grid-cols-3 gap-y-10 md:gap-y-20 pr-10">
        {citiesList &&
          citiesList.map(({ _id, title, active, properties }) => {
            const property = properties && properties[0]
            if (_id)
              return (
                <li key={_id}>
                  <button
                    disabled={!active || !property}
                    onClick={() =>
                      property && updateProperty(_id, property, title)
                    }
                    className={classNames(
                      state.property.cityId === _id ? 'font-bold' : '',
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

      {/* Probably overkill to rely on context for everything but 
      will be useful down the line and cleaner for the moment ~ JLM */}
      {state.property._id && (
        <div className="md:grid md:grid-cols-3 pr-10">
          <Property className="md:col-start-2 md:col-span-1" />
        </div>
      )}

      {state.unit._id && (
        <div className="md:grid md:grid-cols-3 pr-10">
          <Unit
            className="md:col-start-2 md:col-span-1"
            accordions={howItWorksContent}
          />
        </div>
      )}
    </Block>
  )
}

export default CitiesBlock
