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
import { SanityMedia, SanityMediaProps } from '@components/sanity'
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

    if (unit?.price != 'Inquire') {
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
          <div className="flex flex-col relative overflow-x-hidden">
            {unit?.photographs && (
              <SanityMedia
                {...(unit.photographs as SanityMediaProps)}
                imageProps={{
                  alt: 'Unit image',
                  quality: 90,
                  sizes: '(max-width: 768px) 100vw, 1000px',
                  lqip: (unit.photographs.image as any)?.asset?.metadata?.lqip,
                }}
                className="w-full h-auto object-contain"
              />
            )}
            <div className="block w-full py-x ml-x mr-y md:mr-0 text-md uppercase">
              <div className="mb-y">
                {unit.title && (
                  <p className="text-h4 mb-y tracking-normal">{unit.title}</p>
                )}

                <p className="font-medium mb-y">
                  {unit?.propertyType?.typeTitle}
                </p>
                <p className="font-medium mb-y">
                  {unit?.hidePrice
                    ? 'Price upon request'
                    : cryptoMode
                    ? `${unit.price?.substring(1)} USDC / ${
                        cryptoPrice[1]
                      } BTC / ${cryptoPrice[0]} ETH`
                    : unit?.price}
                </p>
                <p className="font-medium mb-y">{unit?.area}</p>
              </div>

              {unit.slug && (
                <Link
                  href={`/unit/${unit.slug?.current}`}
                  onClick={() => {
                    updateUnit(unit, unit.title)
                  }}
                >
                  <button
                    className={classNames(
                      `mt-2 relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center w-full h-12 max-h-12 bg-black text-white font-medium text-xs z-above p-4 hover:invert hover:border-white transition-all`
                    )}
                    onClick={() => {
                      updateUnit(unit, unit.title)
                    }}
                  >
                    <span className="mb-0 py-2 text-left uppercase">
                      {`Explore`}
                    </span>
                    <IconSmallArrow width="16" height="10" fill="white" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default UnitSummary
