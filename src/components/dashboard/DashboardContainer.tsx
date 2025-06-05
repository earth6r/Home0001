/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { TypedObject } from 'sanity'
import { mintToken } from '@lib/util/web3'
import { useWalletUser, useWeb3ImageUrl, Web3UserProps } from '@contexts/web3'
import TokenDashboard from './TokenDashboard'
import { DashboardContainerProps } from './types'
import ApplicationPrompt from '@components/apply/ApplicationPrompt'
import { WalletButton } from '@components/apply'

export const DashboardContainer: FC<DashboardContainerProps> = ({
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

  const initMint = async () => {
    // console.log('Minting token for address:', user?.address)
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

  console.log('DashboardContainer user:', user)

  return (
    <div className={classNames(className, 'pt-page')}>
      {user ? (
        <RichText
          blocks={content.loggedInHeader as TypedObject | TypedObject[]}
          className="pr-menu md:pr-0"
        />
      ) : (
        <div className="rich-text">
          <h3>Reconnect wallet to view your dashboard</h3>
          <WalletButton className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black">
            <IconSmallArrow fill="black" width="15" height="11" />
            <span className="uppercase font-medium leading-none text-xs">
              {`Connect your wallet`}
            </span>
          </WalletButton>
        </div>
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

export default DashboardContainer
