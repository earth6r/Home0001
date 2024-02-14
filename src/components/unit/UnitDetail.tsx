import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText, SanityLink } from '@components/sanity'
import { UnitElProps } from './types'
import classNames from 'classnames'
import SanityTableModal from '@components/sanity/table-modal/SanityTableModal'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { useInquiryModal } from '@contexts/modals'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import { KeyedProperty } from '@components/sanity/blocks/properties/types'
import { SanityInventoryModal } from '@components/sanity/table-modal'

export const UnitDetailComponent: FC<UnitElProps> = ({
  unit,
  accordions,
  className,
}) => {
  const [inquiryModal, setInquiryOpen] = useInquiryModal()
  const [cryptoMode, setCryptoMode] = useCryptoMode()
  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])

  const keyedProperty = unit?.property as KeyedProperty

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

  const lesCalendarURL = `https://www.home0001.com/les-tour`
  const epCalendarURL = `https://www.home0001.com/echo-park-tour`

  return (
    <div className={classNames(className, 'pr-x md:pr-0 overflow-x-hidden')}>
      <div className="md:grid md:grid-cols-3">
        <div className="md:col-start-1 col-start-2 md:col-span-3">
          <h2 className="text-xl font-bold tracking-tight mb-y uppercase col-span-2 pr-[calc(var(--space-menu)+2px)] md:pr-0">
            {unit?.title}
          </h2>

          <div className="flex flex-col relative mb-[40px]">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel
                index="0"
                slides={unit?.photographs}
                carousel={true}
                className="relative w-full mb-[16px] md:pr-x"
                placement="unit images"
              />
            )}
            <div className="mb-[40px] pr-[calc(var(--space-menu)+2px)] md:pr-0">
              <p className="m-0 text-base font-medium tracking-tight">
                {cryptoMode
                  ? `${unit?.price?.substring(1)} USDC / ${
                      cryptoPrice[1]
                    } BTC / ${cryptoPrice[0]} ETH`
                  : unit?.price}
              </p>
              {unit?.area && (
                <p className="mb-ylg text-base font-medium tracking-tight">
                  {unit?.area}
                </p>
              )}

              <div className="md:grid md:grid-cols-10">
                {unit?.summary && (
                  <div className="md:col-span-6">
                    <p className="uppercase text-md font-bold mb-[16px]">
                      Overview
                    </p>
                    <RichText
                      blocks={unit?.summary}
                      className="max-w-[500px]"
                    />
                  </div>
                )}

                <div className="hidden md:block col-start-8 col-span-3 w-full md:pr-x">
                  {unit?.calendarLink && (
                    <div className="mb-[12px]">
                      <SanityLink externalLink={unit.calendarLink}>
                        <button
                          className={classNames(
                            'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-xs uppercase font-medium tracking-tight z-above p-4'
                          )}
                        >
                          {`Schedule a tour`}
                          <IconSmallArrow width="16" height="10" />
                        </button>
                      </SanityLink>
                    </div>
                  )}

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
                  title="Fact Sheet"
                  table={unit.factSheet}
                  modalType="fact sheet"
                  buttonLabel="View Fact Sheet"
                  className="inline-block mt-[16px]"
                  unit={unit.title}
                />
              )}
            </div>

            {unit?.unitDetails && (
              <div className="pr-[calc(var(--space-menu)+2px)] md:pr-0">
                <p className="uppercase font-bold text-md mb-yhalf ">Details</p>
                <RichText
                  blocks={unit?.unitDetails}
                  className={classNames('max-w-[500px] md:pr-0')}
                />
              </div>
            )}

            {unit?.dossierInventory && (
              <SanityInventoryModal
                title="Inventory"
                inventory={unit.dossierInventory}
                buttonLabel="View Inventory"
                className="flex mt-[16px]"
                unit={unit.title}
              />
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
                className="w-full md:pr-x"
                placement="unit layouts"
              />
            </>
          )}

          <div className="md:hidden mt-[40px] mb-yhalf w-[var(--btn-width)] md:max-w-[346px]">
            {unit?.calendarLink && (
              <SanityLink externalLink={unit.calendarLink}>
                <button
                  className={classNames(
                    'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-xs uppercase font-medium tracking-tight z-above p-4'
                  )}
                >
                  {`Schedule a tour`}
                  <IconSmallArrow width="16" height="10" />
                </button>
              </SanityLink>
            )}
          </div>

          <div className="md:hidden w-[var(--btn-width)] md:max-w-[346px]">
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
