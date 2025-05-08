/// <reference types="vite/client" />

/* eslint-disable no-console */
import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

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
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const getWeb3Client = async () => {
  if (window.ethereum) {
    const newClient = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum!),
    })
    return newClient
  } else {
    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom((window as any).ethereum),
    })
    return walletClient
  }
}

export const getAddress = async (client: any) => {
  if (window.ethereum) {
    console.log('getAddress client:', client)
    const accounts = await client.getAddresses()

    if (accounts.length > 0) {
      return accounts[0]
    }
  }
}

//this button should likely be in a header menu
export const connectWallet = async () => {
  if (!window.ethereum) return

  const client = await getWeb3Client()
  if (!client) return

  try {
    const [address] = await client.requestAddresses()
    return { client, address }
  } catch (err) {
    console.error('Failed to connect wallet:', err)
  }
}

export const fetchTokenURI = async (tokenId: number) => {
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

export const fetchImageUrl = async (uri: string): Promise<string> => {
  const ipfsUrl = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
  const response = await fetch(ipfsUrl)
  const metadata = await response.json()
  return metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
}

export const fetchImage = async () => {
  try {
    const uri = await fetchTokenURI(1) // assuming token ID 1
    const img = await fetchImageUrl(uri as unknown as string)
    return img
  } catch (error) {
    console.error('Error fetching NFT image:', error)
  }
}

export const fetchTokenIds = async (address: string) => {
  try {
    getTokensOwnedByAddress(address)
      .then(tokenIds => {
        console.log('Token IDs owned by the address:', tokenIds)
        return tokenIds ? tokenIds : null
      })
      .catch(err => console.log('Error:', err))
  } catch (error) {
    console.error('Error fetching tokens:', error)
  }
}

export const mintToken = async (address: string) => {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  })
  const walletClient = await getWeb3Client()

  try {
    const { request } = await client.simulateContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'mint',
      args: [address],
      account: address as `0x${string}`,
    })
    const result = await walletClient.writeContract(request)
    console.log('result:', result)
    if (result) {
      const transaction = await client.waitForTransactionReceipt({
        hash: result,
      })
      console.log('Transaction receipt:', transaction)
    } else {
      console.error('Transaction failed')
    }
    console.log('Token minted successfully')
  } catch (error) {
    console.error('Error fetching token URI:', error)
  }
}

export const getTokensOwnedByAddress = async (ownerAddress: any) => {
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
