import { type FC, useContext } from 'react'
import classNames from 'classnames'
import type { CitiesBlockProps } from './types'
import { Block, SanityLink } from '@components/sanity'
import { HomeContext } from '@contexts/home'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import { sendGoogleEvent, sendHubspotEvent } from '@lib/util'
import Image from 'next/image'
import { SanityLinkType } from '@studio/lib'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'

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

  return (
    <Block className={classNames(className)}>
      {headers &&
        headers.map((header, index) => (
          <div
            key={header}
            className={`-menu ${index == 1 ? 'md:order-last' : ''}`}
          >
            <h2 className="max-w-[390px] mobile-landing md:mobile-landing uppercase pr-8 mb-12 md:mb-16">
              {header}
            </h2>
          </div>
        ))}

      <ul className="max-w-[390px] grid grid-cols-1 gap-y-2 md:gap-y-0 pr-10 md:pr-0 mb-20">
        {citiesList &&
          citiesList.map(({ _id, title, active, propertyLink }) => {
            return (
              <li key={_id} className="text-left">
                {propertyLink ? (
                  <SanityLink
                    onClick={() => {
                      // property && updateProperty(title)
                      const options = { city: title }
                      sendGoogleEvent(`clicked city button`, options)
                      // sendHubspotEvent(`clicked ${title}`, 'clicked')
                    }}
                    {...(propertyLink as SanityLinkType)}
                    className={classNames('mobile-landing text-left uppercase')}
                  >
                    <IconRightArrowBold className="mr-1 home-svg" />
                    <span
                      className={classNames(
                        active && propertyLink
                          ? 'leading-none border-bottom border-b-[0.1em]'
                          : ''
                      )}
                    >
                      {title}
                    </span>
                  </SanityLink>
                ) : (
                  <div
                    className={classNames(
                      'mobile-landing text-left uppercase bg-transparent opacity-30 shadow-none'
                    )}
                  >
                    <IconRightArrowBold className="mr-1 home-svg" />
                    <span
                      className={classNames(
                        active && propertyLink
                          ? 'leading-none border-bottom border-b-[0.1em]'
                          : ''
                      )}
                    >
                      {title}
                    </span>
                  </div>
                )}
              </li>
            )
          })}
      </ul>
    </Block>
  )
}

export default CitiesBlock
