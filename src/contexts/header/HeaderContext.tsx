import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'

// Yan web3: update header context here

const HeaderContext = createContext<
  [
    {
      headerLinksShown: any
      cryptoMode: any
    },
    {
      setHeaderLinksShown: Dispatch<SetStateAction<any>>
      setCryptoMode: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useHeaderContext() {
  return useContext(HeaderContext)
}

export function HeaderProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const crypto = urlParams.get('crypto')
    if (crypto || window.location.hostname.includes('crypto')) {
      sessionStorage.removeItem('firstTime')
      setCryptoMode(true)
    }
  }, [])
  const [headerLinksShown, setHeaderLinksShown] = useState(false)
  const [cryptoMode, setCryptoMode] = useState(false)

  return (
    <HeaderContext.Provider
      value={useMemo(
        () => [
          { headerLinksShown, cryptoMode },
          { setHeaderLinksShown, setCryptoMode },
        ],
        [headerLinksShown, cryptoMode]
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

export function useCryptoMode() {
  const [{ cryptoMode }, { setCryptoMode }] = useHeaderContext()
  return [cryptoMode, setCryptoMode]
}
