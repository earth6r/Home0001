import { type FC } from 'react'
import classNames from 'classnames'
import type {
  CitiesBlockProps,
  CitiesListProps,
  CityBlockPropertyType,
  KeyedProperty,
} from './types'
import { Block, SanityLink, SanityMedia } from '@components/sanity'
import { sendGoogleEvent } from '@lib/util'
import { SanityLinkType } from '@studio/lib'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import NextLink from 'next/link'
import { useWaitlisModal } from '@contexts/modals'
import Link from 'next/link'
import { Waitlist } from '@components/waitlist'

const CITY_ORDER = [
  'Los Angeles',
  'New York',
  'Paris',
  'London',
  'Berlin',
  'Mexico City',
]

const CitiesList: FC<CitiesListProps> = ({ citiesList }) => (
  <ul className="">
    {citiesList &&
      citiesList.map(({ _id, title, active, propertyLink }) => {
        return (
          <li key={_id} className="text-left">
            {propertyLink ? (
              <SanityLink
                onClick={() =>
                  sendGoogleEvent(`clicked city button`, { city: title })
                }
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
)

const PropertySummary: FC<CityBlockPropertyType> = ({
  image,
  longTitle,
  slug,
}) => (
  <div className="hidden md:flex md:sticky md:top-[126px] md:left-0 md:self-start">
    <Link href={`/property/${slug.current}`}>
      {image && (
        <div className="block relative w-full mb-yhalf z-base">
          <SanityMedia
            imageProps={{
              alt: image.alt || 'Building image',
              layout: 'responsive',
              quality: 8,
              priority: true,
              lqip: (image?.image as any)?.asset?.metadata?.lqip,
            }}
            {...(image as any)}
          />
        </div>
      )}
      {longTitle && (
        <div
          className={classNames(
            'flex gap-1 items-start mobile-landing text-left uppercase'
          )}
        >
          <IconRightArrowBold className="mt-1 home-svg" />
          <span
            className={classNames(
              'inline-block w-[calc(100%-49px)] underline underline-offset-[0.2em]'
            )}
          >
            {longTitle}
          </span>
        </div>
      )}
    </Link>
  </div>
)

export const CitiesBlock: FC<CitiesBlockProps> = ({
  headers,
  citiesList,
  citiesPosition,
  howItWorksPosition,
  properties,
  className,
}) => {
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()

  function customSort(a: Record<any, any>, b: Record<any, any>) {
    const indexA = CITY_ORDER.indexOf(a.title)
    const indexB = CITY_ORDER.indexOf(b.title)

    return indexA - indexB
  }

  const sortedCities = citiesList?.sort(customSort)

  return (
    <Block className={classNames(className, 'md:mb-page', '-ml-[2px]')}>
      <div className="grid md:grid-cols-3 gap-12 md:gap-16">
        <div className="flex flex-col gap-12 md:gap-16">
          {headers &&
            headers.map((header, index) => {
              return (
                <div key={header}>
                  <h2 className="mobile-landing md:mobile-landing uppercase pl-x md:pl-0 pr-menu md:pr-0">
                    {header}
                  </h2>

                  {index + 1 === citiesPosition && (
                    <div className="px-x md:px-0 mt-12 md:mt-16">
                      <CitiesList citiesList={sortedCities} />
                    </div>
                  )}

                  {index + 1 === howItWorksPosition && (
                    <div className="pl-x md:pl-0 pr-menu md:pr-0 mt-12 md:mt-16 md:mr-x">
                      <NextLink
                        className={classNames(
                          `w-full bg-black text-white border-1 border-black border-solid mb-[2px] p-4 flex flex-row justify-between items-center h-12 max-h-12 relative z-above`
                        )}
                        href="/how-it-works"
                      >
                        <p className="mb-0 py-2 text-left uppercase">
                          How It Works
                        </p>{' '}
                        <IconSmallArrow width="22" height="10" />
                      </NextLink>
                    </div>
                  )}

                  {index === headers.length - 2 && (
                    <>
                      {properties &&
                        (properties as KeyedProperty[])?.map(
                          ({ image, longTitle, slug }) => (
                            <div key={slug.current} className="md:hidden mt-12">
                              <Link href={`/property/${slug.current}`}>
                                {image && (
                                  <div className="block relative w-full mb-yhalf z-base">
                                    <SanityMedia
                                      imageProps={{
                                        alt: image.alt || 'Building image',
                                        layout: 'responsive',
                                        quality: 8,
                                        priority: true,
                                        lqip: (image?.image as any)?.asset
                                          ?.metadata?.lqip,
                                      }}
                                      {...(image as any)}
                                    />
                                  </div>
                                )}
                                {longTitle && (
                                  <div
                                    className={classNames(
                                      'flex gap-1 items-start mobile-landing text-left uppercase px-x'
                                    )}
                                  >
                                    <IconRightArrowBold className="mt-2 home-svg" />
                                    <span
                                      className={classNames(
                                        'pr-menu inline-block w-[calc(100%-49px)] text-under underline underline-offset-[0.2em]'
                                      )}
                                    >
                                      {longTitle}
                                    </span>
                                  </div>
                                )}
                              </Link>
                            </div>
                          )
                        )}
                    </>
                  )}
                </div>
              )
            })}
          <div>
            <Waitlist />
          </div>
        </div>

        {properties &&
          (properties as KeyedProperty[])?.map(({ image, longTitle, slug }) => (
            <PropertySummary
              key={slug.current}
              image={image}
              longTitle={longTitle}
              slug={slug}
            />
          ))}
      </div>
    </Block>
  )
}

export default CitiesBlock
