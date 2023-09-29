import { KeyedPropertyProps } from '@components/property'
import { KeyedUnit as KeyedUnitProps } from '@components/unit'
import React, { createContext, useReducer } from 'react'

interface PropertyContentProps
  extends Omit<KeyedPropertyProps, '_type' | '_key' | '_ref'> {
  cityId?: string
  unitsList?: KeyedUnitProps[]
}

interface UnitContentProps
  extends Omit<
    KeyedUnitProps,
    '_type' | '_key' | '_ref' | '_createdAt' | '_updatedAt' | '_rev'
  > {}

type homePayloadType = {
  cityId?: string
  property?: KeyedPropertyProps
  propertySlug?: string
  unit?: UnitContentProps
  unitSlug?: string
}

type homeContextType = {
  property?: PropertyContentProps
  propertySlug: string | undefined
  unit?: UnitContentProps
  unitSlug: string | undefined
}

type ProviderProps = {
  children: React.ReactNode
}

enum ActionTypes {
  SET_HOME = 'SET_HOME',
  SET_PROPERTY = 'SET_PROPERTY',
  SET_UNIT = 'SET_UNIT',
}

type SetHomeAction = {
  type: 'SET_HOME'
  payload: homePayloadType
}

type SetPropertyAction = {
  type: 'SET_PROPERTY'
  payload: homePayloadType
}

type SetUnitAction = {
  type: 'SET_UNIT'
  payload: homePayloadType
}

type DispatchActionTypes = SetHomeAction | SetPropertyAction | SetUnitAction

const DEFAULT_PROPERTY = {
  _id: '',
  header: undefined,
}

export const defaultState: homeContextType = {
  property: undefined,
  propertySlug: undefined,
  unit: undefined,
  unitSlug: undefined,
}

export const reducer = (
  state: homeContextType,
  action: DispatchActionTypes
): homeContextType => {
  const { payload } = action
  switch (action.type) {
    case ActionTypes.SET_HOME:
      return {
        ...state,
        property: {
          cityId: payload.cityId,
          ...payload.property,
        },
        propertySlug: payload.propertySlug,
        unit: {
          ...payload.unit,
        },
        unitSlug: payload.unitSlug,
      }
    case ActionTypes.SET_PROPERTY:
      return {
        ...state,
        property: {
          cityId: payload.cityId,
          ...payload.property,
        },
        propertySlug: payload.propertySlug,
      }
    case ActionTypes.SET_UNIT:
      return {
        ...state,
        unit: {
          ...payload.unit,
        },
        unitSlug: payload.unitSlug,
      }

    default:
      return state
  }
}

export const HomeContext = createContext<{
  state: homeContextType
  dispatch: React.Dispatch<DispatchActionTypes>
}>({
  state: defaultState,
  dispatch: () => null,
})

export const HomeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <HomeContext.Provider value={{ state, dispatch }}>
      {children}
    </HomeContext.Provider>
  )
}
