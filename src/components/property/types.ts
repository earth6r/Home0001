import { type HTMLAttributes } from 'react'
import { KeyedUnit } from '@components/unit'
import type {
  Property as PropertyProps,
  RichText as RichTextProps,
  SanityImageAsset,
  SanityKeyedReference,
  SanityReference,
} from '@studio/gen/sanity-schema'
import { City } from 'schema-dts'

export interface KeyedLocationProps extends SanityReference<City> {
  title?: string
}

export interface KeyedPropertyProps
  extends SanityKeyedReference<PropertyProps>,
    HTMLAttributes<HTMLElement> {
  _id?: string
  cityId?: string
  header?: RichTextProps
  image?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    alt: string
  }
  coordinates?: { lat: string; long: string }
  description?: RichTextProps
  unitsList?: KeyedUnit[]
  location?: KeyedLocationProps
}
export interface PropertyElProps
  extends Omit<KeyedPropertyProps, '_type' | '_key' | '_ref'>,
    HTMLAttributes<HTMLElement> {}
