/// <reference types="vite/client" />
import React, { FC, useEffect, useState } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { Web3Block as Web3BlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

declare global {
  interface Window {
    ethereum?: any
  }
}

const CONTRACT_ADDRESS = '0xeF5956399e0b52E736E8E27b6CFbD81Bc35E1b18'
const ABI = [
  {
    constant: true,
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
]

async function fetchTokenURI(tokenId: number) {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  })
  const uri = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'tokenURI',
    args: [tokenId],
  })
  return uri
}

async function fetchImageUrl(uri: string): Promise<string> {
  const ipfsUrl = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
  const response = await fetch(ipfsUrl)
  const metadata = await response.json()
  return metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
}

export const Web3Block: FC<Web3BlockProps> = ({ className, header }) => {
  const [address, setAddress] = useState<string | null>(null)
  const [client, setClient] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const getAddress = async () => {
      if (window.ethereum) {
        const newClient = createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum!),
        })
        setClient(newClient)
        const accounts = await newClient.getAddresses()

        if (accounts.length > 0) {
          setAddress(accounts[0])

          try {
            const uri = await fetchTokenURI(1) // assuming token ID 1
            const img = await fetchImageUrl(uri)
            setImageUrl(img)
          } catch (error) {
            console.error('Error fetching NFT image:', error)
          }
        } else {
          setAddress(null)
        }
      } else {
        setAddress(null)
      }
    }
    getAddress()
  }, [])

  return client && window.ethereum ? (
    <Block className={classNames(className)}>
      {header && <RichText blocks={header} />}
      {address && (
        <div className="text-center">
          <h2 className="text-3xl font-bold">Wallet Address</h2>
          <p className="text-lg">{address}</p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="NFT"
              className="mx-auto mt-4 w-64 h-64 object-cover"
            />
          )}
          TokenID: 0
        </div>
      )}
    </Block>
  ) : (
    <Block className={classNames(className)}>
      <div className="text-center">
        <h2 className="text-3xl font-bold">No wallet detected</h2>
        <p className="text-lg">
          Please install a web3 wallet like MetaMask to use this feature.
        </p>
      </div>
    </Block>
  )
}

export default Web3Block
