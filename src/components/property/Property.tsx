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
    <div className={classNames(className, 'md:pl-x')}>
      <h2 className="mb-12 px-x md:px-0 md:ml-[-8px] text-title">
        HOME0001: {property?.title}
      </h2>
      <div className="md:grid md:grid-cols-8 gap-10 md:col-start-1 block relative">
        <div className="md:col-span-3 flex flex-col justify-start items-start md:sticky top-[var(--header-height)] left-0 md:h-[48vw]">
          {property?.image && (
            <div className="block relative w-full mb-10 z-base">
              <SanityMedia
                imageProps={{
                  alt: property?.image.alt || 'Building image',
                  quality: 8,
                  priority: true,
                  lqip: (property?.image?.image as any)?.asset?.metadata?.lqip,
                }}
                {...(property?.image as any)}
                className="w-full h-auto object-contain"
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

        <div className="col-span-5 overflow-x-hidden">
          {property?.body && (
            <BlockContent
              blocks={property?.body}
              grid={false}
              className="mt-ydouble md:mt-0 px-x md:px-0 overflow-hidden"
            />
          )}
        </div>
      </div>

      <div className="mx-x md:mx-0 md:pt-0">
        <div className="w-auto md:mr-x mt-ylg pt-ylg md:pt-page border-top"></div>
        <h2 className="text-title uppercase md:mr-x">Available Homes:</h2>
        {property?.unitsList && (
          <>
            {property?.availableText && (
              <div className="mt-9 md:mr-x uppercase">
                {property?.availableText}
              </div>
            )}
            <UnitsList
              className="mx-[-1rem] md:mx-0 animate-in flex flex-col mt-ydouble"
              unitList={property?.unitsList}
            />
          </>
        )}
      </div>

      {property?.waitlistLinkText && (
        <Waitlist
          buttonText={property?.waitlistLinkText}
          className="mt-ydouble md:mt-14 lg:ml-[467px]"
        />
      )}
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
