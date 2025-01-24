import { type FC, memo } from 'react'
import classNames from 'classnames'
import { BlockContent, RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { PropertyElProps } from './types'
import { PropertyTypesList } from '@components/property-type'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { useWaitlisModal } from '@contexts/modals'
import { sendGoogleEvent } from '@lib/util'
import Link from 'next/link'

export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  block,
  className,
}) => {
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()

  const openWaitlist = () => {
    setWaitlistOpen(true)
    const options = { location: window.location.pathname }
    sendGoogleEvent('opened waitlist modal', options)
  }

  return (
    <div className={classNames(className, 'md:pr-menu')}>
      <h2 className="absolute w-[100svh] md:w-auto right-0 transform translate-x-[calc(100%-12px)] rotate-90 origin-top-left text-h2">
        0001 {property?.title}
      </h2>
      <div className="md:grid md:grid-cols-2 gap-y block relative md:pl-x">
        <div className="flex flex-col px-x md:px-0">
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
                className="w-full h-auto pr-menu md:pr-0 object-contain"
              />
            </div>
          )}

          <div className="mr-menu md:mr-0 md:overflow-x-hidden">
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
                className="mt-ydouble md:mt-0 overflow-visible"
              />
            )}
          </div>
        </div>

        <div className="col-start-1 md:col-span-2 pr-menu md:pr-0">
          {!block && (
            <div className="px-x md:px-0 pt-ydouble mt-ydouble overflow-hidden">
              {property?.propertyTypesList && (
                <>
                  <h2 className="text-h2">Apartments</h2>
                  {property?.availableText && (
                    <div className="mt-ydouble uppercase">
                      {property?.availableText}
                    </div>
                  )}
                  <PropertyTypesList
                    className="animate-in flex flex-col mt-ydouble"
                    propertyTypesList={property?.propertyTypesList}
                  />
                </>
              )}
            </div>
          )}

          <div className="md:hidden relative w-full mt-header mb-y px-x cursor-pointer z-above">
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

          <div className="md:hidden relative w-full px-x cursor-pointer z-above">
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
