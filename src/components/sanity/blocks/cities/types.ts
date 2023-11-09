import type {
  CitiesBlock as CitiesBlockType,
  City,
  Property,
  SanityKeyedReference,
} from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { KeyedUnitProps } from '@components/unit'
import { SanityLinkType } from '@studio/lib'

export interface KeyedProperty extends SanityKeyedReference<Property> {
  _id?: string
  unitsList?: KeyedUnitProps[]
}

export interface KeyedCity extends SanityKeyedReference<City> {
  _id?: string
  title?: string
  active?: boolean
  // properties?: KeyedProperty[]
  // property?: KeyedProperty
  propertyLink?: SanityLinkType
}

export interface CitiesBlockProps
  extends Omit<SanityBlockElement, keyof CitiesBlockType>,
    CitiesBlockType {
  citiesList?: KeyedCity[]
}
