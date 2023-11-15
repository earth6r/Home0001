import type {
  CitiesBlock as CitiesBlockType,
  City,
  Media,
  Property,
  SanityImageAsset,
  SanityKeyedReference,
  SanityReference,
} from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { KeyedUnitProps } from '@components/unit'
import { SanityLinkType } from '@studio/lib'

export type CityBlockPropertyType = {
  image?:
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
  longTitle?: string
  slug: { _type: 'slug'; current: string }
}

export interface KeyedProperty extends SanityKeyedReference<Property> {
  image?:
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
  longTitle?: string
  slug: { _type: 'slug'; current: string }
}

export interface KeyedProperties extends Array<SanityKeyedReference<Property>> {
  property: KeyedProperty
}

export interface KeyedCity extends SanityKeyedReference<City> {
  _id?: string
  title?: string
  active?: boolean
  propertyLink?: SanityLinkType
}

export type CitiesListProps = {
  citiesList?: KeyedCity[]
}

export interface CitiesBlockProps
  extends Omit<SanityBlockElement, keyof CitiesBlockType>,
    CitiesBlockType {
  citiesList?: KeyedCity[]
}
