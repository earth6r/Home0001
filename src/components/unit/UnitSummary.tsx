import { type FC, useContext, useEffect, useState } from 'react'
import { HomeContext } from '@contexts/home'
import classNames from 'classnames'
import { KeyedUnitProps, UnitListProps } from './types'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import { sendGoogleEvent } from '@lib/util'
import Link from 'next/link'
import { ImageCarousel } from '@components/carousel'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
export const UnitSummary: FC<UnitListProps> = ({ unit, border, className }) => {
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
  const summaryPhotos = unit?.photographs?.slice(0, 4)

  return (
    <li className={className}>
      <div
        className={classNames(
          border ? 'pt-ylg md:pt-page border-top' : '',
          'w-auto mx-x md:ml-0'
        )}
      ></div>
      <div
        className={classNames(
          unit.available ? '' : 'bg-white shadow-none opacity-30',
          `w-auto flex-col pl-4 md:pl-0`
        )}
      >
        <div className="flex flex-col gap-1 mb-4 pr-4 md:pr-0">
          <p className="col-start-1 text-left text-lg font-bold tracking-tight uppercase">
            {unit.title && <span>{unit.title}</span>}
          </p>
        </div>
        <div className="z-above">
          <div className="flex flex-col relative mt-4 overflow-x-hidden">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel
                index="0"
                slides={unit?.photographs}
                carousel={true}
                className="mb-3 pr-x"
                placement="unit summary images"
              />
            )}
            <div className="block w-auto max-w-[467px] bg-darkgray py-x pl-x mr-4 md:mr-0 pr-menu">
              <div className="mb-2 text-left rich-text">
                <p className="small md:col-start-1 col-start-2 md:col-span-1 text-left">
                  {unit?.price == 'Inquire'
                    ? 'Price upon request'
                    : cryptoMode
                    ? `${unit.price?.substring(1)} USDC / ${
                        cryptoPrice[1]
                      } BTC / ${cryptoPrice[0]} ETH`
                    : unit?.price}
                </p>
                {unit.area && (
                  <p className="small mb-5">
                    {unit.area}
                    <br />
                    Fully furnished & equipped.
                    <br />
                    Access to homes in other locations.
                  </p>
                )}
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
                      `relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center w-full h-12 max-h-12 hover:invert bg-white font-medium text-xs z-above p-4`
                    )}
                    onClick={() => {
                      updateUnit(unit, unit.title)
                    }}
                  >
                    <span className="mb-0 py-2 text-left uppercase">
                      {`Explore ${unit?.title}`}
                    </span>
                    <IconSmallArrow width="16" height="10" className="invert" />
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
