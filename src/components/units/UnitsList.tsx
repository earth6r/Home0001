import { type FC, HTMLAttributes, useContext } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { KeyedUnit } from './types'
import { UnitButton } from './UnitButton'

export const UnitsList: FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  const { state } = useContext(HomeContext)
  const units = state.property.unitsList

  return (
    units && (
      <ul className={classNames(className)}>
        {units.map((unit: KeyedUnit) => {
          return <UnitButton key={unit._id} unit={unit} />
        })}
      </ul>
    )
  )
}

export default UnitsList
