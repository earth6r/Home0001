import { type FC, HTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import { HomeContext } from '@contexts/home'
import { RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { UnitsList } from '@components/units'

export const Property: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const { dispatch, state } = useContext(HomeContext)
  const property = state.property

  return (
    <div className={classNames(className)}>
      <div className="block relative mt-10 md:mt-20">
        {property.image && (
          <div className="block relative h-full mb-10">
            <div className="relative w-full" style={{ paddingTop: `79.9%` }}>
              <SanityMedia
                imageProps={{
                  alt: property.image.alt || 'Building image',
                  fill: true,
                  objectFit: 'cover',
                  width: undefined,
                  height: undefined,
                }}
                {...property.image}
              />
            </div>
          </div>
        )}

        {property.header && <RichText blocks={property.header} />}

        {property.coordinates && (
          <MapDialog
            text="Map"
            coordinates={property.coordinates}
            className="mt-4"
          />
        )}

        {property.description && (
          <RichText blocks={property.description} className="mt-8" />
        )}

        {property.unitsList && (
          <>
            <div className="mt-9">Choose an available 0001 home here:</div>

            <UnitsList className="" />
          </>
        )}
      </div>
    </div>
  )
}

export default Property
