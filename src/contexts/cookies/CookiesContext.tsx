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
    },
    {
      setHutk: Dispatch<SetStateAction<any>>
      setShowPrefs: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useCookiesContext() {
  return useContext(CookiesContext)
}

export function CookiesProvider({ children }: { children: ReactNode }) {
  const [hutk, setHutk] = useState('')
  const [showPrefs, setShowPrefs] = useState(false)

  return (
    <CookiesContext.Provider
      value={useMemo(
        () => [
          { hutk, showPrefs },
          { setHutk, setShowPrefs },
        ],
        [hutk, showPrefs]
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
