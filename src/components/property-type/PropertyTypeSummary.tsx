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
    <li className={classNames(className)}>
      <div
        className={classNames(
          propertyType.available ? '' : 'bg-white opacity-30',
          `w-auto flex-col`
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
                  className="w-full h-auto object-contain"
                />
              )}
              <div className="block w-full text-md uppercase">
                <div className="my-y">
                  {propertyType.typeTitle && (
                    <p className="font-medium mb-yhalf tracking-normal">
                      {propertyType.typeTitle}
                    </p>
                  )}

                  <p className="font-medium mb-yhalf">
                    {cryptoMode
                      ? `${propertyType.price?.substring(0)} / ${
                          cryptoPrice[1]
                        } BTC / ${cryptoPrice[0]} ETH`
                      : propertyType?.price}
                  </p>

                  <p className="font-medium">{propertyType?.area}</p>
                </div>
                <div
                  className={classNames(
                    'inline-flex justify-between items-start gap-[32px] w-full relative p-[16px] bg-black text-white border-black hover:border-white hover:invert text-button text-left uppercase'
                  )}
                >
                  <div>
                    {`Learn more`}
                    <br />
                    {showCity &&
                      (propertyType?.property as any)?.location.title}
                  </div>

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
