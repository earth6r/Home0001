import { type HTMLAttributes } from 'react'
import { KeyedUnitProps } from '@components/unit'
import type {
  Property as PropertyProps,
  RichText as RichTextProps,
  SanityImageAsset,
  SanityKeyedReference,
  SanityReference,
  Accordion,
  SanityKeyed,
  Media,
  BlockContent,
  Property,
} from '@studio/gen/sanity-schema'
import { City } from 'schema-dts'
import { KeyedPropertyTypeProps } from '@components/property-type'

export interface KeyedLocationProps extends SanityReference<City> {
  title?: string
}

export interface PropertyContentProps
  extends Omit<KeyedPropertyProps, '_type' | '_key' | '_ref'> {
  cityId?: string
  propertyTypesList?: KeyedPropertyTypeProps[]
  propertyDetails?: SanityKeyed<Accordion>[]
  waitlistLinkText?: string
  availableText?: string
  headerText?: string
  slug?: { _type: 'slug'; current: string }
  propertyImages?: (Media & { _key: string })[]
  body?: BlockContent
}

export interface KeyedPropertyProps
  extends SanityKeyedReference<PropertyProps>,
    HTMLAttributes<HTMLElement> {
  _id?: string
  cityId?: string
  description?: RichTextProps
  unitsList?: KeyedUnitProps[]
  location?: KeyedLocationProps
}

export interface PropertyElProps
  extends Omit<KeyedPropertyProps, '_type' | '_key' | '_ref' | 'property'>,
    Omit<HTMLAttributes<HTMLElement>, 'property'> {
  property?: PropertyContentProps
  allProperties?: Property[]
  block?: boolean
  footerCopy?: string
}
