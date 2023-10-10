import { HTMLAttributes } from 'react'
import type {
  Accordion,
  Media,
  PropertyType,
  RichText,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
  Unit as UnitProps,
} from '@studio/gen/sanity-schema'
import { Property, Table } from 'schema-dts'

export interface KeyedPropertyType extends SanityKeyedReference<PropertyType> {
  typeTitle?: string
  typeValue?: string
}

export interface UnitContentProps
  extends Omit<KeyedUnitProps, '_type' | '_key' | '_ref'> {}

export interface KeyedUnitProps
  extends SanityKeyedReference<UnitProps>,
    Omit<HTMLAttributes<HTMLElement>, 'property'> {
  _id?: string
  title?: string
  available?: boolean
  property?: SanityReference<Property>
  propertyType?: KeyedPropertyType
  price?: string
  area?: string
  amenities?: RichText
  headlineImage?: Media
  photographs?: Array<SanityKeyed<Media>>
  reserveFormCopy?: RichText
  details?: RichText
  factSheet?: any
  layoutImages?: Array<SanityKeyed<Media>>
  moreInfo?: RichText
}

export interface UnitElProps
  extends Omit<KeyedUnitProps, '_type' | '_key' | '_ref' | 'property'>,
    HTMLAttributes<HTMLElement> {
  unit?: UnitContentProps
  accordions?: SanityKeyed<Accordion>[]
  propertyType?: KeyedPropertyType
}

export interface UnitListProps extends HTMLAttributes<HTMLElement> {
  unitList?: KeyedUnitProps[]
  unit?: KeyedUnitProps
}
