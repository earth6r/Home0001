/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { TypedObject } from 'sanity'
import { mintToken } from '@lib/util/web3'
import {
  useWalletUser,
  useWeb3ImageUrl,
  useWeb3IsConnected,
  Web3UserProps,
} from '@contexts/web3'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import TokenDashboard from './TokenDashboard'
import ApplicationPrompt from './ApplicationPrompt'
import ApplicationForm from './ApplicationForm'
import { ApplicationContainerProps } from './types'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const ApplicationContainer: FC<ApplicationContainerProps> = ({
  content,
  className,
}) => {
  const [user, setUser] = useWalletUser() as [
    Web3UserProps,
    React.Dispatch<React.SetStateAction<Web3UserProps>>
  ]
  const [imageUrl, setImageUrl] = useWeb3ImageUrl() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ]

  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])

  const initMint = async () => {
    console.log('Minting token for address:', user?.address)
    mintToken(user?.address as string)
      .then(res => {
        console.log('Minted token:', res)
        // if (!res?.result) {
        //   return console.error('No token ID returned from minting')
        // }
        // setUser({
        //   ...user,
        //   tokenIds: [res?.toString() as string],
        // })
      })
      .catch(err => {
        console.error('Error minting token:', err)
      })
  }

  useEffect(() => {
    const fetchCryptoPrice = async (usdPrice: any) => {
      const currentEthPrice = await convertUsdToEthPrice(usdPrice)
      const roundedEthPrice = Number(currentEthPrice.toFixed(1))
      const currentBtcPrice = await convertUsdToBtcPrice(usdPrice)
      const roundedBtcPrice = Number(currentBtcPrice.toFixed(2))
      return [roundedEthPrice, roundedBtcPrice]
    }

    if (content.joiningFee && ENV === 'production') {
      const usdPrice = content.joiningFee

      fetchCryptoPrice(usdPrice).then((cryptoPrices: number[]) => {
        setCryptoPrice(cryptoPrices)
      })
    }
  }, [])

  return (
    <div className={className}>
      {/* 1: show prompt to connect wallet */}
      {user === null && (
        <>
          {content.header && (
            <RichText blocks={content.header} className="pr-menu md:pr-0" />
          )}

          <div className="w-[100vw] px-x -ml-x py-ydouble pr-menu md:pr-0 bg-lightgray">
            <div className="flex flex-col flex-start gap-y rich-text text-left">
              <h3 className="">{`Current Joining fee:`}</h3>
              <p className="!mx-0">{`${content.joiningFee} USD / ${
                (cryptoPrice && cryptoPrice.length > 0) ||
                '(Crypto only enabled in prod)'
              } BIC`}</p>
              <p className="!mx-0">{`If you were referred by an existing member, your joining fee will be waived.`}</p>
            </div>
          </div>
          <ApplicationPrompt className="w-[100vw] px-x -ml-x py-ydouble pr-menu md:pr-0" />
        </>
      )}

      {/* 2: create user and set preferences */}
      {user?.address && !user.paymentType && !user?.hasFinishedProfile && (
        <ApplicationForm
          className="w-[100vw] min-h-[100svh] px-x -ml-x -mt-header pt-header pb-ydouble pr-menu bg-gray"
          user={user}
          setUser={setUser}
          joiningFee={content.joiningFee}
          cryptoPrice={cryptoPrice}
        />
      )}

      {user?.hasFinishedProfile && content?.loggedInHeader && (
        <RichText
          blocks={content.loggedInHeader as TypedObject | TypedObject[]}
          className="pr-menu md:pr-0"
        />
      )}

      {/* 3: mint token flow */}
      {user?.hasFinishedProfile &&
        (!user.tokenIds || user.tokenIds.length === 0) && (
          <div className="flex flex-col gap-y mt-y">
            <div className="rich-text">
              <p>No tokens found matching wallet address.</p>
            </div>

            <button
              onClick={initMint}
              className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black bg-white"
            >
              <IconSmallArrow fill="black" width="15" height="11" />

              <span className="uppercase font-medium leading-none text-xs">
                {`Mint a token`}
              </span>
            </button>
          </div>
        )}

      {/* 4: show tokens owned by user */}
      {user?.hasFinishedProfile &&
        user.tokenIds &&
        user.tokenIds.length > 0 && (
          <div className="grid grid-cols-2 gap-x p-x mt-ydouble bg-gray">
            {user.tokenIds && user.tokenIds.length > 0 && (
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
                  <p className="text-lg">{user.tokenIds[0].toString()}</p>
                </div>
              </>
            )}
          </div>
        )}

      {/* 5. show full dash with tokens if user has minted */}
      {/* Use isConnected once address found to show full dashboard */}
      {user?.address && user.tokenIds && user.tokenIds.length > 0 && (
        <TokenDashboard
          dashboardCopy={content.dashboardCopy}
          className="mt-y"
        />
      )}
    </div>
  )
}

export default ApplicationContainer
