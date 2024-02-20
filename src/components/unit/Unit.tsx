import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText, SanityLink } from '@components/sanity'
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
    <div className={classNames(className)}>
      <h2 className="md:hidden text-h2 mb-ydouble px-x">{unit?.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x pl-x md:px-x md:pr-0">
        <div className="col-span-1 order-2 md:order-1 xl:sticky xl:top-[var(--header-height)] xl:left-0 xl:aspect-[4/5.1] pr-menu md:pr-0 mt-y md:mt-0 md:mb-y xl:mb-0">
          <h2 className="hidden md:inline-block text-h2 mb-y">{unit?.title}</h2>

          <div className="rich-text">
            {unit?.propertyType && (
              <p className="small uppercase">{unit?.propertyType?.typeTitle}</p>
            )}

            <p className="small uppercase m-0">
              {unit?.hidePrice
                ? 'Price upon request'
                : cryptoMode
                ? `Price: ${unit?.price?.substring(1)} USDC / ${
                    cryptoPrice[1]
                  } BTC / ${cryptoPrice[0]} ETH`
                : `Price: ${unit?.price}`}
            </p>
            {unit?.area && (
              <p className="small uppercase m-0">{`Size: ${unit?.area}`}</p>
            )}
          </div>

          <div className="hidden max-w-[calc(var(--space-menu)+var(--btn-width))] md:block md:pr-menu mt-y mb-ydouble">
            <button
              onClick={() => setInquiryOpen(true)}
              className={classNames(
                'bg-black text-white',
                'w-full relative border-1 border-black border-solid mb-y flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-button z-above p-x'
              )}
            >
              {`Join the waitlist`}
              <IconSmallArrow width="16" height="10" />
            </button>

            {unit?.calendarLink && (
              <SanityLink externalLink={unit.calendarLink}>
                <button
                  className={classNames(
                    'w-full relative border-1 border-black border-solid flex flex-row justify-between items-center h-12 max-h-12 bg-white text-black text-button z-above p-x'
                  )}
                >
                  {`Request a tour`}
                  <IconSmallArrow width="16" height="10" fill="black" />
                </button>
              </SanityLink>
            )}
          </div>

          {unit?.summary && unit.summary.length > 0 && (
            <div className="mt-ydouble md:mt-0">
              <p className="text-h4 mb-y md:mb-yhalf">Overview</p>
              <RichText
                blocks={unit?.summary}
                className="font-medium max-w-[500px]"
              />
            </div>
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

          {unit?.unitDetails && (
            <>
              <p className="hidden md:block xl:hidden text-h4 mt-ydouble mb-yhalf">
                Details
              </p>
              <RichText
                blocks={unit?.unitDetails}
                className="hidden md:block xl:hidden pr-menu md:pr-0"
              />
            </>
          )}

          {unit?.inventory && (
            <SanityInventoryModal
              title="Inventory"
              inventory={unit.inventory}
              buttonLabel="View Inventory"
              className="hidden md:flex xl:hidden mt-y"
              unit={unit.title}
            />
          )}
        </div>

        <div className="order-3 md:order-2 md:col-start-1 xl:col-start-2 mt-ydouble md:mt-0">
          {unit?.unitDetails && (
            <>
              <p className="md:hidden xl:block text-h4 mb-y md:mb-yhalf">
                Details
              </p>
              <RichText
                blocks={unit?.unitDetails}
                className="md:hidden xl:block pr-menu md:pr-0"
              />
            </>
          )}

          {unit?.inventory && (
            <SanityInventoryModal
              title="Inventory"
              inventory={unit.inventory}
              buttonLabel="View Inventory"
              className="inline-block md:hidden xl:flex mt-y"
              unit={unit.title}
            />
          )}

          <div className="md:hidden md:pr-menu my-ydouble pr-menu">
            <button
              onClick={() => setInquiryOpen(true)}
              className={classNames(
                'bg-black text-white',
                'w-full relative border-1 border-black border-solid mb-y flex flex-row justify-between items-center h-12 max-h-12 bg-black text-white text-button z-above p-x'
              )}
            >
              {`Join the waitlist`}
              <IconSmallArrow width="16" height="10" />
            </button>

            {unit?.calendarLink && (
              <SanityLink externalLink={unit.calendarLink}>
                <button
                  className={classNames(
                    'w-full relative border-1 border-black border-solid flex flex-row justify-between items-center h-12 max-h-12 bg-white text-black text-button z-above p-x'
                  )}
                >
                  {`Request a tour`}
                  <IconSmallArrow width="16" height="10" fill="black" />
                </button>
              </SanityLink>
            )}
          </div>

          {unit?.layoutImages && (
            <>
              <p className="text-h4 mb-y xl:mt-ydouble">Plans:</p>
              <ImageCarousel
                pagination={true}
                perView={1}
                carousel={false}
                slides={unit?.layoutImages}
                className="w-full pr-x md:pr-0 overflow-hidden"
                placement="unit layouts"
              />
            </>
          )}

          {unit?.moreInfo && (
            <div className="mt-y">
              <RichText blocks={unit?.moreInfo} />
            </div>
          )}

          {unit?.secondUnitDetails &&
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

        <div className="order-1 xl:order-3 xl:col-start-3 md:sticky md:top-[var(--header-height)] md:right-0 xl:left-0 md:aspect-[4/5.1]">
          {unit?.photographs && (
            <ImageCarousel
              pagination={true}
              perView={1}
              carousel={true}
              slides={unit?.photographs}
              className="w-full h-full pr-x overflow-hidden"
              placement="unit images"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const Unit = memo(UnitComponent)

export default Unit
