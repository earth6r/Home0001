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
import { SanityImageAsset } from 'sanity-codegen'
import { Media } from '@studio/gen/sanity-schema'
export const PropertyComponent: FC<PropertyElProps> = ({
  property,
  className,
}) => {
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  console.log('property', property)
  return (
    <div className={classNames(className)}>
      <h2 className="text-2xl">
        HOME0001
        <br />
        {property?.navigationSlug}
      </h2>
      <div className="block relative mt-10 md:mt-20">
        {property?.image && (
          <div className="block relative w-full h-full mb-10 z-base">
            <SanityMedia
              imageProps={{
                alt: property?.image.alt || 'Building image',
                layout: 'responsive',
                quality: 8,
                priority: true,
                lqip: property?.image?.image?.asset?.metadata?.lqip,
              }}
              {...(property?.image as any)}
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

        <h2 className="text-2xl mt-12 uppercase">Available Homes:</h2>
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
        {property?.waitlistLinkText && (
          <button
            aria-label={property.waitlistLinkText}
            onClick={() => {
              setWaitlistOpen(true)
            }}
            className={classNames(
              `w-full mt-12 relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white z-above`
            )}
          >
            <span className="mb-0 py-2 text-left pl-4 uppercase">
              {property.waitlistLinkText}
            </span>
            <p className=" py-2 pb-[0.55rem] text-[16px] text-right pr-4">→</p>
          </button>
        )}
      </div>
    </div>
  )
}

export const Property = memo(PropertyComponent)

export default Property
