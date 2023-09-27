import { Property } from '@studio/gen/sanity-schema'
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
  unit: string | undefined
  unitSlug: string | undefined
}

type ProviderProps = {
  children: React.ReactNode
}

enum ActionTypes {
  SET_PROPERTY = 'SET_PROPERTY',
  SET_UNIT = 'SET_UNIT',
}

type SetPropertyAction = {
  type: 'SET_PROPERTY'
  payload: {
    cityId: string | undefined
    property: PropertyProps
    slug: string | undefined
  }
}

type SetUnitAction = {
  type: 'SET_UNIT'
  unit: string | undefined
}

type DispatchActionTypes = SetPropertyAction | SetUnitAction

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
  unit: undefined,
  unitSlug: undefined,
}

export const reducer = (
  state: homeContextType,
  action: DispatchActionTypes
): homeContextType => {
  switch (action.type) {
    case ActionTypes.SET_PROPERTY:
      const { payload } = action
      return {
        ...state,
        property: {
          cityId: payload.cityId,
          ...payload.property,
        },
        propertySlug: payload.slug,
        unit: undefined,
      }
    case ActionTypes.SET_UNIT:
      const { unit } = action
      return { ...state, unit }

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
