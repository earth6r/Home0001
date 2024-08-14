import { type FC, useContext, useEffect, useState } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { PropertyTypeListProps } from './types'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import { SanityMedia, SanityMediaProps } from '@components/sanity'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import { Media } from '@studio/gen/sanity-schema'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const PropertyTypeSummary: FC<PropertyTypeListProps> = ({
  propertyType,
  className,
}) => {
  const [cryptoMode, setCryptoMode] = useCryptoMode()
  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])

  useEffect(() => {
    const fetchCryptoPrice = async (usdPrice: any) => {
      const currentEthPrice = await convertUsdToEthPrice(usdPrice)
      const roundedEthPrice = Number(currentEthPrice.toFixed(2))
      const currentBtcPrice = await convertUsdToBtcPrice(usdPrice)
      const roundedBtcPrice = Number(currentBtcPrice.toFixed(2))
      return [roundedEthPrice, roundedBtcPrice]
    }

    if (propertyType?.price != 'Inquire' && ENV !== 'dev') {
      const usdPrice = propertyType?.price

      fetchCryptoPrice(usdPrice).then((cryptoPrices: number[]) => {
        setCryptoPrice(cryptoPrices)
      })
    }
  }, [propertyType])

  if (!propertyType) return null

  return (
    <li className={classNames(className)}>
      <div
        className={classNames(
          propertyType.available ? '' : 'bg-white shadow-none opacity-30',
          `w-auto flex-col`
        )}
      >
        <div className="z-above">
          <Link
            href={`/property-type/${propertyType.slug?.current}`}
            className="inline-block w-full md:scale-100 md:hover:scale-[0.96] transition-transform duration-500"
          >
            <div className="flex flex-col relative overflow-x-hidden">
              {propertyType?.photographs && (
                <SanityMedia
                  {...(propertyType.photographs as SanityMediaProps)}
                  imageProps={{
                    alt: 'Unit image',
                    quality: 90,
                    sizes: '(max-width: 768px) 100vw, 1000px',
                    lqip: ((propertyType.photographs as Media).image as any)
                      ?.asset?.metadata?.lqip,
                  }}
                  className="w-full h-auto object-contain"
                />
              )}
              <div className="block w-full text-md">
                <div className="p-x bg-darkergray">
                  {propertyType.typeTitle && (
                    <p className="font-medium mb-yhalf tracking-normal">
                      {propertyType.typeTitle}
                    </p>
                  )}

                  <p className="font-medium mb-yhalf">
                    {cryptoMode
                      ? `${propertyType.price?.substring(0)} USDC / ${
                          cryptoPrice[1]
                        } BTC / ${cryptoPrice[0]} ETH`
                      : propertyType?.price}
                  </p>

                  <p className="font-medium">{propertyType?.area}</p>
                </div>
                <div
                  className={classNames(
                    'inline-flex justify-between items-start gap-[32px] w-full relative p-[16px] bg-black text-card font-bold text-left uppercase'
                  )}
                >
                  <h4 className="text-card text-white">
                    {propertyType.typeTitle}
                  </h4>

                  <IconRightArrowBold
                    className="relative w-[1em] mt-[0.1em]"
                    fill="white"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default PropertyTypeSummary
