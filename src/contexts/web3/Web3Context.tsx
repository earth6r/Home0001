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
  step?:
    | 'prompt'
    | 'info'
    | 'paymentOption'
    | 'payment'
    | 'location'
    | 'priceRange'
    | 'whenToBuy'
    | 'bedrooms'
    | 'essentials'
    | 'token'

  // user profile fields from /api/users/get-user?walletAddress=walletAddress
  id?: string
  email?: string
  first_name?: string
  last_name?: string
  phone_number?: string
  address?: string
  comms?: 'WhatsApp' | 'Telegram'

  // steps from /api/users/get-current-step?email=test@test.org
  hasMadePayment?: boolean
  hasFinishedProfile?: boolean
  userSentMessage?: boolean

  // questionnaire fields
  interested_cities?: string[] | null
  city_general?: string | null
  price_range?: string | null
  when_to_buy?: string | null
  bedrooms?: string | null

  // other fields mananged on frontend
  tokenIds?: string[]
  paymentType?: string
  signup_source?: 'purchased' | 'referred'
  referred_token?: string
  unit?: string | null
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
