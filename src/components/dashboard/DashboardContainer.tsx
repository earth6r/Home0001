/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import { TypedObject } from 'sanity'
import {
  fetchImageUrl,
  fetchTokenURI,
  getTokensOwnedByAddress,
  mintToken,
} from '@lib/util/web3'
import { useWalletUser, useWeb3ImageUrl, Web3UserProps } from '@contexts/web3'
import DashboardSteps from './DashboardSteps'
import { DashboardContainerProps } from './types'
import { AnimatePresence, motion } from 'framer-motion'
import { IconWaitlist } from '@components/icons'
import Link from 'next/link'
import { SanityLink } from '@components/sanity'
import { SanityLinkType } from '@studio/lib'
import { useRouter } from 'next/router'
import { getUserProfile, getUserCurrentStep } from '@components/apply/actions'
import { saveError } from '@lib/util/save-error'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { set } from 'react-hook-form'

const Popup: FC<{ setShowPopup: (arg0: boolean) => void }> = ({
  setShowPopup,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-above"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowPopup(false)}
      >
        <motion.div
          className="relative w-full max-w-[358px] p-x bg-white border-black"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={e => e.stopPropagation()} // Prevent click from closing the popup
        >
          <h2 className="mb-ydouble mt-[42px] text-h3">
            {`Thank you, we've received your submission.`}
          </h2>
          <h3 className="text-h3">{`Welcome to the home0001 dashboard.`}</h3>

          <div
            className={classNames(
              'relative flex flex-col mt-ydouble gap-2 md:gap-y'
            )}
          >
            <button
              className="relative flex justify-between items-center w-full max-w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
              type={'submit'}
            >
              {'Continue'}
              <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
            </button>
          </div>

          <button
            className="absolute top-x right-x text-black uppercase font-medium text-sm"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export const DashboardContainer: FC<DashboardContainerProps> = ({
  content,
  className,
}) => {
  const { asPath, query } = useRouter()
  const [user, updateUser] = useWalletUser() as [
    Web3UserProps,
    React.Dispatch<React.SetStateAction<Web3UserProps>>
  ]
  const [imageUrl, setImageUrl] = useWeb3ImageUrl() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ]
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(true)

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

  const fetchImage = async () => {
    try {
      const uri = await fetchTokenURI(1) // assuming token ID 1
      const img = await fetchImageUrl(uri as unknown as string)
      setImageUrl(img)
    } catch (error) {
      console.error('Error fetching NFT image:', error)
    }
  }

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

  const initGetUserStep = (email: string, address: string, name: string) => {
    try {
      getUserCurrentStep(email)
        .then(res => {
          const { data } = res || {}
          updateUser({
            ...user,
            first_name: name,
            address: address,
            email: email,
            step: data.tokenMinted
              ? 'token'
              : data.referralPaymentMade
              ? 'location'
              : data.walletConnectedProfileCreated
              ? 'paymentOption'
              : 'info',
            hasMadePayment: data.referralPaymentMade,
            hasFinishedProfile: data.questionnaireFinished,
          })
          if (data.tokenMinted) fetchImage()
        })
        .catch(err => {
          console.error('Error fetching user step:', err)
          saveError(err, 'initGetUserStep')
        })
        .finally(() => setLoading(false))
    } catch (error) {
      console.error('Error initializing user step:', error)
      saveError(error, 'initGetUserStep')
    }
  }

  const initUserProfile = (address: string) => {
    getUserProfile(address)
      .then(res => {
        if (res?.data.user) {
          initGetUserStep(res.data.user.email, address, res.data.user.firstName)

          if (localStorage.getItem('hasVisited') !== 'true') {
            setShowPopup(true)
            localStorage.setItem('hasVisited', 'true')
          }
        } else {
          updateUser({
            ...user,
            step: 'info',
            hasFinishedProfile: false,
            address: address as string,
          })
          console.log('No user profile found for this address, user:', user)
        }
      })
      .catch(err => {
        console.error(err)
        saveError(err, 'initUserProfile')
        setLoading(false)
      })
  }

  useEffect(() => {
    if (query.wallet) {
      initUserProfile(query.wallet as string)
    } else {
      setLoading(false)
    }
  }, [])

  console.log('DashboardContainer user:', user)

  return (
    <div className={classNames(className, 'pt-page')}>
      {showPopup && <Popup setShowPopup={setShowPopup} />}

      <motion.div
        className={classNames(
          'hidden md:flex flex-col justify-end gap-8 fixed w-[100svh] h-[calc(100vw+32px)] top-0 right-[calc(-100vw+44px)] md:right-[calc(-100vw+44px)] pl-header transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left transition-all duration-500 border-none z-above'
        )}
      >
        <div className={classNames('flex items-end gap-2 ')}>
          <h2 className="min-w-[635px] text-side">{`Home0001 Dashboard`}</h2>
        </div>
      </motion.div>

      {loading && <h2 className="text-h3">Loading...</h2>}

      {(user?.step === 'info' || !user?.hasMadePayment) && !loading && (
        <div className="flex flex-col gap-y rich-text">
          <h3>no account found.</h3>
          <p className="!mx-0">
            {`You need to apply before you can access your HOME0001 dashboard. To do so please click here.`}
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

            <div className="max-w-[290px] aspect-square bg-gray"></div>
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

            <p className="!m-0 pb-y uppercase border-bottom--gray">{`Membership status: Awaiting judgement`}</p>
            <p className="!m-0 pb-y uppercase border-bottom--gray">{`Connected wallet ...${user.address?.slice(
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
