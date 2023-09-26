import React, { createContext, useReducer, useState } from 'react'

type homeContextType = {
  city: string
}

type ProviderProps = {
  children: React.ReactNode
}

enum ActionTypes {
  SET_CITY = 'SET_CITY',
}

type SetCityAction = {
  type: 'SET_CITY'
  city: string
}

type DispatchActionTypes = SetCityAction

export const defaultState: homeContextType = {
  city: '',
}

export const reducer = (
  state: homeContextType,
  action: DispatchActionTypes
): homeContextType => {
  switch (action.type) {
    case ActionTypes.SET_CITY:
      const { city } = action
      return { ...state, city }

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
