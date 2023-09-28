import { type FC, HTMLAttributes, useContext, useState, useEffect } from 'react'
import { HomeContext } from '@contexts/home'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import UnitFactSheet from './UnitFactSheet'

export const Unit: FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  const { state } = useContext(HomeContext)
  const unit = state.unit

  return (
    unit && (
      <div className={className}>
        <div className="flex flex-col relative mt-10">
          {unit.photographs && unit.photographs.length > 0 && (
            <ImageCarousel slides={unit.photographs} className="w-full" />
          )}
          <div className="mt-10">
            {unit.propertyType && (
              <p className="m-0 uppercase tracking-caps">
                <span>{unit.propertyType.typeTitle}</span>
                <span>&nbsp;—&nbsp;</span>
                <span>{unit.title}</span>
              </p>
            )}
          </div>
          <div className="pr-mobile-menu md:pr-0">
            <p className="m-0">
              {unit.price == 'Inquire' ? 'Price upon request' : unit.price}
            </p>
            {unit.area && <p className="mb-4">{unit.area}</p>}
            {unit.details && <RichText blocks={unit.details} />}
          </div>
        </div>

        <UnitFactSheet unit={unit} />

        {/* {selectedPropertyType.moreImages?.length ? (
          <div className="w-full mt-10">
            {selectedPropertyType.propertyType === 'two-bedrooms' ||
            selectedPropertyType.propertyType === 'penthouse' ? (
              <div className="w-full relative">
                {selectedPropertyType?.images &&
                  selectedPropertyType.images.length !== 0 && (
                    <ImageSlider images={selectedPropertyType.moreImages} />
                  )}
              </div>
            ) : (
              selectedPropertyType?.images &&
              selectedPropertyType.images.length !== 0 && (
                <ImageSlider images={selectedPropertyType.moreImages} />
              )
            )}
          </div>
        ) : null}
        {selectedPropertyType?._rawDescriptionTwo?.text && (
          <div className="mt-10 pr-mobile-menu md:pr-0 text-mobile-body md:text-desktop-body property-type-description">
            <StandardText data={selectedPropertyType?._rawDescriptionTwo} />
          </div>
        )}

        <HowItWorksModal data={howItWorks} /> */}
      </div>
    )
  )
}

export default Unit
