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
import NextLink from 'next/link'
export const CitiesBlock: FC<CitiesBlockProps> = ({
  headers,
  citiesList,
  headersBottom,
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
          <div key={header} className={`-menu `}>
            <h2 className="max-w-[390px] mobile-landing md:mobile-landing uppercase pr-8 mb-12 md:mb-16">
              {header}
            </h2>
          </div>
        ))}

      <ul className="max-w-[390px] grid grid-cols-1 gap-y-0 md:gap-y-0 pr-10 md:pr-0 mb-12">
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
      <div className="grid">
        <div className="flex flex-row">
          <div className="flex flex-col">
            {headersBottom &&
              headersBottom.map((header, index) => {
                return (
                  <>
                    {index === 3 && (
                      <div className="pr-menu md:pr-0 max-w-[390px] mb-12">
                        <NextLink
                          className={classNames(
                            `w-full bg-black text-white border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 relative z-above`
                          )}
                          href="/how-it-works"
                        >
                          <p className="mb-0 py-2 text-left pl-4 uppercase">
                            How It Works
                          </p>{' '}
                          <p className=" py-2 pb-[0.55rem] text-[16px] text-right pr-4">
                            →
                          </p>
                        </NextLink>
                      </div>
                    )}
                    <div key={header} className={`-menu `}>
                      <h2 className="max-w-[390px] mobile-landing md:mobile-landing uppercase pr-8 mb-12 md:mb-16">
                        {header}
                      </h2>
                    </div>
                  </>
                )
              })}
          </div>
        </div>
      </div>
    </Block>
  )
}

export default CitiesBlock
