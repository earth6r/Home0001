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
      showPrefs: any
      functionalActive: any
    },
    {
      setHutk: Dispatch<SetStateAction<any>>
      setShowPrefs: Dispatch<SetStateAction<any>>
      setFunctionalActive: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useCookiesContext() {
  return useContext(CookiesContext)
}

export function CookiesProvider({ children }: { children: ReactNode }) {
  const [hutk, setHutk] = useState('')
  const [showPrefs, setShowPrefs] = useState(false)
  const [functionalActive, setFunctionalActive] = useState(true)

  return (
    <CookiesContext.Provider
      value={useMemo(
        () => [
          { hutk, showPrefs, functionalActive },
          { setHutk, setShowPrefs, setFunctionalActive },
        ],
        [hutk, showPrefs, functionalActive]
      )}
    >
      {children}
    </CookiesContext.Provider>
  )
}

export function useLocalCookies() {
  const [{ hutk }, { setHutk }] = useCookiesContext()
  return [hutk, setHutk]
}

export function useCookiesPrefs() {
  const [{ showPrefs }, { setShowPrefs }] = useCookiesContext()
  return [showPrefs, setShowPrefs]
}

export function useFunctionalPref() {
  const [{ functionalActive }, { setFunctionalActive }] = useCookiesContext()
  return [functionalActive, setFunctionalActive]
}
