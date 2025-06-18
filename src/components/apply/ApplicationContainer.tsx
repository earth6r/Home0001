/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { RichText } from '@components/sanity/rich-text'
import { useWalletUser, Web3UserProps } from '@contexts/web3'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import ApplicationForm from './ApplicationForm'
import { ApplicationContainerProps } from './types'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { getDynamicPrice } from './actions'
import { saveError } from '@lib/util/save-error'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const ApplicationContainer: FC<ApplicationContainerProps> = ({
  content,
  className,
}) => {
  const [user, setUser] = useWalletUser() as [
    Web3UserProps,
    React.Dispatch<React.SetStateAction<Web3UserProps>>
  ]

  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])
  const [dynamicPrice, setDynamicPrice] = useState<number | null>(null)

  const fetchDynamicPrice = async () => {
    getDynamicPrice()
      .then((res: any) => {
        console.log('Dynamic price fetched:', res)
        setDynamicPrice(res?.data?.tokenPrice)
      })
      .catch(err => {
        console.error(err)
        saveError(err, 'initUserProfile')
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

    const joiningFee = getDynamicPrice()
    console.log('Joining fee:', joiningFee)

    if (!dynamicPrice) {
      fetchDynamicPrice()
    }

    if (joiningFee && ENV === 'production') {
      const usdPrice = joiningFee

      fetchCryptoPrice(usdPrice).then((cryptoPrices: number[]) => {
        setCryptoPrice(cryptoPrices)
      })
    }
  }, [])

  return (
    <div className={classNames(className)}>
      {/* 1: show prompt to connect wallet */}
      {user?.step === 'prompt' && (
        <div className="container flex flex-col">
          {content.header && (
            <RichText
              blocks={content.header}
              className="pr-menu md:pr-0 mb-ydouble"
            />
          )}

          <div className="w-[100vw] px-x -ml-x py-ydouble pr-menu lg:pr-0 bg-gray">
            <div className="flex flex-col flex-start gap-y rich-text text-left">
              <h4>{`Current Joining fee:`}</h4>
              <p className="!mx-0">
                {dynamicPrice
                  ? `${dynamicPrice} USD / ${
                      (cryptoPrice && cryptoPrice.length > 0) ||
                      '(Crypto only enabled in prod)'
                    } BIC`
                  : `Loading...`}
              </p>

              {/* <p className="!mx-0">{`If you were referred by an existing member, your joining fee will be waived.`}</p> */}
            </div>
          </div>

          <div className="inline-flex flex-col w-[100vw] py-ydouble px-x -ml-x bg-yellow">
            <div className="md:max-w-[50%] rich-text">
              <h4 className="text-left mb-ydouble">{`Join:`}</h4>
            </div>

            <button
              onClick={() => setUser({ ...user, step: 'info' })}
              className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-black text-white border-black"
            >
              <IconSmallArrow fill="white" width="15" height="11" />

              <span className="uppercase font-medium leading-none text-xs">
                {`Apply`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 2: create user and set preferences */}
      {user?.step !== 'prompt' &&
        user?.address &&
        !user?.hasFinishedProfile && (
          <ApplicationForm
            className="px-x py-ydouble bg-gray"
            user={user}
            setUser={setUser}
            joiningFee={content.joiningFee}
            cryptoPrice={cryptoPrice}
          />
        )}
    </div>
  )
}

export default ApplicationContainer
