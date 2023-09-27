import { type FC, useContext } from 'react'
import classNames from 'classnames'
import type { CitiesBlockProps, KeyedProperty } from './types'
import { Block } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import { Property } from '@components/property'

export const CitiesBlock: FC<CitiesBlockProps> = ({
  headers,
  citiesList,
  className,
}) => {
  const { dispatch, state } = useContext(HomeContext)

  const updateProperty = (cityId: string, property: KeyedProperty) => {
    dispatch({
      ...state,
      type: 'SET_PROPERTY',
      payload: {
        cityId: cityId,
        property: property,
      },
    })
  }

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
            // only getting one property for now ~ JLM
            const property = properties && properties[0]
            if (_id)
              return (
                <li key={_id}>
                  <button
                    disabled={!active || !property}
                    onClick={() => property && updateProperty(_id, property)}
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
    </Block>
  )
}

export default CitiesBlock
