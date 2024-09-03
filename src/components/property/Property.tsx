import { type FC, memo } from 'react'
import classNames from 'classnames'
import { BlockContent, RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { PropertyElProps } from './types'
import { PropertyTypesList } from '@components/property-type'

export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  block,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <h2 className="mb-ydouble pl-x text-h1 md:text-center pr-menu md:px-x">
        Home0001: {property?.title}
      </h2>
      <div className="md:grid md:grid-cols-2 gap-y md:col-start-1 block relative md:pl-x">
        <div className="flex flex-col md:col-span-1 md:justify-start md:items-start md:sticky top-[64px] left-0 md:h-[64vw] px-x md:px-0">
          {property?.image && (
            <div className="col-span-2 block relative w-full mb-ydouble md:mb-y z-base">
              <SanityMedia
                imageProps={{
                  alt: property?.image.alt || 'Building image',
                  quality: 80,
                  priority: true,
                  lqip: (property?.image?.image as any)?.asset?.metadata?.lqip,
                }}
                {...(property?.image as any)}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>

        <div className="col-span-1 overflow-x-hidden">
          <div className="px-x md:px-0 mb-ydouble">
            {property?.header && <RichText blocks={property?.header} />}

            {property?.coordinates && (
              <MapDialog
                text="View Map"
                coordinates={property?.coordinates}
                className="text-xs font-bold"
              />
            )}
          </div>

          {property?.body && (
            <BlockContent
              blocks={property?.body}
              grid={false}
              className="mt-ydouble md:mt-0 pl-x pr-menu md:pl-0 md:pr-x overflow-hidden"
            />
          )}
        </div>
      </div>

      {!block && (
        <div className="pt-ydouble mt-ydouble overflow-hidden">
          {property?.propertyTypesList && (
            <>
              <h2 className="text-h2 md:text-h1 px-x md:text-center">
                Our Next Releases:
              </h2>
              {property?.availableText && (
                <div className="mt-9 md:px-x uppercase">
                  {property?.availableText}
                </div>
              )}
              <PropertyTypesList
                className="animate-in flex flex-col mt-ydouble mx-x"
                propertyTypesList={property?.propertyTypesList}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
