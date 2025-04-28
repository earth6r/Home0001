/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import Block from '../Block'
import { SanityBlockElement } from '@components/sanity/types'
import type { Web3Block as Web3BlockType } from '@gen/sanity-schema'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import Link from 'next/link'
import { TypedObject } from 'sanity'
import { mintToken } from '@lib/util/web3'
import {
  useWalletAddress,
  useWeb3ImageUrl,
  useWeb3IsConnected,
} from '@contexts/web3'
import { WalletButton } from '@components/web3-wallet'

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
  const [address, setAddress] = useWalletAddress() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ]
  const [imageUrl, setImageUrl] = useWeb3ImageUrl() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ]
  const [tokenIds, setTokenIds] = useWeb3IsConnected() as [
    string[] | null,
    React.Dispatch<React.SetStateAction<string[] | null>>
  ]

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
              {tokenIds && tokenIds.length > 0 ? (
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
                <div>
                  <div className="rich-text mb-y">
                    <p>No tokens found for this address.</p>
                  </div>

                  <button
                    onClick={() => mintToken(address)}
                    className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black bg-white"
                  >
                    <IconSmallArrow fill="black" width="15" height="11" />

                    <span className="uppercase font-medium leading-none text-xs">
                      {`Get a token`}
                    </span>
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

              <div>
                <div className="mt-y rich-text">
                  <p>1. Connect with our liason, Talin.</p>
                </div>
                <Link
                  href={`mailto:talin@home0001.com`}
                  target="_blank"
                  className="inline-block mt-y font-bold"
                >
                  <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black">
                    <IconSmallArrow fill="black" width="15" height="11" />

                    <span className="uppercase font-medium leading-none text-xs">
                      {`Get in touch`}
                    </span>
                  </button>
                </Link>

                <div className="mt-y rich-text">
                  <p>2. We’ll invite you to events, house viewings etc.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="inline-flex flex-col mt-y">
            <div className="rich-text mb-y">
              <span className="text-left">To join:</span>
            </div>

            <WalletButton className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black">
              <IconSmallArrow fill="black" width="15" height="11" />
              <span className="uppercase font-medium leading-none text-xs">
                {`Connect your wallet`}
              </span>
            </WalletButton>

            <div className="rich-text my-y">
              <span className="text-left">
                Or if you don’t have one already:
              </span>
            </div>

            <Link
              href={`https://metamask.io/download/`}
              target="_blank"
              className="font-bold"
            >
              <button className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black">
                <IconSmallArrow fill="black" width="15" height="11" />

                <span className="uppercase font-medium leading-none text-xs">
                  {`Create a wallet`}
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </Block>
  )
}

export default Web3Block
