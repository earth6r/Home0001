import { type FC, useContext } from 'react'
import classNames from 'classnames'
import type { CitiesBlockProps } from './types'
import { Block } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import { sendGoogleEvent, sendHubspotEvent } from '@lib/util'

export const CitiesBlock: FC<CitiesBlockProps> = ({
  headers,
  citiesList,
  className,
}) => {
  const router = useRouter()
  const { state } = useContext(HomeContext)

  const updatePath = (title?: string) => {
    if (title !== router.query.city)
      router.push(`?city=${title}`, undefined, { shallow: true })
  }

  const updateProperty = (title?: string) => {
    const slugifiedTitle = title && slugify(title, { lower: true })
    updatePath(slugifiedTitle)
  }

  const cityOrder = [
    'Los Angeles',
    'New York',
    'Paris',
    'London',
    'Berlin',
    'Mexico City',
  ]

  function customSort(a: Record<any, any>, b: Record<any, any>) {
    const indexA = cityOrder.indexOf(a.title)
    const indexB = cityOrder.indexOf(b.title)

    return indexA - indexB
  }

  const sortedCities = citiesList?.sort(customSort)
  console.log('sortedCities:', sortedCities)

  return (
    <Block className={classNames(className)}>
      {headers &&
        headers.map(header => (
          <div key={header} className="-menu">
            <h2 className="max-w-[390px] mobile-landing uppercase pr-10 mb-12 md:mb-16">
              {header}
            </h2>
          </div>
        ))}

      <ul className="max-w-[390px] grid grid-cols-1 gap-y-2 md:gap-y-0 pr-10 md:pr-0 mb-20">
        {citiesList &&
          citiesList.map(({ _id, title, active, properties }) => {
            const property = properties && properties[0]
            if (_id)
              return (
                <li key={_id} className="text-left flex gap-2">
                  <img src="https://ik.imagekit.io/ljqwnqnom/arrow_4KHlnGx0T.svg?updatedAt=1696980257065"></img>
                  <button
                    disabled={!active || !property}
                    onClick={() => {
                      property && updateProperty(title)
                      sendGoogleEvent(`click_${title}_button`)
                      // sendHubspotEvent(`clicked ${title}`, 'clicked')
                    }}
                    className={classNames(
                      state.property?.cityId === _id ? 'font-bold' : '',
                      'mobile-landing text-left uppercase disabled:bg-transparent disabled:opacity-30 disabled:shadow-none leading-none'
                    )}
                  >
                    <span
                      className={classNames(
                        active && property ? 'border-bottom border-b-[3px]' : ''
                      )}
                    >
                      {title}
                    </span>
                  </button>
                </li>
              )
          })}
      </ul>
    </Block>
  )
}

export default CitiesBlock
