import { type FC, memo, useEffect, useState } from 'react'
import classNames from 'classnames'
import { BlockContent, RichText, SanityMedia } from '@components/sanity'
import { PropertyElProps } from './types'
import { PropertyTypesList } from '@components/property-type'
import { useWaitlisModal } from '@contexts/modals'
import { sendGoogleEvent } from '@lib/util'
import Link from 'next/link'
import IconChevron from '@components/icons/IconChevron'
import { Property as PropertyType } from '@studio/gen/sanity-schema'

export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  allProperties,
  block,
  className,
}) => {
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpen])

  const openWaitlist = () => {
    setWaitlistOpen(true)
    const options = { location: window.location.pathname }
    sendGoogleEvent('opened waitlist modal', options)
  }

  const matchingCityProperties = allProperties
    ?.filter(
      (item: any) =>
        item?.location?.title === property?.location?.title &&
        item?.title !== property?.title
    )
    .sort(
      (a: any, b: any) =>
        b?.title?.localeCompare && b?.title?.localeCompare(a?.title)
    )

  return (
    <div
      className={classNames(
        className,
        navOpen ? 'right-[calc(100vw-60px)] lg:right-[33.33vw]' : 'right-0',
        'relative lg:pr-x transition-all duration-500'
      )}
    >
      <div
        className={classNames(
          navOpen
            ? 'right-[-16px] lg:right-[calc(-66.666vw+72px)] pb-x bg-white overflow-scroll'
            : 'right-[calc(-100vw+41px)] lg:right-[calc(-100vw+41px)]',
          'flex flex-col justify-end gap-8 fixed w-[100svh] lg:w-auto h-[calc(100vw+32px)] top-0 pl-header transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left transition-all duration-500 border-none z-above'
        )}
      >
        {property?.location && (
          <h3 className="text-h3">{`${property.location.title}:`}</h3>
        )}

        {matchingCityProperties?.map((item: PropertyType | any, index) => {
          return (
            <Link
              onClick={() => setNavOpen(!navOpen)}
              href={`/property/${item.slug?.current}`}
              key={`${index}-${item.typeTitle}`}
            >
              <h2 className="inline border-bottom border-[6px] text-side">
                {item.title}
              </h2>
            </Link>
          )
        })}

        <button
          onClick={() => setNavOpen(!navOpen)}
          className={classNames('flex items-end gap-2 ')}
        >
          <h2 className="text-side">{property?.title}</h2>

          <div
            className={classNames(
              navOpen ? 'rotate-180' : '',
              'flex items-center justify-center relative w-[21px] h-[21px] bottom-0 bg-black transition-transform duration-500'
            )}
          >
            <IconChevron width="12" fill="white" className="rotate-0" />
          </div>
        </button>
      </div>

      <div
        className={classNames(
          navOpen
            ? 'opacity-0 lg:opacity-100 duration-100 delay-300'
            : 'opacity-100 duration-100',
          'lg:grid lg:grid-cols-2 gap-y block relative lg:pl-x transition-opacity'
        )}
      >
        <div className="flex flex-col pr-x md:pl-x md:pr-0 lg:pl-0">
          {property?.image && (
            <div className="block relative w-full z-base">
              <SanityMedia
                imageProps={{
                  alt: property?.image.alt || 'Building image',
                  quality: 80,
                  priority: true,
                  lqip: (property?.image?.image as any)?.asset?.metadata?.lqip,
                }}
                {...(property?.image as any)}
                className="w-full h-auto pr-menu lg:pr-0 object-contain"
              />
            </div>
          )}

          <div className="pl-x md:pl-0 mr-menu lg:mr-0 lg:overflow-x-hidden">
            <div className="hidden">
              {property?.header && <RichText blocks={property?.header} />}
            </div>

            {property?.body && (
              <BlockContent
                blocks={property?.body}
                grid={false}
                className=" lg:mt-0 overflow-visible"
              />
            )}
          </div>
        </div>

        <div className="col-start-1 lg:col-span-2 pr-menu md:pr-0">
          {!block && (
            <div className="px-x md:pl-x md:pr-0 lg:pl-0 pt-ydouble mt-ydouble overflow-hidden">
              {property?.propertyTypesList && (
                <>
                  <h2 className="text-h2">Available Homes:</h2>
                  {property?.availableText && (
                    <div className="mt-ydouble uppercase">
                      {property?.availableText}
                    </div>
                  )}
                  <PropertyTypesList
                    className="grid grid-cols-1 lg:grid-cols-4 md:w-1/2 lg:w-full gap-x mt-y"
                    propertyTypesList={property?.propertyTypesList}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
