import { type FC, HTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import { HomeContext } from '@contexts/home'

export interface CityProps extends HTMLAttributes<HTMLDivElement> {}

export const City: FC<CityProps> = ({ className }) => {
  const { dispatch, state } = useContext(HomeContext)
  return <div className={classNames(className)}>{state.city}</div>
}

export default City
