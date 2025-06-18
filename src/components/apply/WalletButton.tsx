/* eslint-disable no-console */
import { useState, type FC } from 'react'
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
    React.Dispatch<React.SetStateAction<Web3UserProps>>
  ]
  const [client, setClient] = useWeb3Client()
  const [isWeb3Connected, setIsWeb3Connected] = useWeb3IsConnected() as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ]

  const initGetUserStep = (email: string, address: string, name: string) => {
    try {
      getUserCurrentStep(email)
        .then(res => {
          const { data } = res || {}
          updateUser({
            ...user,
            first_name: name,
            address: address,
            email: email,
            step: data.tokenMinted
              ? 'token'
              : data.referralPaymentMade
              ? 'location'
              : data.walletConnectedProfileCreated
              ? 'payment'
              : 'info',
            hasMadePayment: data.referralPaymentMade,
            hasFinishedProfile: data.questionnaireFinished,
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
          // Assuming you have a function to set user profile in context or state
          initGetUserStep(res.data.user.email, address, res.data.user.firstName)
        } else {
          updateUser({
            ...user,
            step: 'prompt',
            hasFinishedProfile: false,
            address: address as string,
          })
          console.log('No user profile found for this address, user:', user)
        }
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
