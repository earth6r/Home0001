import { HTMLAttributes } from 'react'
import type {
  Accordion,
  PropertyType,
  RichText,
  SanityImageAsset,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
  Unit,
  Unit as UnitProps,
} from '@studio/gen/sanity-schema'
import { Property } from 'schema-dts'

export interface UnitAssetProps {
  _type?: 'image'
  asset?: SanityReference<SanityImageAsset>
  alt: string
  image?: {
    _type: 'image'
    asset: SanityImageAsset
  }
}

export interface KeyedPropertyType extends SanityKeyedReference<PropertyType> {
  typeTitle?: string
  typeValue?: string
}

export interface UnitContentProps
  extends Omit<KeyedUnitProps, '_type' | '_key' | '_ref'> {}

export interface KeyedUnitProps
  extends SanityKeyedReference<UnitProps>,
    Omit<HTMLAttributes<HTMLElement>, 'property'> {
  _id?: string
  title?: string
  slug?: { _type: 'slug'; current: string }
  available?: boolean
  property?: SanityReference<Property>
  propertyType?: KeyedPropertyType
  price?: string
  area?: string
  amenities?: RichText
  headlineImage?: UnitAssetProps
  photographs?: Array<SanityKeyed<UnitAssetProps>>
  reserveFormCopy?: RichText
  confirmationCopy?: RichText
  summary?: RichText
  factSheet?: any
  unitDetails?: SanityKeyed<Accordion>[]
  secondUnitDetails?: SanityKeyed<Accordion>[]
  layoutImages?: Array<SanityKeyed<UnitAssetProps>>
  moreInfo?: RichText
}

export interface UnitElProps
  extends Omit<KeyedUnitProps, '_type' | '_key' | '_ref' | 'property'>,
    HTMLAttributes<HTMLElement> {
  // unit?: UnitContentProps
  unit?: Unit
  accordions?: SanityKeyed<Accordion>[]
  propertyType?: KeyedPropertyType
}

export interface UnitListProps extends HTMLAttributes<HTMLElement> {
  unitList?: KeyedUnitProps[]
  unit?: KeyedUnitProps
}
