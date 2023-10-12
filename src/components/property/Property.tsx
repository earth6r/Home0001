import { type FC, memo } from 'react'
import classNames from 'classnames'
import { RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { UnitsList } from '@components/unit'
import { PropertyElProps } from './types'

export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <div className="block relative mt-10 md:mt-20">
        {property?.image && (
          <div className="block relative w-full h-full mb-10">
            <SanityMedia
              imageProps={{
                alt: property?.image.alt || 'Building image',
                layout: 'responsive',
                quality: 8,
                priority: true,
                lqip: property?.image?.image?.asset.metadata.lqip,
              }}
              {...property?.image}
            />
          </div>
        )}

        {property?.header && <RichText blocks={property?.header} />}

        {property?.coordinates && (
          <MapDialog
            text="Map"
            coordinates={property?.coordinates}
            className="mt-4"
          />
        )}

        {property?.description && (
          <RichText
            blocks={property?.description}
            className="pr-menu md:pr-0 mt-8"
          />
        )}

        {property?.unitsList && (
          <>
            <div className="mt-9">Choose an available 0001 home here:</div>
            <UnitsList
              className="mx-[-1rem] animate-in flex flex-col gap-3 mt-7"
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
