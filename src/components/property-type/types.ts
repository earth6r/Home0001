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

export interface PropertyTypeContentProps
  extends Omit<KeyedPropertyTypeProps, '_type' | '_key' | '_ref'> {}

export interface KeyedPropertyTypeProps
  extends SanityKeyedReference<UnitProps>,
    Omit<HTMLAttributes<HTMLElement>, 'property'> {
  _id?: string
  typeTitle?: string
  slug?: { _type: 'slug'; current: string }
  available?: boolean
  property?: SanityReference<Property>
  price?: string
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
  photographs?: SanityKeyed<Media>[] | Media
  summary?: RichText
  inventory?: RichText
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

export interface PropertyTypeElProps
  extends Omit<KeyedPropertyTypeProps, '_type' | '_key' | '_ref' | 'property'>,
    HTMLAttributes<HTMLElement> {
  propertyType?: PropertyTypeContentProps
}

export interface PropertyTypeListProps extends HTMLAttributes<HTMLElement> {
  propertyTypeList?: KeyedPropertyTypeProps[]
  propertyType?: KeyedPropertyTypeProps
}
