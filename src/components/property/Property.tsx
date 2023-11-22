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
    <div className={classNames(className, 'overflow-x-hidden')}>
      <h2 className="mb-12 px-x text-title">HOME0001: {property?.title}</h2>
      <div className="md:grid md:grid-cols-3 gap-14 md:col-start-1 block relative ">
        {property?.image && (
          <div className="block relative w-full h-full mb-10 z-base">
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

        <div>
          {property?.header && (
            <RichText blocks={property?.header} className="px-xlg" />
          )}

          {property?.coordinates && (
            <MapDialog
              text="Map"
              coordinates={property?.coordinates}
              className="px-xlg text-xs font-bold"
            />
          )}
        </div>

        {property?.body && (
          <BlockContent blocks={property?.body} className="mt-ydouble px-x" />
        )}

        <div className="mt-ylg mx-x pt-ylg border-top">
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
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
