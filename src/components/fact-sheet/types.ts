import { HTMLAttributes } from 'react'
import { KeyedUnit } from '@components/unit'
import { KeyedPropertyProps } from '@components/property'

export interface LocationPropertyProps
  extends Omit<KeyedPropertyProps, '_key'> {}

export interface UnitLocationProps
  extends Omit<
    KeyedUnit,
    | '_type'
    | '_key'
    | '_ref'
    | '_createdAt'
    | '_updatedAt'
    | '_rev'
    | 'propertyType'
  > {
  property?: LocationPropertyProps
  propertyType?: {
    typeTitle?: string
    value?: string
  }
}

export interface FactSheetProps
  extends Omit<HTMLAttributes<HTMLElement>, 'property'> {
  unit?: UnitLocationProps
}
