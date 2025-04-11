/// <reference types="vite/client" />
//ts-nocheck
import React, { FC, useEffect, useState } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { Web3Block as Web3BlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { token } from '@studio/lib/sanity.fetch'

declare global {
  interface Window {
    ethereum?: any
  }
}

//need to move to library
const CONTRACT_ADDRESS = '0xa37D0EbC70A41b51c5f6cbdD4D6E646dB3D690d3'

//move to library
const ABI = [
  {
    constant: true,
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'tokenOfOwnerByIndex',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'index', type: 'uint256' },
    ],
    outputs: [{ name: 'tokenId', type: 'uint256' }],
  },
]

//move to web3 utility -  we might want a utils specifically for the NFT
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

//see above note
async function fetchImageUrl(uri: string): Promise<string> {
  const ipfsUrl = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
  const response = await fetch(ipfsUrl)
  const metadata = await response.json()
  return metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
}

//toDO: fix this type error
export const Web3Block: FC<Web3BlockProps> = ({ className, header }) => {
  const [address, setAddress] = useState<string | null>(null)
  const [client, setClient] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [tokenIds, setTokenIds] = useState<any[]>([])

  useEffect(() => {
    //getAddress should be in a general web3 utility.  The state should be in a context, together with all token data
    //belonging to that wallet address: imageURL, tokenIds, etc. The wallet client should be in a
    //web3 context, as well.

    const getAddress = async () => {
      if (client && window.ethereum) {
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

          try {
            getTokensOwnedByAddress(address)
              .then(tokenIds => {
                tokenIds ? setTokenIds(tokenIds) : null
                console.log('Token IDs owned by the address:', tokenIds)
              })
              .catch(err => console.log('Error:', err))
          } catch (error) {
            console.error('Error fetching tokens:', error)
          }
        } else {
          setAddress(null)
        }
      } else {
        const walletClient = createWalletClient({
          chain: sepolia,
          transport: custom((window as any).ethereum),
        })
        setClient(walletClient)
        setAddress(null)
      }
    }
    getAddress().catch(err => {
      console.error('Error in getAddress:', err)
    })
  }, [address, isConnected])

  const getTokensOwnedByAddress = async (ownerAddress: any) => {
    const client = createPublicClient({
      chain: sepolia,
      transport: http(),
    })
    try {
      const totalSupply = (await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'balanceOf',
        args: [ownerAddress],
      })) as number
      console.log('Total Supply:', totalSupply)
      const tokenIds = []
      // Loop over the balance to fetch each token ID owned by the address
      for (let index = 0; index < totalSupply; index++) {
        const tokenId = await client.readContract({
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: 'tokenOfOwnerByIndex',
          args: [ownerAddress, index],
        })
        tokenIds.push(tokenId)
      }

      return tokenIds
    } catch (error) {
      console.error('Error fetching tokens:', error)
    }
  }

  //this button should likely be in a header menu
  const connectWallet = async () => {
    if (!client) return
    try {
      const [address] = await client.requestAddresses()
      setAddress(address)
    } catch (err) {
      console.error('Failed to connect wallet:', err)
    }
  }
  return client && window.ethereum ? (
    <Block className={classNames(className)}>
      {header && <RichText blocks={header} />}
      {isConnected ? (
        'Connected'
      ) : (
        <button
          className="flex justify-center items-center h-btn px-x text-button bg-black text-white"
          onClick={() => connectWallet()}
        >
          Press to Connect
        </button>
      )}
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
          TokenIDs:{' '}
          {tokenIds.length > 0 ? (
            <ul className="list-disc list-inside">
              {tokenIds.map((tokenId, index) => (
                <li key={index} className="text-lg">
                  {tokenId.toString()}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-lg">No tokens found for this address.</div>
          )}
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
