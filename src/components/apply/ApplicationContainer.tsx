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
import { getDynamicPrice } from './actions'
import { saveError } from '@lib/util/save-error'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import { animateScroll as scroll } from 'react-scroll'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const ApplicationContainer: FC<ApplicationContainerProps> = ({
  content,
  className,
}) => {
  const [user, updateUser] = useWalletUser() as [
    Web3UserProps,
    React.Dispatch<React.SetStateAction<Web3UserProps>>
  ]

  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])
  const [dynamicPrice, setDynamicPrice] = useState<number | null>(null)

  const fetchDynamicPrice = async () => {
    getDynamicPrice()
      .then((res: any) => {
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

    if (!dynamicPrice) {
      fetchDynamicPrice()
    }

    if (dynamicPrice && ENV === 'production') {
      const usdPrice = dynamicPrice

      fetchCryptoPrice(usdPrice).then((cryptoPrices: number[]) => {
        setCryptoPrice(cryptoPrices)
      })
    }
  }, [dynamicPrice])

  return (
    <div className={classNames(className)}>
      {/* 1: show prompt to connect wallet */}
      {user?.step === 'prompt' && (
        <div className="flex flex-col px-x mb-y">
          {content.header && (
            <RichText
              blocks={content.header}
              className="pr-menu lg:pr-0 mb-ydouble lg:max-w-[50%]"
            />
          )}
          <div className="w-[100vw] px-x -ml-x py-ydouble pr-menu lg:pr-0 bg-gray">
            <div className="flex flex-col flex-start gap-ydouble text-left lg:max-w-[33%]">
              <h4 className="text-bodyLg uppercase font-bold font-sansText">{`Current Joining fee:`}</h4>
              <p className="!mx-0 text-bodyLg uppercase font-bold font-sansText">
                {dynamicPrice ? (
                  <>
                    <span>{`${dynamicPrice} USD`}</span>
                    {cryptoPrice[0] > 0 && (
                      <span>
                        {`/ ${cryptoPrice[1]} BTC / ${cryptoPrice[0]} ETH`}
                      </span>
                    )}
                  </>
                ) : (
                  `Loading...`
                )}
              </p>

              <p className="!mx-0 pr-x text-xs font-medium">{`We’re keeping the joining fee extremely low for early applicants but increasing it at an accelerating rate with each new member—to grow the project treasury as the community grows.`}</p>
            </div>
          </div>

          <button
            onClick={() => {
              updateUser({ ...user, step: 'info' })
              scroll.scrollToTop({ behavior: 'smooth' })
            }}
            className="flex items-center w-[100vw] bg-yellow pl-x pr-menu md:pr-x py-yquad -ml-x text-white"
          >
            <div className="flex items-center justify-between w-full md:w-[50%] lg:w-[33%] h-auto px-xhalf pt-[5px] pb-[6px] bg-black text-bodyLg uppercase font-bold font-sansText pt-">
              <p className="w-full text-left">{`Start Application`}</p>
              <IconRightArrowBold className="w-[25px] h-auto" fill="white" />
            </div>
          </button>
        </div>
      )}

      {/* 2: create user and set preferences */}
      {user?.step !== 'prompt' &&
        user?.address &&
        !user?.hasFinishedProfile && (
          <ApplicationForm
            className="pb-ydouble bg-gray"
            user={user}
            updateUser={updateUser}
            joiningFee={dynamicPrice}
            cryptoPrice={cryptoPrice}
          />
        )}
    </div>
  )
}

export default ApplicationContainer
