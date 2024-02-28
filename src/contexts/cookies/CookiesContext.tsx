import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

const CookiesContext = createContext<
  [
    {
      hutk: any
    },
    {
      setHutk: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useCookiesContext() {
  return useContext(CookiesContext)
}

export function CookiesProvider({ children }: { children: ReactNode }) {
  const [hutk, setHutk] = useState('')

  return (
    <CookiesContext.Provider
      value={useMemo(() => [{ hutk }, { setHutk }], [hutk])}
    >
      {children}
    </CookiesContext.Provider>
  )
}

export function useLocalCookies() {
  const [{ hutk }, { setHutk }] = useCookiesContext()
  return [hutk, setHutk]
}
