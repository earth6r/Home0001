import { type FC, HTMLAttributes, useContext, useState, useEffect } from 'react'
import { HomeContext } from '@contexts/home'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import UnitFactSheet from './UnitFactSheet'
import UnitFaq from './UnitFaq'
import { UnitContentProps } from './types'

export const Unit: FC<UnitContentProps> = ({ accordions, className }) => {
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

        {unit.layoutImages && unit.layoutImages.length > 0 && (
          <ImageCarousel slides={unit.layoutImages} className="w-full" />
        )}

        {unit.moreInfo && (
          <div className="mt-10 pr-mobile-menu md:pr-0">
            <RichText blocks={unit.moreInfo} />
          </div>
        )}

        {accordions && <UnitFaq accordions={accordions} />}
      </div>
    )
  )
}

export default Unit
