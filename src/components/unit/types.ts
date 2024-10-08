import { HTMLAttributes } from 'react'
import type {
  Accordion,
  Cta,
  Media,
  Property,
  PropertyType,
  RichText,
  SanityImageAsset,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
  Unit as UnitProps,
} from '@studio/gen/sanity-schema'

export interface KeyedPropertyType extends SanityReference<PropertyType> {
  typeTitle?: string
  slug?: string
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
  bedrooms?: number
  bathrooms?: number
  coordinates?: { lat?: string; long?: string }
  address?: RichText
  property?: SanityReference<Property>
  propertyType?: KeyedPropertyType
  price?: string
  hidePrice?: boolean
  cryptoPrice?: string
  area?: string
  ctas?: Cta[]
  photographs?: SanityKeyed<Media>[] | Media
  photoLimit?: number
  summary?: RichText
  factSheet?: any
  inventory?: any
  unitDetails?: RichText
  layoutImages?: SanityKeyed<Media>[]
  layoutImagesOptions?: {
    carousel?: boolean
    zoomWidth?: number
    zoomHeight?: number
  }
}

export interface UnitElProps
  extends Omit<KeyedUnitProps, '_type' | '_key' | '_ref' | 'property'>,
    HTMLAttributes<HTMLElement> {
  unit?: UnitContentProps
  accordions?: SanityKeyed<Accordion>[]
  propertyType?: KeyedPropertyType
}

export interface UnitListProps extends HTMLAttributes<HTMLElement> {
  unitList?: KeyedUnitProps[]
  unit?: KeyedUnitProps
  border?: boolean
}
