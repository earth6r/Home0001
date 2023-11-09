import { type FC, memo, useContext } from 'react'
import classNames from 'classnames'
import { RichText, SanityMedia } from '@components/sanity'
import MapDialog from '@components/map/MapDialog'
import { UnitsList } from '@components/unit'
import { PropertyElProps } from './types'
import { Accordion } from '@components/accordion'
import { Btn } from '@components/btns'
import { useWaitlisModal } from '@contexts/modals'
import { HomeContext } from '@contexts/home'
export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  className,
}) => {
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
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
                // lqip: property?.image?.image?.asset.metadata.lqip,
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
        {property?.waitlistLinkText && (
          <button
            aria-label={property.waitlistLinkText}
            onClick={() => {
              setWaitlistOpen(true)
            }}
            className="hover:font-bold border-bottom mb-8"
          >
            {property.waitlistLinkText}
          </button>
        )}
        {property?.propertyDetails &&
          property.propertyDetails.length > 0 &&
          property.propertyDetails.map(({ _key, header, text, cta }) => (
            <Accordion
              key={_key}
              header={header}
              text={text}
              cta={cta}
              className="mt-2 border-x-0 border-t-0"
              location={{ property: property?.slug?.current || '', unit: '' }}
            />
          ))}

        {property?.unitsList && (
          <>
            {property?.availableText && (
              <div className="mt-9 uppercase">{property?.availableText}</div>
            )}
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
