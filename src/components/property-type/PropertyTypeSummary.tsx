import { type FC, useEffect, useState } from 'react'
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
import posthog from 'posthog-js'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const PropertyTypeSummary: FC<PropertyTypeListProps> = ({
  propertyType,
  showCity,
  className,
}) => {
  const [cryptoMode, setCryptoMode] = useCryptoMode()
  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])
  const { asPath } = useRouter()

  useEffect(() => {
    const fetchCryptoPrice = async (usdPrice: any) => {
      const currentEthPrice = await convertUsdToEthPrice(usdPrice)
      const roundedEthPrice = Number(currentEthPrice.toFixed(1))
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
    <li className={classNames(className, '')}>
      <div
        className={classNames(
          propertyType.available ? '' : 'bg-white opacity-30',
          `w-auto flex-col md:hover:scale-[0.99] transition-transform`
        )}
      >
        <div className="z-above">
          <Link
            href={`/property-type/${propertyType.slug?.current}`}
            onClick={() =>
              posthog.capture('property_type_click', {
                location: `${propertyType.typeTitle} - ${
                  (propertyType?.property as any)?.location.title
                }`,
                route: asPath,
              })
            }
            className="inline-block w-full"
          >
            <div className="flex flex-col relative overflow-x-hidden">
              {propertyType?.photographs && (
                <SanityMedia
                  {...(propertyType.photographs[0] as SanityMediaProps)}
                  imageProps={{
                    alt: 'Unit image',
                    quality: 90,
                    sizes: '(max-width: 768px) 100vw, 1000px',
                    lqip: ((propertyType.photographs[0] as Media).image as any)
                      ?.asset?.metadata?.lqip,
                  }}
                  className="w-full h-auto object-contain select-none"
                />
              )}
              <div className="block w-full text-sm uppercase">
                <div className="my-y font-medium">
                  {propertyType.typeTitle && (
                    <p className="mb-y tracking-normal">
                      {propertyType.typeTitle}
                    </p>
                  )}

                  <p>{propertyType?.price}</p>
                  {cryptoMode && (
                    <>
                      <p className="ml-[54px]">{`${cryptoPrice[1]} BTC`}</p>
                      <p className="ml-[54px]">{`${cryptoPrice[0]} ETH`}</p>
                    </>
                  )}
                </div>

                <div className="flex justify-between w-full">
                  <p className="font-medium">{propertyType?.area}</p>

                  <div
                    className={classNames(
                      'mt-[-5px] inline-flex justify-between items-center w-[99px] relative px-[6px] pt-[4px] pb-[5px] bg-black text-white font-medium text-sm text-left uppercase'
                    )}
                  >
                    <IconRightArrowBold
                      className="relative w-[1em] mt-[0.1em]"
                      fill="white"
                    />
                    <span className="leading-none">{`Explore`}</span>
                  </div>
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
