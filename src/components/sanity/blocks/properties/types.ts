import type {
  PropertiesBlock as PropertiesBlockType,
  Media,
  Property,
  RichText,
  SanityImageAsset,
  SanityKeyedReference,
  SanityReference,
  City,
} from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'

export type CityBlockPropertyType = {
  index: number
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
  longTitle?: RichText
  slug: { _type: 'slug'; current: string }
}

export interface KeyedProperty extends SanityKeyedReference<Property> {
  longTitle?: RichText
  slug: { _type: 'slug'; current: string }
  available?: boolean
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

export interface PropertiesBlockProps
  extends Omit<SanityBlockElement, keyof PropertiesBlockType>,
    PropertiesBlockType {
  properties?: KeyedProperty[]
}
