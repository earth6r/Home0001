import { type FC, memo } from 'react'
import classNames from 'classnames'
import { BlockContent, RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { UnitsList } from '@components/unit'
import { PropertyElProps } from './types'
// import { Waitlist } from '@components/waitlist'

export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  className,
}) => {
  return (
    <div className={classNames(className, 'md:pl-x')}>
      <h2 className="mb-12 px-x md:px-0 text-xl md:text-2xl font-bold uppercase pr-menu md:pr-0">
        HOME0001:
        <br />
        {property?.title}
      </h2>
      <div className="md:grid md:grid-cols-8 gap-10 md:col-start-1 block relative">
        <div className="grid grid-cols-[1fr_177px] md:flex md:flex-col md:col-span-3 md:justify-start md:items-start md:sticky top-[var(--header-height)] left-0 md:h-[48vw]">
          {property?.image && (
            <div className="col-span-2 block relative w-full mb-10 z-base">
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

          <div className="col-start-2 pr-xhalf md:px-xhalf">
            {property?.header && <RichText blocks={property?.header} />}

            {property?.coordinates && (
              <MapDialog
                text="Map"
                coordinates={property?.coordinates}
                className="text-xs font-medium"
              />
            )}
          </div>
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
        <h2 className="text-xl md:text-2xl font-bold uppercase md:mr-x">
          Our Next Releases:
        </h2>
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
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
