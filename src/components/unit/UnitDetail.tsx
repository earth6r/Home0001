import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import { UnitElProps } from './types'
import classNames from 'classnames'
import SanityTableModal from '@components/sanity/table-modal/SanityTableModal'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { useInquiryModal } from '@contexts/modals'
import DetailsDropdown from './DetailsDropdown'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'

export const UnitDetailComponent: FC<UnitElProps> = ({
  unit,
  accordions,
  className,
}) => {
  const [inquiryModal, setInquiryOpen] = useInquiryModal()
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

  //@ts-ignore
  const calendarURL = `https://calendly.com/tour${unit?.property?.slug?.current}0001/scheduletour`

  return (
    <div className={classNames(className, 'pr-x md:pr-0 overflow-x-hidden')}>
      <div className="md:grid md:grid-cols-3 pr-[calc(var(--space-menu)+2px)] md:pr-0">
        <div className="md:col-start-1 col-start-2 md:col-span-3">
          <div className="flex flex-col relative mb-ydouble">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel
                index="0"
                slides={unit?.photographs}
                carousel={true}
                className="relative w-full mb-yhalf"
                placement="unit images"
              />
            )}

            <h2 className="text-xl font-bold mb-0 uppercase col-span-2">
              {unit?.title}
            </h2>
            <div className="mb-ydouble text-md font-bold mt-y">
              <p className="m-0">
                {unit?.price == 'Inquire'
                  ? 'Price upon request'
                  : cryptoMode
                  ? `${unit?.price?.substring(1)} USDC / ${
                      cryptoPrice[1]
                    } BTC / ${cryptoPrice[0]} ETH`
                  : unit?.price}
              </p>
              {unit?.area && <p className="mb-ylg">{unit?.area}</p>}

              <div className="md:grid md:grid-cols-7">
                {unit?.summary && (
                  <div className="md:col-span-3">
                    <p className="uppercase font-bold mb-y md:mb-yhalf">
                      Overview
                    </p>
                    <RichText
                      blocks={unit?.summary}
                      className="max-w-[500px]"
                    />
                  </div>
                )}

                <div className="hidden md:block md:col-start-5 md:col-span-3 md:pr-[calc(var(--space-full-menu)+9px)]">
                  <div className="mb-yhalf">
                    <button
                      onClick={() => window.open(calendarURL, '_blank')}
                      className={classNames(
                        'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-xs uppercase font-medium tracking-tight z-above p-4'
                      )}
                    >
                      {`Schedule a tour`}
                      <IconSmallArrow width="16" height="10" />
                    </button>
                  </div>

                  <div className="mb-ydouble">
                    <a href="mailto:talin@home0001.com">
                      <button
                        className={classNames(
                          'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-white text-black text-xs uppercase font-medium z-above p-4'
                        )}
                      >
                        {`Ask us a question`}
                        <IconSmallArrow width="16" height="10" fill="black" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>

              {unit?.factSheet?.rows && (
                <SanityTableModal
                  table={unit.factSheet}
                  modalType="View Fact Sheet"
                  className="inline-block text-md font-bold"
                  unit={unit.title}
                />
              )}
            </div>

            {unit?.unitDetails && (
              <>
                <p className="uppercase font-bold text-md mb-yhalf">Details</p>
                <DetailsDropdown
                  details={unit?.unitDetails}
                  dropdownOpen={true}
                />
              </>
            )}
          </div>

          {unit?.layoutImages && unit?.layoutImages.length > 0 && (
            <>
              <p className="uppercase text-md font-bold mb-y md:mb-yhalf">
                Plans
              </p>
              <ImageCarousel
                index="1"
                carousel={true}
                slides={unit?.layoutImages}
                className="w-full mb-ylg"
                placement="unit layouts"
              />
            </>
          )}

          <div className="md:hidden mb-yhalf md:max-w-[346px]">
            <button
              className={classNames(
                'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-xs uppercase font-medium tracking-tight z-above p-4'
              )}
              onClick={() => window.open(calendarURL, '_blank')}
            >
              {`Schedule a tour`}
              <IconSmallArrow width="16" height="10" />
            </button>
          </div>

          <div className="md:hidden mb-ydouble md:max-w-[346px]">
            <a href="mailto:talin@home0001.com">
              <button
                className={classNames(
                  'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-white text-black text-xs uppercase font-medium z-above p-4'
                )}
              >
                {`Ask us a question`}
                <IconSmallArrow width="16" height="10" fill="black" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const UnitDetail = memo(UnitDetailComponent)

export default UnitDetail
