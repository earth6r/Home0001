import { type FC, HTMLAttributes, useContext } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { KeyedUnit, UnitListProps } from './types'
import UnitSummary from './UnitSummary'

export const UnitsList: FC<UnitListProps> = ({ unitList, className }) => {
  return (
    <ul className={classNames(className)}>
      {unitList &&
        unitList.map((unit: KeyedUnit) => {
          return <UnitSummary key={unit._id} unit={unit} />
        })}
    </ul>
  )
}

export default UnitsList
