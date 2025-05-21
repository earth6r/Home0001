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
import { getUserProfile } from './actions'

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
  const [imageUrl, setImageUrl] = useWeb3ImageUrl() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ]
  const [isWeb3Connected, setIsWeb3Connected] = useWeb3IsConnected() as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ]

  const fetchImage = async () => {
    try {
      const uri = await fetchTokenURI(1) // assuming token ID 1
      const img = await fetchImageUrl(uri as unknown as string)
      setImageUrl(img)
    } catch (error) {
      console.error('Error fetching NFT image:', error)
    }
  }

  const fetchTokenIds = async (address: string) => {
    try {
      getTokensOwnedByAddress(address)
        .then(tokenIds => {
          updateUser({
            ...user,
            hasProfile: true,
            address: address as string,
            tokenIds: tokenIds as string[],
          })
          console.log('Token IDs owned by the address:', user)
        })
        .catch(err => console.log('Error:', err))
    } catch (error) {
      console.error('Error fetching tokens:', error)
    }
  }

  const initUserProfile = (address: string) => {
    getUserProfile(address)
      .then(res => {
        if (res?.data.user) {
          // Assuming you have a function to set user profile in context or state
          fetchTokenIds(address as string)
          fetchImage()
          console.log(res.data.user)
        } else {
          updateUser({ ...user, hasProfile: false, address: address as string })
          console.log('No user profile found for this address, user:', user)
        }
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
