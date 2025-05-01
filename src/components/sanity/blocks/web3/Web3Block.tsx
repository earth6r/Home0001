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
  useWalletUser,
  useWeb3ImageUrl,
  useWeb3IsConnected,
  Web3UserProps,
} from '@contexts/web3'
import { WalletButton, WalletPayment } from '@components/web3-wallet'
import { createUserProfile } from '@components/web3-wallet/actions'

declare global {
  interface Window {
    ethereum?: any
  }
}

type TokenDashboardProps = {
  dashboardCopy?: TypedObject | TypedObject[]
  className?: string
}

type Web3BlockProps = Omit<SanityBlockElement, keyof Web3BlockType> &
  Web3BlockType

const Web3PaymentForm: FC<{
  className?: string
  user: Web3UserProps
  setUser: (arg0: any) => void
}> = ({ className, user, setUser }) => {
  const [payType, setPayType] = React.useState<string>('')

  return (
    <form
      id="payment-form"
      className={className}
      onSubmit={e => {
        e.preventDefault()
        setUser({
          ...user,
          paymentType: payType,
        })
      }}
    >
      <label htmlFor="paymentType">{`Please enter an option:`}</label>

      <div
        onClick={() => setPayType('payment')}
        className="relative pointer-events-auto"
      >
        <input type="radio" id="payment" name="paymentType" className="input" />
        <label htmlFor="payment" className="cursor-pointer">
          Payment
        </label>
      </div>

      <div
        onClick={() => setPayType('referral')}
        className="relative pointer-events-auto"
      >
        <input
          type="radio"
          id="referral"
          name="paymentType"
          className="input"
        />
        <label htmlFor="referral" className="cursor-pointer">
          Referral code
        </label>
      </div>

      <button
        type="submit"
        form="payment-form"
        className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black"
      >
        <IconSmallArrow fill="black" width="15" height="11" />
        <span className="uppercase font-medium leading-none !text-xs">
          {`Submit`}
        </span>
      </button>
    </form>
  )
}

const Web3Prompt: FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
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
      <span className="text-left">Or if you don’t have one already:</span>
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
)

const TokenDashboard: FC<TokenDashboardProps> = ({
  dashboardCopy,
  className,
}) => (
  <div className={className}>
    {dashboardCopy && (
      <RichText blocks={dashboardCopy as TypedObject | TypedObject[]} />
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
)

export const Web3Block: FC<Web3BlockProps> = ({
  className,
  header,
  loggedInHeader,
  dashboardCopy,
}) => {
  const [user, setUser] = useWalletUser() as [
    Web3UserProps,
    React.Dispatch<React.SetStateAction<Web3UserProps>>
  ]
  const [imageUrl, setImageUrl] = useWeb3ImageUrl() as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ]
  const [tokenIds, setTokenIds] = useWeb3IsConnected() as [
    string[] | null,
    React.Dispatch<React.SetStateAction<string[] | null>>
  ]

  const initCreateUser = async () => {
    console.log('Creating user profile for address:', user?.address)
    if (!user?.address) return console.error('No user address found')

    createUserProfile(user.address, {
      first_name: user.first_name as string,
      last_name: user.last_name as string,
      email: user.email as string,
      phone_number: user.phone_number as string,
      comms: user.comms as 'WhatsApp' | 'Telegram',
      signup_source: user.signup_source as 'purchased' | 'referred',
      wallet_address: user?.address,
      referred_token: user?.referred_token,
    })
      .then(res => {
        console.log('User profile created:', res)
        setUser({
          ...user,
          hasProfile: true,
        })
      })
      .catch(err => {
        console.error('Error creating user profile:', err)
      })
  }

  return (
    <Block className={classNames(className, 'grid md:grid-cols-2')}>
      <div>
        {header && (
          <RichText
            blocks={
              user?.hasProfile
                ? (loggedInHeader as TypedObject | TypedObject[])
                : header
            }
          />
        )}

        {/* 1: show prompt to connect wallet */}
        {user === null && <Web3Prompt className="inline-flex flex-col mt-y" />}

        {/* 2: check for payment preference */}
        {user?.address && !user.paymentType && !user?.hasProfile && (
          <div className="rich-text mt-y">
            <p className="text-h4 mb-y">
              {`You have connected your wallet, but you don't have a profile yet.`}
            </p>

            <Web3PaymentForm
              className="flex flex-col gap-y font-medium text-md"
              user={user}
              setUser={setUser}
            />
          </div>
        )}

        {/* 3: add payment flow */}
        {/* TODO: add user name and email capture BEFORE either payment flow */}
        {user?.address && user.paymentType && !user?.hasProfile && (
          <div className="flex flex-col gap-y mt-y">
            <div>
              <p className="text-h3">
                {`Create profile with ${user.paymentType}`}
              </p>

              <WalletPayment
                user={user}
                setUser={setUser}
                onStripeSuccess={initCreateUser}
                className="mt-y"
              />
            </div>
          </div>
        )}

        {/* 4: mint token flow */}
        {user?.hasProfile && (!user.tokenIds || user.tokenIds.length === 0) && (
          <div className="flex flex-col gap-y mt-y">
            <div className="rich-text">
              <p>No tokens found matching wallet address.</p>
            </div>

            <button
              onClick={() => mintToken(user.address as string)}
              className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] border-black bg-white"
            >
              <IconSmallArrow fill="black" width="15" height="11" />

              <span className="uppercase font-medium leading-none text-xs">
                {`Mint a token`}
              </span>
            </button>
          </div>
        )}

        {/* 5: show tokens owned by user */}
        {user?.hasProfile && user.tokenIds && user.tokenIds.length > 0 && (
          <div>
            <div className="grid grid-cols-2 gap-x p-x mt-ydouble bg-gray">
              {/* <h2 className="text-3xl font-bold">Wallet Address</h2>
            <p className="text-lg">{address}</p> */}
              {tokenIds && tokenIds.length > 0 && (
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
              )}
            </div>
          </div>
        )}

        {/* 6. show full dash with tokens if user has minted */}
        {/* Use isConnected once address found to show full dashboard */}
        {user?.address && tokenIds && tokenIds.length > 0 && (
          <TokenDashboard dashboardCopy={dashboardCopy} className="mt-y" />
        )}
      </div>
    </Block>
  )
}

export default Web3Block
