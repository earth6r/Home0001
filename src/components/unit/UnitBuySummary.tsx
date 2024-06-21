import { HTMLAttributes, type FC } from 'react'
import { RichText, SanityMedia, SanityMediaProps } from '@components/sanity'
import {
  SanityInventoryModal,
  SanityTableModal,
} from '@components/sanity/table-modal'
import { RichText as RichTextType } from '@studio/gen/sanity-schema'
import { MapDialog } from '@components/map'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import Link from 'next/link'

export type BuyUnitProps = {
  title: string
  slug: string
  price: string
  area: string
  property: {
    header: RichTextType
  }
  factSheet?: any
  dossierInventory?: any
  dossierRef?: { slug?: { current: string } }
  photographs: SanityMediaProps
  file?: any
}

export interface BuySummaryProps extends HTMLAttributes<HTMLDivElement> {
  unit: BuyUnitProps
}

export const UnitBuySummary: FC<BuySummaryProps> = ({ unit, className }) => {
  return (
    <div className={className}>
      <div className="max-w-[500px]">
        {unit.photographs && (
          <SanityMedia
            {...(unit.photographs as SanityMediaProps)}
            imageProps={{
              alt: 'Unit image',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 1000px',
              lqip: (unit.photographs.image as any)?.asset?.metadata?.lqip,
            }}
            className="w-full h-auto object-contain"
          />
        )}
      </div>
      <div className="flex justify-between w-full mt-y">
        <p className="text-button font-sansText">{unit.title}</p>
        <p className="text-button font-sansText">{unit.price}</p>
      </div>
      {unit.property.header && (
        <RichText blocks={unit.property.header} className="mt-y" />
      )}

      {unit?.dossierRef?.slug && (
        <a
          href={`/${unit.dossierRef.slug.current}`}
          className="flex items-center gap-[3px] hover:gap-[6px] h-[1em] mt-y transition-all duration-300"
          target="_blank"
        >
          <span className="font-sansText uppercase underline decoration-[2px] underline-offset-2">{`View Dossier`}</span>
          <IconSmallArrow
            width="16"
            height="12"
            fill="black"
            className="mt-[1px] transform -rotate-45"
          />
        </a>
      )}

      {unit.factSheet?.rows && (
        <SanityTableModal
          title="Fact Sheet"
          table={unit.factSheet}
          modalType="fact sheet"
          buttonLabel="View Fact Sheet"
          className="inline-block mt-y"
          unit={unit.title}
        />
      )}

      {unit?.dossierInventory && (
        <SanityInventoryModal
          title="Inventory"
          inventory={unit.dossierInventory}
          buttonLabel="View Inventory"
          className="flex mt-y"
          unit={unit.title}
        />
      )}
    </div>
  )
}

export default UnitBuySummary
