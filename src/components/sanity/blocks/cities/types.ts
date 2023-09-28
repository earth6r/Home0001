import type {
  CitiesBlock as CitiesBlockType,
  City,
  Property,
  SanityKeyedReference,
} from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { KeyedUnit } from '@components/unit'

export interface KeyedProperty extends SanityKeyedReference<Property> {
  _id?: string
  unitsList?: KeyedUnit[]
}

export interface KeyedCity extends SanityKeyedReference<City> {
  _id?: string
  title?: string
  active?: boolean
  properties?: KeyedProperty[]
  property?: KeyedProperty
}

export interface CitiesBlockProps
  extends Omit<SanityBlockElement, keyof CitiesBlockType>,
    CitiesBlockType {
  citiesList?: KeyedCity[]
}
