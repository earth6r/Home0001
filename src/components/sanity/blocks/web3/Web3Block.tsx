/* eslint-disable no-console */
/// <reference types="vite/client" />
//ts-nocheck
import React, { FC, useEffect, useState } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { Web3Block as Web3BlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import { createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'
import { token } from '@studio/lib/sanity.fetch'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import Link from 'next/link'
import { TypedObject } from 'sanity'
import {
  fetchImageUrl,
  fetchTokenURI,
  mintToken,
  getTokensOwnedByAddress,
} from '@lib/util/web3'

declare global {
  interface Window {
    ethereum?: any
  }
}

type Web3BlockProps = Omit<SanityBlockElement, keyof Web3BlockType> &
  Web3BlockType

export const Web3Block: FC<Web3BlockProps> = ({
  className,
  header,
  loggedInHeader,
  dashboardCopy,
}) => {
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
            const img = await fetchImageUrl(uri as unknown as string)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected])

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

  return (
    <Block className={classNames(className, 'grid md:grid-cols-2')}>
      <div>
        {header && (
          <RichText
            blocks={
              address ? (loggedInHeader as TypedObject | TypedObject[]) : header
            }
          />
        )}

        {/* Use isConnected once address found to show full dashboard */}

        {address ? (
          <div>
            <div className="grid grid-cols-2 gap-x p-x mt-ydouble bg-gray">
              {/* <h2 className="text-3xl font-bold">Wallet Address</h2>
            <p className="text-lg">{address}</p> */}
              {tokenIds.length > 0 ? (
                <>
                  {imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt="NFT"
                      className="w-full h-auto object-cover"
                    />
                  )}

                  <div className="w-full rich-text">
                    <p className="mb-y">TokenID: </p>
                    <p className="text-lg">{tokenIds[0].toString()}</p>
                  </div>
                </>
              ) : (
                <div className="rich-text">
                  <p>No tokens found for this address.</p>

                  <button
                    onClick={() => mintToken(address)}
                    className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black bg-white"
                  >
                    <IconSmallArrow fill="black" width="15" height="11" />

                    <button className="uppercase font-medium leading-none">
                      {`Get a token`}
                    </button>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-y">
              {dashboardCopy && (
                <RichText
                  blocks={dashboardCopy as TypedObject | TypedObject[]}
                />
              )}

              <div className="mt-y rich-text">
                <p>1. Connect with our liason, Talin.</p>
                <Link
                  href={`mailto:talin@home0001.com`}
                  target="_blank"
                  className="inline-block mt-y font-bold"
                >
                  <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black">
                    <IconSmallArrow fill="black" width="15" height="11" />

                    <button className="uppercase font-medium leading-none">
                      {`Get in touch`}
                    </button>
                  </button>
                </Link>

                <p>2. We’ll invite you to events, house viewings etc.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="inline-flex flex-col mt-y rich-text">
            <span className="text-left">To join:</span>
            <button
              onClick={() => connectWallet()}
              className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black"
            >
              <IconSmallArrow fill="black" width="15" height="11" />
              <div className="uppercase font-medium leading-none">
                {`Connect your wallet`}
              </div>
            </button>

            <span className="text-left">Or if you don’t have one already:</span>

            <Link
              href={`https://metamask.io/download/`}
              target="_blank"
              className="font-bold"
            >
              <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black">
                <IconSmallArrow fill="black" width="15" height="11" />

                <button className="uppercase font-medium leading-none">
                  {`Create a wallet`}
                </button>
              </button>
            </Link>
          </div>
        )}
      </div>
    </Block>
  )
}

export default Web3Block
