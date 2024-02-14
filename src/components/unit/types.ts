import { HTMLAttributes } from 'react'
import type {
  Accordion,
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
  calendarLink?: string
  propertyType?: KeyedPropertyType
  price?: string
  hidePrice?: boolean
  cryptoPrice?: string
  area?: string
  amenities?: RichText
  headlineImage?:
    | {
        _type: 'image'
        asset: SanityReference<SanityImageAsset>
        alt: string
        image?: {
          _type: 'image'
          asset: SanityImageAsset
        }
      }
    | Media
  photographs?: SanityKeyed<Media>[]
  reserveFormCopy?: RichText
  confirmationCopy?: RichText
  summary?: RichText
  factSheet?: any
  inventory?: RichText
  dossierInventory?: RichText
  unitDetails?: RichText
  secondUnitDetails?: SanityKeyed<Accordion>[]
  layoutImages?: SanityKeyed<Media>[]
  layoutImagesOptions?: {
    carousel?: boolean
    zoomWidth?: number
    zoomHeight?: number
  }
  moreInfo?: RichText
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
