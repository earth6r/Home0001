/* eslint-disable no-console */
import { type FC } from 'react'
import {
  fetchImageUrl,
  fetchTokenURI,
  getTokensOwnedByAddress,
  connectWallet,
} from '@lib/util/web3'
import {
  useWalletAddress,
  useWeb3Client,
  useWeb3ImageUrl,
  useWeb3IsConnected,
} from '@contexts/web3'

type WalletButtonProps = {
  className?: string
  children?: React.ReactNode
}

export const WalletButton: FC<WalletButtonProps> = ({
  className,
  children,
}) => {
  const [address, setAddress] = useWalletAddress() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
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
  const [tokenIds, setTokenIds] = useWeb3IsConnected() as [
    string[] | null,
    React.Dispatch<React.SetStateAction<string[] | null>>
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
          tokenIds ? setTokenIds(tokenIds as string[]) : null
          console.log('Token IDs owned by the address:', tokenIds)
        })
        .catch(err => console.log('Error:', err))
    } catch (error) {
      console.error('Error fetching tokens:', error)
    }
  }

  const initWalletConnection = async () => {
    connectWallet().then(res => {
      setClient(res?.client)
      setAddress(res?.address as string)
      fetchImage()
      fetchTokenIds(res?.address as string)
      setIsWeb3Connected(true)
    })
  }

  return (
    <button onClick={() => initWalletConnection()} className={className}>
      {children}
    </button>
  )
}

export default WalletButton
