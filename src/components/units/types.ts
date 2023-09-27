import { HTMLAttributes } from 'react'
import type { SanityKeyedReference, Unit } from '@studio/gen/sanity-schema'

export interface UnitProps
  extends Omit<
    Unit,
    '_type' | '_createdAt' | '_rev' | '_updatedAt' | '_id' | 'propertyType'
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
