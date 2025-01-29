import { type FC, memo, useEffect, useState } from 'react'
import classNames from 'classnames'
import { BlockContent, RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { PropertyElProps } from './types'
import { PropertyTypesList } from '@components/property-type'
import IconSmallArrow from '@components/icons/IconSmallArrow'
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

  return (
    <div
      className={classNames(
        className,
        navOpen ? 'right-[calc(100vw-60px)] lg:right-[33.33vw]' : 'right-0',
        'relative lg:pr-menu transition-all duration-500'
      )}
    >
      <div
        className={classNames(
          navOpen
            ? 'right-[-32px] lg:right-[calc(-66.666vw+72px)] bg-white overflow-scroll'
            : 'right-[calc(-100vw+42px)] lg:right-[calc(-100vw+42px)]',
          'flex flex-col justify-end gap-4 fixed w-[100svh] lg:w-auto h-[calc(100vw+32px)] transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left transition-all duration-500 border-none z-above'
        )}
      >
        {allProperties
          ?.sort(
            (a: PropertyType | any, b: PropertyType | any) =>
              b?.title?.localeCompare && b?.title?.localeCompare(a?.title)
          )
          ?.map((item: PropertyType | any, index) => {
            if (item.title === property?.title) return
            return (
              <Link
                onClick={() => setNavOpen(!navOpen)}
                href={`/property/${item.slug?.current}`}
                key={`${index}-${item.typeTitle}`}
              >
                <h2 className="text-h2">{item.title}</h2>
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
        <div className="flex flex-col px-x md:pl-x md:pr-0 lg:pl-0">
          {property?.image && (
            <div className="block relative w-full mb-y z-base">
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

          <div className="mr-menu lg:mr-0 lg:overflow-x-hidden">
            <div className="mb-ydouble">
              {property?.header && <RichText blocks={property?.header} />}

              {property?.coordinates && (
                <MapDialog
                  text="View Map"
                  coordinates={property?.coordinates}
                  className="text-xs font-bold mt-y"
                />
              )}
            </div>

            {property?.body && (
              <BlockContent
                blocks={property?.body}
                grid={false}
                className="mt-ydouble lg:mt-0 overflow-visible"
              />
            )}
          </div>
        </div>

        <div className="col-start-1 lg:col-span-2 pr-menu lg:pr-0">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xdouble mt-ydouble"
                    propertyTypesList={property?.propertyTypesList}
                  />
                </>
              )}
            </div>
          )}

          <div className="lg:hidden relative w-full mt-header mb-y px-x cursor-pointer z-above">
            <button
              onClick={openWaitlist}
              className={classNames(
                'w-full relative flex flex-row justify-between items-center h-12 max-h-12 p-x border-black hover:border-white bg-black text-white hover:invert transition-all duration-200 text-button'
              )}
            >
              {`Apply`}
              <IconSmallArrow width="16" height="10" fill="white" />
            </button>
          </div>

          <div className="lg:hidden relative w-full px-x cursor-pointer z-above">
            <Link href="/how-it-works">
              <button
                className={classNames(
                  'w-full relative flex flex-row justify-between items-center h-12 max-h-12 p-x border-black hover:border-white bg-black text-white hover:invert transition-all duration-200 text-button'
                )}
              >
                {`How it works`}
                <IconSmallArrow width="16" height="10" fill="white" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
