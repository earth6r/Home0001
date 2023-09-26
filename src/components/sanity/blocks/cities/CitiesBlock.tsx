import { type FC, useContext } from 'react'
import classNames from 'classnames'
import type { CitiesBlockProps } from './types'
import { Block } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import slugify from 'slugify'
import { City } from '@components/city'

export const CitiesBlock: FC<CitiesBlockProps> = ({
  headers,
  citiesList,
  className,
}) => {
  const { dispatch, state } = useContext(HomeContext)
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
          citiesList.map(({ _id, title, active }) => {
            const slugifiedTitle = title ? slugify(title) : null
            return (
              slugifiedTitle && (
                <li key={_id}>
                  <button
                    disabled={!active}
                    onClick={() =>
                      dispatch({
                        ...state,
                        type: 'SET_CITY',
                        city: slugifiedTitle,
                      })
                    }
                    className={classNames(
                      state.city === slugifiedTitle ? 'font-bold' : '',
                      'p-5 -m-5 uppercase disabled:bg-transparent disabled:opacity-30 disabled:shadow-none leading-none'
                    )}
                  >
                    <span className={classNames(active ? 'border-bottom' : '')}>
                      {title}
                    </span>
                  </button>
                </li>
              )
            )
          })}
      </ul>

      {state.city && <City />}
    </Block>
  )
}

export default CitiesBlock
