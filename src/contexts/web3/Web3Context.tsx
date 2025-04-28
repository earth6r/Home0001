import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

const Web3Context = createContext<
  [
    {
      address: string | null
      client: any
      imageUrl: string | null
      isWeb3Connected: boolean
      web3TokenIds: string[] | null
    },
    {
      setAddress: Dispatch<SetStateAction<any>>
      setClient: Dispatch<SetStateAction<any>>
      setImageUrl: Dispatch<SetStateAction<any>>
      setIsWeb3Connected: Dispatch<SetStateAction<any>>
      setWeb3TokenIds: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useWeb3Context() {
  return useContext(Web3Context)
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [client, setClient] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isWeb3Connected, setIsWeb3Connected] = useState(false)
  const [web3TokenIds, setWeb3TokenIds] = useState(null)

  return (
    <Web3Context.Provider
      value={useMemo(
        () => [
          { address, client, imageUrl, isWeb3Connected, web3TokenIds },
          {
            setAddress,
            setClient,
            setImageUrl,
            setIsWeb3Connected,
            setWeb3TokenIds,
          },
        ],
        [address, client, imageUrl, isWeb3Connected, web3TokenIds]
      )}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWalletAddress() {
  const [{ address }, { setAddress }] = useWeb3Context()
  return [address, setAddress]
}

export function useWeb3Client() {
  const [{ client }, { setClient }] = useWeb3Context()
  return [client, setClient]
}

export function useWeb3ImageUrl() {
  const [{ imageUrl }, { setImageUrl }] = useWeb3Context()
  return [imageUrl, setImageUrl]
}

export function useWeb3IsConnected() {
  const [{ isWeb3Connected }, { setIsWeb3Connected }] = useWeb3Context()
  return [isWeb3Connected, setIsWeb3Connected]
}

export function useWeb3TokenIds() {
  const [{ web3TokenIds }, { setWeb3TokenIds }] = useWeb3Context()
  return [web3TokenIds, setWeb3TokenIds]
}
