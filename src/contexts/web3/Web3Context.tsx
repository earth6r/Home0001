import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

export type Web3UserProps = {
  address?: string
  hasProfile?: boolean
  tokenIds?: string[]
  paymentType?: string
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  comms?: 'WhatsApp' | 'Telegram'
  signup_source?: 'purchased' | 'referred'
  referred_token?: string
} | null

const Web3Context = createContext<
  [
    {
      user: Web3UserProps
      client: any
      imageUrl: string | null
      isWeb3Connected: boolean
    },
    {
      updateUser: Dispatch<SetStateAction<any>>
      setClient: Dispatch<SetStateAction<any>>
      setImageUrl: Dispatch<SetStateAction<any>>
      setIsWeb3Connected: Dispatch<SetStateAction<any>>
    }
  ]
>([{}, {}] as any)

function useWeb3Context() {
  return useContext(Web3Context)
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [user, updateUser] = useState<Web3UserProps>(null)
  const [isWeb3Connected, setIsWeb3Connected] = useState(false)

  const [client, setClient] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  return (
    <Web3Context.Provider
      value={useMemo(
        () => [
          { user, client, imageUrl, isWeb3Connected },
          {
            updateUser,
            setClient,
            setImageUrl,
            setIsWeb3Connected,
          },
        ],
        [user, client, imageUrl, isWeb3Connected]
      )}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWalletUser() {
  const [{ user }, { updateUser }] = useWeb3Context()
  return [user, updateUser]
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
