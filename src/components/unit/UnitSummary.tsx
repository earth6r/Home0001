import { type FC, useContext, useEffect, useState } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { KeyedUnitProps, UnitListProps } from './types'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import { sendGoogleEvent } from '@lib/util'
import Link from 'next/link'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import { RichText, SanityMedia, SanityMediaProps } from '@components/sanity'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import { Media } from '@studio/gen/sanity-schema'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const UnitSummary: FC<UnitListProps> = ({ unit, className }) => {
  const router = useRouter()
  const { dispatch, state } = useContext(HomeContext)
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

    if (unit?.price != 'Inquire' && ENV !== 'dev') {
      const usdPrice = unit?.price

      fetchCryptoPrice(usdPrice).then((cryptoPrices: number[]) => {
        setCryptoPrice(cryptoPrices)
      })
    }
  }, [unit])

  const dispatchUnit = (unit: KeyedUnitProps, title?: string) => {
    dispatch({
      ...state,
      type: 'SET_UNIT',
      payload: {
        unit: unit,
        unitSlug: title,
      },
    })
  }

  const updatePath = (title?: string) => {
    if (title !== router.query.unit && router.query.city) {
      router.push(`?city=${router.query.city}&unit=${title}`, undefined, {
        shallow: true,
      })
    }
  }

  const updateUnit = (unit: KeyedUnitProps, title?: string) => {
    if (unit._id === state.unit?._id) return
    const slugifiedTitle = title && slugify(title, { lower: true })
    dispatchUnit(unit, slugifiedTitle)
    updatePath(slugifiedTitle)

    if (unit.title) {
      const options = { unit: unit.title }
      sendGoogleEvent('clicked unit', options)
    }
  }

  if (!unit) return null

  return (
    <li className={classNames(className)}>
      <div
        className={classNames(
          unit.available ? '' : 'bg-white shadow-none opacity-30',
          `w-auto flex-col`
        )}
      >
        <div className="z-above">
          <Link
            href={`/unit/${unit.slug?.current}`}
            onClick={() => {
              updateUnit(unit, unit.title)
            }}
            className="inline-block w-full md:scale-100 md:hover:scale-[0.96] transition-transform duration-500"
          >
            <div className="flex flex-col relative overflow-x-hidden">
              {unit?.photographs && (
                <SanityMedia
                  {...(unit.photographs as SanityMediaProps)}
                  imageProps={{
                    alt: 'Unit image',
                    quality: 90,
                    sizes: '(max-width: 768px) 100vw, 1000px',
                    lqip: ((unit.photographs as Media).image as any)?.asset
                      ?.metadata?.lqip,
                  }}
                  className="w-full h-auto object-contain"
                />
              )}
              <div className="block w-full text-md uppercase">
                <div className="p-x bg-darkergray">
                  {unit.propertyType?.typeTitle && (
                    <p className="font-medium mb-yhalf tracking-normal">
                      {unit.propertyType?.typeTitle}
                    </p>
                  )}

                  <p className="font-medium mb-yhalf">
                    {unit?.hidePrice
                      ? 'Price upon request'
                      : cryptoMode
                      ? `${unit.price?.substring(1)} USDC / ${
                          cryptoPrice[1]
                        } BTC / ${cryptoPrice[0]} ETH`
                      : unit?.price}
                  </p>

                  <p className="font-medium">{unit?.area}</p>
                </div>
                <div
                  className={classNames(
                    'inline-flex justify-between items-start gap-[32px] w-full relative p-[16px] bg-black text-card font-bold text-left uppercase'
                  )}
                >
                  <h4 className="text-card text-white">
                    {unit.propertyType?.typeTitle}
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

export default UnitSummary
