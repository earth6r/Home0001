/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { TypedObject } from 'sanity'
import { mintToken } from '@lib/util/web3'
import { useWalletUser, useWeb3ImageUrl, Web3UserProps } from '@contexts/web3'
import DashboardSteps from './DashboardSteps'
import { DashboardContainerProps } from './types'
import { WalletButton } from '@components/apply'
import { motion } from 'framer-motion'
import { IconWaitlist } from '@components/icons'
import Link from 'next/link'
import { SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import { useRouter } from 'next/router'

export const DashboardContainer: FC<DashboardContainerProps> = ({
  content,
  className,
}) => {
  const { asPath } = useRouter()
  const [user, setUser] = useWalletUser() as [
    Web3UserProps,
    React.Dispatch<React.SetStateAction<Web3UserProps>>
  ]
  const [imageUrl, setImageUrl] = useWeb3ImageUrl() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ]

  // const fetchTokenIds = async (address: string, email: string) => {
  //   try {
  //     getTokensOwnedByAddress(address)
  //       .then(tokenIds => {
  //         updateUser({
  //           ...user,
  //           email: email || '',
  //           address: address as string,
  //           tokenIds: tokenIds as string[],
  //         })
  //         console.log('Token IDs owned by the address:', user)
  //       })
  //       .catch(err => console.log('Error:', err))
  //   } catch (error) {
  //     console.error('Error fetching tokens:', error)
  //   }
  // }

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
      <motion.div
        className={classNames(
          'hidden md:flex flex-col justify-end gap-8 fixed w-[100svh] h-[calc(100vw+32px)] top-0 right-[calc(-100vw+44px)] md:right-[calc(-100vw+44px)] pl-header transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left transition-all duration-500 border-none z-above'
        )}
      >
        <div className={classNames('flex items-end gap-2 ')}>
          <h2 className="min-w-[635px] text-side">{`Home0001 Dashboard`}</h2>
        </div>
      </motion.div>

      {!user && (
        <div className="flex flex-col gap-y rich-text">
          <h3>Reconnect wallet to view your dashboard</h3>
          <WalletButton className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black">
            <IconSmallArrow fill="black" width="15" height="11" />
            <span className="uppercase font-medium leading-none text-xs">
              {`Connect your wallet`}
            </span>
          </WalletButton>
        </div>
      )}

      {user && !user?.hasMadePayment && (
        <div className="flex flex-col gap-y rich-text">
          <h3>no account found.</h3>
          <p className="!mx-0">
            {`You need to finish applying before you can access your HOME0001 dashboard. To do so please click here.`}
          </p>
          <Link
            href={`/apply`}
            className={classNames('flex p-3 -m-3 pointer-events-auto z-header')}
          >
            <IconWaitlist className="w-[77px]" />
          </Link>
        </div>
      )}

      {user && user?.hasMadePayment && (
        <div className="flex flex-col md:grid md:grid-cols-3 gap-x">
          <div className="flex flex-col gap-y rich-text">
            <h3>{`Hello, ${user.first_name}.`}</h3>

            <div className="w-full aspect-square bg-gray"></div>
            {/* {(!user?.tokenIds || user.tokenIds.length === 0) && (
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
          )} */}

            {user?.tokenIds && user.tokenIds.length > 0 && (
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

            <p className="!m-0 pb-y uppercase border-bottom">{`Membership status: Awaiting judgement`}</p>
            <p className="!m-0 pb-y uppercase border-bottom">{`Connected wallet ...${user.address?.slice(
              user.address.length - 4,
              user.address.length
            )}`}</p>

            <nav className="!m-0">
              {content.dashboardMenu && (
                <div className="flex flex-col gap-yhalf">
                  {content.dashboardMenu.items?.map((item, index) => (
                    <SanityLink
                      key={`${item.text}-${index}`}
                      {...(item.link as SanityLinkType)}
                      className={classNames(
                        asPath !== '' &&
                          asPath ===
                            `/${
                              (item.link as SanityLinkType)?.internalLink?.slug
                                ?.current
                            }`
                          ? 'underline'
                          : '',
                        'flex items-center font-medium'
                      )}
                    >
                      {item.text}
                    </SanityLink>
                  ))}
                </div>
              )}
            </nav>
          </div>

          <div className="md:col-span-2 mt-ydouble md:mt-0">
            <RichText
              blocks={content.loggedInHeader as TypedObject | TypedObject[]}
              className="mb-ydouble"
            />

            <DashboardSteps
              user={user}
              dashboardCopy={content.dashboardCopy}
              className="mt-y"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardContainer
