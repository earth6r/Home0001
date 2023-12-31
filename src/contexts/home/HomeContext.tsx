import { KeyedPropertyProps, PropertyContentProps } from '@components/property'
import { UnitContentProps } from '@components/unit'
import React, { createContext, useReducer } from 'react'

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
  RESET_HOME = 'RESET_HOME',
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

type ResetHomeAction = {
  type: 'RESET_HOME'
  payload: homePayloadType
}

type DispatchActionTypes =
  | SetHomeAction
  | SetPropertyAction
  | SetUnitAction
  | ResetHomeAction

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
    case ActionTypes.RESET_HOME:
      return {
        ...state,
        property: {
          cityId: undefined,
        },
        propertySlug: undefined,
        unit: undefined,
        unitSlug: undefined,
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
