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

export const mintToken = async (ownerAddress: string) => {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  })

  try {
    const uri = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'mint',
      args: [ownerAddress],
    })
    console.log('Token URI:', uri)
    return uri
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
