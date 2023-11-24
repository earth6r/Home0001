import { type FC, HTMLAttributes, useContext } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { KeyedUnitProps, UnitListProps } from './types'
import UnitSummary from './UnitSummary'

export const UnitsList: FC<UnitListProps> = ({ unitList, className }) => {
  return (
    <ul className={classNames(className)}>
      {unitList &&
        unitList.map((unit: KeyedUnitProps, index: number) => {
          return (
            <UnitSummary
              key={unit._id}
              unit={unit}
              border={index !== 0}
              className={classNames(index !== 0 ? 'mt-ylg' : '')}
            />
          )
        })}
    </ul>
  )
}

export default UnitsList
