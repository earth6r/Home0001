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
import IconRightArrowBold from '@components/icons/IconRightArrowBold'

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
        <div className="flex flex-col px-x">
          {content.header && (
            <RichText
              blocks={content.header}
              className="pr-menu md:pr-0 mb-page lg:max-w-[50%]"
            />
          )}
          <div className="w-[100vw] px-x -ml-x py-ydouble pr-menu lg:pr-0 bg-gray">
            <div className="flex flex-col flex-start gap-y md:max-w-[375px] rich-text text-left">
              <h4>{`Current Joining fee:`}</h4>
              <p className="!mx-0">
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

              <p className="!mx-0 pr-x">{`We’re keeping the joining fee extremely low for early applicants but increasing it at an accelerating rate with each new member—to grow the project treasury as the community grows.`}</p>
            </div>
          </div>

          <button
            onClick={() => updateUser({ ...user, step: 'info' })}
            className="w-[100vw] h-[173px] bg-yellow px-x -ml-x text-black"
          >
            <div className="flex items-center justify-start gap-xdouble md:gap-x-yquad text-h3 h-full">
              <p className="text-left">
                {`Start`}
                <br />
                {`Application`}
              </p>
              <IconRightArrowBold className="w-[35px] h-auto" fill="black" />
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
