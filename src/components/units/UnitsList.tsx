import { type FC, HTMLAttributes, useContext } from 'react'
import { HomeContext } from '@contexts/home'

export const UnitsList: FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  const { dispatch, state } = useContext(HomeContext)
  const property = state.property
  console.log('---- property: ', property)

  return (
    property.unitsList && (
      <ul className={className}>
        {property.unitsList.map(unit => {
          return <li key={unit._key}>Unit</li>
        })}
      </ul>
    )
  )
}

export default UnitsList
