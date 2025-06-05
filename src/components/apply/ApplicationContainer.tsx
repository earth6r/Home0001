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
import ApplicationPrompt from './ApplicationPrompt'
import ApplicationForm from './ApplicationForm'
import { ApplicationContainerProps } from './types'
import { motion } from 'framer-motion'

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user?.hasFinishedProfile) {
        setTimeout(() => (window.location.href = '/dashboard'), 6000)
      }
    }
  }, [user?.hasFinishedProfile])

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
    <div className={classNames(className)}>
      {/* 1: show prompt to connect wallet */}
      {user === null && (
        <>
          {content.header && (
            <RichText
              blocks={content.header}
              className="pt-page pr-menu md:pr-0"
            />
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
          className="w-[100vw] px-x -ml-x pt-header pb-ydouble pr-menu bg-gray"
          user={user}
          setUser={setUser}
          joiningFee={content.joiningFee}
          cryptoPrice={cryptoPrice}
        />
      )}

      {user?.hasFinishedProfile && (
        <div className="pt-page">
          <h3 className="text-h3">
            <span>
              {`Thank you for your application, you will be redirected to the dashboard shortly`}
            </span>
            <motion.span
              initial={{ maxWidth: 0 }}
              animate={{ maxWidth: 30 }}
              transition={{
                duration: 1,
                ease: 'linear',
                repeat: Infinity,
              }}
              className="inline-block absolute overflow-hidden"
            >{`...`}</motion.span>
          </h3>
        </div>
      )}
    </div>
  )
}

export default ApplicationContainer
