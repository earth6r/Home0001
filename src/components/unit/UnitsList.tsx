import { type FC, HTMLAttributes, useContext } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { KeyedUnit, UnitListProps } from './types'
import UnitSummary from './UnitSummary'

export const UnitsList: FC<UnitListProps> = ({ className }) => {
  const { state } = useContext(HomeContext)
  const units = state.property?.unitsList

  return (
    <ul className={classNames(className)}>
      {units &&
        units.map((unit: KeyedUnit) => {
          return <UnitSummary key={unit._id} unit={unit} />
        })}
    </ul>
  )
}

export default UnitsList
