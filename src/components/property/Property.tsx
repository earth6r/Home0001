import { type FC, useContext } from 'react'
import classNames from 'classnames'
import { HomeContext } from '@contexts/home'
import { RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { UnitsList } from '@components/unit'
import { PropertyElProps } from './types'

export const Property: FC<PropertyElProps> = ({ className }) => {
  const { state } = useContext(HomeContext)
  const property = state.property

  return (
    <div className={classNames(className)}>
      <div className="block relative mt-10 md:mt-20">
        {property?.image && (
          <div className="block relative w-full h-full mb-10">
            <SanityMedia
              imageProps={{
                alt: property?.image.alt || 'Building image',
                layout: 'responsive',
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
            <UnitsList className="mx-[-1rem] animate-in flex flex-col gap-3 mt-7" />
          </>
        )}
      </div>
    </div>
  )
}

export default Property
