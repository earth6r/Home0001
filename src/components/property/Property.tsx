import { type FC, memo } from 'react'
import classNames from 'classnames'
import { BlockContent, RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { UnitsList } from '@components/unit'
import { PropertyElProps } from './types'
import { Waitlist } from '@components/waitlist'

export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  className,
}) => {
  return (
    <div className={classNames(className, 'md:pl-x overflow-x-hidden')}>
      <h2 className="mb-12 px-x md:px-0 text-title">
        HOME0001: {property?.title}
      </h2>
      <div className="md:grid md:grid-cols-3 gap-14 md:col-start-1 block relative">
        <div className="flex flex-col justify-start items-start">
          {property?.image && (
            <div className="block relative w-full mb-10 z-base">
              <SanityMedia
                imageProps={{
                  alt: property?.image.alt || 'Building image',
                  layout: 'responsive',
                  quality: 8,
                  priority: true,
                  lqip: (property?.image?.image as any)?.asset?.metadata?.lqip,
                }}
                {...(property?.image as any)}
              />
            </div>
          )}

          {property?.header && (
            <RichText
              blocks={property?.header}
              className="px-xlg md:px-xhalf"
            />
          )}

          {property?.coordinates && (
            <MapDialog
              text="Map"
              coordinates={property?.coordinates}
              className="px-xlg md:px-xhalf text-xs font-bold"
            />
          )}
        </div>

        <div className="col-span-2">
          {property?.body && (
            <BlockContent
              blocks={property?.body}
              grid={false}
              className="mt-ydouble md:mt-0 px-x md:pl-0 overflow-hidden"
            />
          )}
        </div>
      </div>

      <div className="mt-ylg mx-x pt-ylg md:pt-page border-top">
        <h2 className="text-title uppercase">Available Homes:</h2>
        {property?.unitsList && (
          <>
            {property?.availableText && (
              <div className="mt-9 uppercase">{property?.availableText}</div>
            )}
            <UnitsList
              className="mx-[-1rem] animate-in flex flex-col mt-ydouble"
              unitList={property?.unitsList}
            />
          </>
        )}
      </div>

      {property?.waitlistLinkText && (
        <Waitlist
          buttonText={property?.waitlistLinkText}
          className="mt-ydouble"
        />
      )}
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
