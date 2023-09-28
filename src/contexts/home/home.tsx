import { UnitProps } from '@components/unit'
import { Property, Unit } from '@studio/gen/sanity-schema'
import React, { createContext, useReducer } from 'react'

interface PropertyProps
  extends Omit<
    Property,
    '_type' | '_createdAt' | '_rev' | '_updatedAt' | '_id'
  > {
  _id?: string
  cityId?: string
}

type homeContextType = {
  property: PropertyProps
  propertySlug: string | undefined
  unit: UnitProps
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
  payload: {
    cityId: string | undefined
    property: PropertyProps
    propertySlug: string | undefined
    unit: UnitProps
    unitSlug: string | undefined
  }
}

type SetPropertyAction = {
  type: 'SET_PROPERTY'
  payload: {
    cityId: string | undefined
    property: PropertyProps
    propertySlug: string | undefined
    unit?: UnitProps
    unitSlug?: string
  }
}

type SetUnitAction = {
  type: 'SET_UNIT'
  payload: {
    cityId?: string
    property?: PropertyProps
    propertySlug?: string
    unit: UnitProps
    unitSlug: string | undefined
  }
}

type DispatchActionTypes = SetHomeAction | SetPropertyAction | SetUnitAction

const DEFAULT_PROPERTY = {
  _id: '',
  header: undefined,
}

export const defaultState: homeContextType = {
  property: {
    ...DEFAULT_PROPERTY,
    cityId: undefined,
  },
  propertySlug: undefined,
  unit: {
    _id: '',
  },
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
