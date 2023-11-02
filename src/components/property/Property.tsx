import { type FC, memo } from 'react'
import classNames from 'classnames'
import { RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { UnitsList } from '@components/unit'
import { PropertyElProps } from './types'
import { Accordion } from '@components/accordion'

export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  className,
}) => {
  console.log(property)
  return (
    <div className={classNames(className)}>
      <div className="block relative mt-10 md:mt-20">
        {property?.image && (
          <div className="block relative w-full h-full mb-10 z-base">
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
            className="pr-menu md:pr-0 mt-8 mb-8"
          />
        )}
        {property?.propertyDetails &&
          property.propertyDetails.length > 0 &&
          property.propertyDetails.map(({ _key, header, text }) => (
            <Accordion
              key={_key}
              header={header}
              text={text}
              className="mt-2 border-x-0 border-t-0"
            />
          ))}

        {property?.unitsList && (
          <>
            <div className="mt-9 uppercase">Available at 48 Allen</div>
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
