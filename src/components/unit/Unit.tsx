import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import { UnitElProps } from './types'
import classNames from 'classnames'
import SanityTableModal from '@components/sanity/table-modal/SanityTableModal'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { Accordion } from '@components/accordion'
import { useInquiryModal } from '@contexts/modals'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import { SanityInventoryModal } from '@components/sanity/table-modal'

export const UnitComponent: FC<UnitElProps> = ({ unit, className }) => {
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

  return (
    <div className={classNames(className, 'overflow-x-hidden')}>
      <div className="md:grid md:grid-cols-3 px-x md:pr-0">
        <h2 className="text-h2 mb-12 col-span-2 pr-menu md:pr-0">
          {unit?.title}
        </h2>
        <div className="col-start-2 md:col-start-1 md:col-span-3">
          <div className="flex flex-col relative">
            {unit?.photographs && unit?.photographs.length > 0 && (
              <ImageCarousel
                index="0"
                slides={unit?.photographs}
                carousel={true}
                className="relative w-full md:pr-x"
                placement="unit images"
              />
            )}

            <div className="text-xs font-medium">
              {unit?.propertyType && (
                <p className="mt-4 uppercase tracking-details">
                  <span>{unit?.title}</span>
                </p>
              )}
            </div>
            <div className="pr-menu md:pr-0 mb-ydouble md:mb-y text-xs font-medium">
              <p className="m-0">
                {unit?.hidePrice
                  ? 'Price upon request'
                  : cryptoMode
                  ? `${unit?.price?.substring(1)} USDC / ${
                      cryptoPrice[1]
                    } BTC / ${cryptoPrice[0]} ETH`
                  : unit?.price}
              </p>
              {unit?.area && <p className="mb-ydouble">{unit?.area}</p>}

              {unit?.summary && (
                <RichText blocks={unit?.summary} className="max-w-[500px]" />
              )}

              {unit?.factSheet?.rows && (
                <SanityTableModal
                  title="Fact Sheet"
                  table={unit.factSheet}
                  modalType="fact sheet"
                  buttonLabel="View Fact Sheet"
                  className="inline-block mt-y"
                  unit={unit.title}
                />
              )}
            </div>

            {unit?.unitDetails && unit.unitDetails.length > 0 && (
              <div>
                <p className="uppercase font-bold text-md mb-y md:mb-yhalf">
                  Details
                </p>
                <RichText
                  blocks={unit?.unitDetails}
                  className={classNames('max-w-[500px] md:pr-0')}
                />
              </div>
            )}

            {unit?.inventory && (
              <SanityInventoryModal
                title="Inventory"
                inventory={unit.inventory}
                buttonLabel="View Inventory"
                className="flex mt-y"
                unit={unit.title}
              />
            )}

            <div className="pr-menu md:pr-0 my-ydouble md:my-y md:max-w-[346px]">
              <button
                onClick={() => setInquiryOpen(true)}
                className={classNames(
                  'bg-black text-white',
                  'w-full relative border-1 border-black border-solid mb-[2px] flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-xs uppercase font-medium z-above p-4'
                )}
              >
                {`Inquire`}
                <IconSmallArrow width="16" height="10" />
              </button>
            </div>
          </div>

          {unit?.layoutImages && unit?.layoutImages.length > 0 && (
            <ImageCarousel
              index="1"
              carousel={true}
              slides={unit?.layoutImages}
              className="relative w-full md:pr-x"
              placement="unit layouts"
            />
          )}

          {unit?.moreInfo && (
            <div className="mt-10 pr-menu">
              <RichText blocks={unit?.moreInfo} />
            </div>
          )}

          {unit?.secondUnitDetails &&
            unit.secondUnitDetails.length > 0 &&
            unit.secondUnitDetails.map(({ _key, header, text }) => (
              <Accordion
                key={_key}
                header={header}
                text={text}
                location={{ property: 'property', unit: 'unit' }}
                className="mt-2 mb-8 border-x-0 border-t-0"
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export const Unit = memo(UnitComponent)

export default Unit
