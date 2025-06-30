/* eslint-disable no-console */
import { Dispatch, SetStateAction, type FC } from 'react'
import {
  fetchImageUrl,
  fetchTokenURI,
  getTokensOwnedByAddress,
  connectWallet,
} from '@lib/util/web3'
import {
  useWalletUser,
  useWeb3Client,
  useWeb3ImageUrl,
  useWeb3IsConnected,
  Web3UserProps,
} from '@contexts/web3'
import { saveError } from '@lib/util/save-error'
import { getUserProfile, getUserCurrentStep } from './actions'
import { animateScroll as scroll } from 'react-scroll'

type WalletButtonProps = {
  className?: string
  children?: React.ReactNode
}

export const WalletButton: FC<WalletButtonProps> = ({
  className,
  children,
}) => {
  const [user, updateUser] = useWalletUser() as [
    Web3UserProps,
    Dispatch<SetStateAction<Web3UserProps>>
  ]
  const [client, setClient] = useWeb3Client()
  const [isWeb3Connected, setIsWeb3Connected] = useWeb3IsConnected() as [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ]

  const initGetUserStep = (user: any) => {
    try {
      getUserCurrentStep(user.email)
        .then(res => {
          const { data } = res || {}
          updateUser({
            ...user,
            id: user.id,
            address: user.walletAddress,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            phone_number: user.phoneNumber,
            step: data.tokenMinted
              ? 'token'
              : data.referralPaymentMade
              ? 'location'
              : data.walletConnectedProfileCreated
              ? 'payment'
              : 'info',
            hasMadePayment: data.referralPaymentMade,
            hasFinishedProfile: data.questionnaireFinished,
            userSentMessage: data.userSentMessage,
          })
        })
        .catch(err => {
          console.error('Error fetching user step:', err)
          saveError(err, 'initGetUserStep')
        })
    } catch (error) {
      console.error('Error initializing user step:', error)
      saveError(error, 'initGetUserStep')
    }
  }

  const initUserProfile = (address: string) => {
    getUserProfile(address)
      .then(res => {
        if (res?.data.user) {
          initGetUserStep(res.data.user)
        } else {
          updateUser({
            ...user,
            step: 'prompt',
            hasFinishedProfile: false,
            address: address as string,
          })
        }
        if (sessionStorage.getItem('allowAnalytics') !== 'false')
          localStorage.setItem('walletAddress', address)
        scroll.scrollToTop({ behavior: 'smooth' })
      })
      .catch(err => {
        console.error(err)
        saveError(err, 'initUserProfile')
      })
      .finally(() => setIsWeb3Connected(true))
  }

  const initWalletConnection = async () => {
    connectWallet().then(res => {
      setClient(res?.client)
      if (res?.address) initUserProfile(res.address)
    })
  }

  return (
    <button onClick={() => initWalletConnection()} className={className}>
      {children}
    </button>
  )
}

export default WalletButton
