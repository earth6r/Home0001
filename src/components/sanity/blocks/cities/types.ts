import type {
  CitiesBlock as CitiesBlockType,
  City,
  Property,
  SanityKeyedReference,
} from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'

export interface KeyedProperty extends SanityKeyedReference<Property> {
  _id?: string
}

export interface KeyedCity extends SanityKeyedReference<City> {
  _id?: string
  title?: string
  active?: boolean
  properties?: KeyedProperty[]
}

export interface CitiesBlockProps
  extends Omit<SanityBlockElement, keyof CitiesBlockType>,
    CitiesBlockType {
  citiesList?: KeyedCity[]
}
