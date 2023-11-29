import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

const HeaderContext = createContext<
  [
    {
      headerLinksShown: any
    },
    {
      setHeaderLinksShown: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useHeaderContext() {
  return useContext(HeaderContext)
}

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [headerLinksShown, setHeaderLinksShown] = useState(true)

  return (
    <HeaderContext.Provider
      value={useMemo(
        () => [{ headerLinksShown }, { setHeaderLinksShown }],
        [headerLinksShown]
      )}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeaderLinks() {
  const [{ headerLinksShown }, { setHeaderLinksShown }] = useHeaderContext()
  return [headerLinksShown, setHeaderLinksShown]
}
