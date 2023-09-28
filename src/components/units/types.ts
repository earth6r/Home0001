import { HTMLAttributes } from 'react'
import type {
  Property,
  SanityKeyedReference,
  Unit,
} from '@studio/gen/sanity-schema'

export interface UnitFactSheetProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'property'> {
  unit?: UnitLocationProps
}

export interface PropertyProps extends Omit<Property, 'location'> {
  location?: {
    title?: string
  }
}

export interface UnitLocationProps
  extends Omit<
    Unit,
    | '_type'
    | '_createdAt'
    | '_rev'
    | '_updatedAt'
    | '_id'
    | 'propertyType'
    | 'property'
  > {
  _id?: string
  propertyType?: {
    typeTitle?: string
    value?: string
  }
  property?: PropertyProps
}

export interface UnitProps
  extends Omit<
    Unit,
    | '_type'
    | '_createdAt'
    | '_rev'
    | '_updatedAt'
    | '_id'
    | 'propertyType'
    | 'property'
  > {
  _id?: string
  propertyType?: {
    typeTitle?: string
    value?: string
  }
}

export interface KeyedUnit
  extends SanityKeyedReference<Unit>,
    Omit<
      Unit,
      '_type' | '_createdAt' | '_rev' | '_updatedAt' | '_id' | 'propertyType'
    > {
  _id?: string
  propertyType?: {
    typeTitle?: string
    value?: string
  }
}

export interface UnitButtonProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'property'> {
  unit?: KeyedUnit
}
