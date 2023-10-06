import { HTMLAttributes } from 'react'
import type {
  Accordion,
  PropertyType,
  SanityKeyed,
  SanityKeyedReference,
  Unit,
} from '@studio/gen/sanity-schema'

export interface KeyedPropertyType extends SanityKeyedReference<PropertyType> {
  typeTitle?: string
  typeValue?: string
}

export interface UnitProps
  extends Omit<HTMLAttributes<HTMLElement>, 'property'>,
    Unit {
  accordions?: SanityKeyed<Accordion>[]
  propertyType?: KeyedPropertyType
}

export interface UnitElProps
  extends Omit<
    KeyedUnit,
    | '_type'
    | '_key'
    | '_ref'
    | '_createdAt'
    | '_rev'
    | '_updatedAtts'
    | '_updatedAt'
  > {}

export interface KeyedUnit
  extends SanityKeyedReference<UnitProps>,
    Omit<UnitProps, '_type' | '_id'> {
  _id?: string
  title?: string
  available?: boolean
  price?: string
  area?: string
}

export interface UnitListProps extends HTMLAttributes<HTMLElement> {
  unitList?: KeyedUnit[]
  unit?: KeyedUnit
}
