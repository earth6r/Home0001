import { HTMLAttributes } from 'react'
import type {
  BlockContent,
  Media,
  Property,
  RichText,
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
  photographs?: SanityKeyed<Media>[]
  summary?: RichText
  inventory?: any
  unitDetails?: RichText
  body?: BlockContent
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
  propertyTypesList?: KeyedPropertyTypeProps[]
  propertyType?: KeyedPropertyTypeProps
  showCity?: boolean
}
