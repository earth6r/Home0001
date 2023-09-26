import type {
  CitiesBlock as CitiesBlockType,
  City,
  SanityKeyedReference,
} from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'

interface KeyedCity extends SanityKeyedReference<City> {
  _id?: string
  title?: string
  active?: boolean
}

export interface CitiesBlockProps
  extends Omit<SanityBlockElement, keyof CitiesBlockType>,
    CitiesBlockType {
  citiesList?: KeyedCity[]
}
