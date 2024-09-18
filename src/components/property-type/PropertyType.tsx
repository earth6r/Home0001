import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import { PropertyTypeElProps } from './types'
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
import Link from 'next/link'
import { SanityKeyed } from 'sanity-codegen'
import { Media } from '@studio/gen/sanity-schema'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const PropertyTypeComponent: FC<PropertyTypeElProps> = ({
  propertyType,
  className,
}) => {
  const [inquiryModal, setInquiryOpen] = useInquiryModal()
  const [cryptoMode, setCryptoMode] = useCryptoMode()
  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])

  useEffect(() => {
    const fetchCryptoPrice = async (usdPrice: any) => {
      const currentEthPrice = await convertUsdToEthPrice(usdPrice)
      const roundedEthPrice = Number(currentEthPrice.toFixed(1))
      const currentBtcPrice = await convertUsdToBtcPrice(usdPrice)
      const roundedBtcPrice = Number(currentBtcPrice.toFixed(2))
      return [roundedEthPrice, roundedBtcPrice]
    }

    if (propertyType?.price != 'Inquire' && ENV === 'production') {
      const usdPrice = propertyType?.price

      fetchCryptoPrice(usdPrice).then((cryptoPrices: number[]) => {
        setCryptoPrice(cryptoPrices)
      })
    }
  }, [propertyType])

  return (
    <div className={classNames(className)}>
      <h2 className="md:hidden text-h2 mb-ydouble px-x">
        {propertyType?.typeTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x md:px-x md:pr-0">
        <div className="col-span-1 order-2 md:order-1 xl:sticky xl:top-[var(--header-height)] xl:left-0 xl:aspect-[0.797] pr-menu md:pr-0 mt-y md:mt-0 md:mb-y xl:mb-0 md:z-modal">
          <h2 className="hidden md:inline-block text-h2 mb-y">
            {propertyType?.typeTitle}
          </h2>

          <div className="rich-text pl-x md:px-0">
            <p className="small uppercase m-0">
              {cryptoMode
                ? `${propertyType?.price?.substring(0)} / ${
                    cryptoPrice[1]
                  } BTC / ${cryptoPrice[0]} ETH`
                : `${propertyType?.price}`}
            </p>
            {propertyType?.area && (
              <p className="small uppercase m-0">{`${propertyType?.area}`}</p>
            )}
          </div>

          <div className="hidden max-w-[calc(var(--space-menu)+var(--btn-width))] md:block md:pr-menu mt-y mb-ydouble">
            <Link href="/schedule-call">
              <button
                className={classNames(
                  'w-full relative border-1 border-black hover:border-white border-solid flex flex-row justify-between items-center h-12 max-h-12 bg-white text-black hover:invert transition-all duration-200 text-button z-above p-x'
                )}
              >
                {`Schedule a call`}
                <IconSmallArrow width="16" height="10" fill="black" />
              </button>
            </Link>
          </div>

          {propertyType?.summary && propertyType?.summary.length > 0 && (
            <div className="px-x md:px-0 mt-ydouble md:mt-0">
              <p className="text-h4 mb-y md:mb-yhalf">Overview:</p>
              <RichText
                blocks={propertyType.summary}
                className="font-medium max-w-[360px]"
              />
            </div>
          )}

          {propertyType?.unitDetails && (
            <>
              <p className="hidden md:block xl:hidden text-h4 px-x md:px-0 mt-ydouble mb-yhalf">
                Details:
              </p>
              <RichText
                blocks={propertyType?.unitDetails}
                className="hidden md:block xl:hidden pr-0"
              />
            </>
          )}

          {propertyType?.inventory && (
            <SanityInventoryModal
              title="Inventory"
              inventory={propertyType.inventory}
              buttonLabel="View Inventory"
              className="hidden md:flex xl:hidden mt-y"
              unit={propertyType.title}
            />
          )}
        </div>

        <div className="order-3 md:order-2 md:col-start-1 xl:col-start-2 mt-ydouble md:mt-0 md:z-modal">
          {propertyType?.unitDetails && (
            <>
              <p className="md:hidden xl:block text-h4 px-x md:px-0 mb-y md:mb-yhalf">
                Details:
              </p>
              <RichText
                blocks={propertyType?.unitDetails}
                className="md:hidden xl:block pl-x pr-menu md:px-0"
              />
            </>
          )}

          {propertyType?.inventory && (
            <SanityInventoryModal
              title="Inventory"
              inventory={propertyType.inventory}
              buttonLabel="View Inventory"
              className="inline-block md:hidden xl:flex px-x md:px-0 mt-y"
              unit={propertyType.title}
            />
          )}

          <div className="md:hidden my-ydouble pl-x pr-menu mr-x">
            <Link href="/schedule-call">
              <button
                className={classNames(
                  'w-full relative border-1 border-black hover:border-white border-solid flex flex-row justify-between items-center h-12 max-h-12 bg-white text-black hover:invert transition-all duration-200 text-button z-above p-x'
                )}
              >
                {`Schedule a call`}
                <IconSmallArrow width="16" height="10" fill="black" />
              </button>
            </Link>
          </div>

          {propertyType?.layoutImages && (
            <>
              <p className="text-h4 px-x md:px-0 mb-y xl:mt-ydouble">Plans:</p>
              <ImageCarousel
                pagination={true}
                perView={1}
                carousel={true}
                slides={propertyType?.layoutImages}
                className="w-full px-x md:px-0 overflow-hidden"
                placement="unit layouts"
              />
            </>
          )}

          {propertyType?.moreInfo && (
            <div className="px-x md:px-0 mt-y">
              <RichText blocks={propertyType?.moreInfo} />
            </div>
          )}

          {propertyType?.secondUnitDetails &&
            propertyType.secondUnitDetails.map(({ _key, header, text }) => (
              <Accordion
                key={_key}
                header={header}
                text={text}
                location={{ property: 'property', unit: 'unit' }}
                className="px-x md:px-0 mt-y mb-ydouble border-x-0 border-t-0"
              />
            ))}
        </div>

        <div className="order-1 xl:order-3 xl:col-start-3 md:sticky md:top-[var(--header-height)] md:right-0 xl:left-0 md:aspect-[0.797]">
          {propertyType?.photographs && (
            <ImageCarousel
              pagination={true}
              perView={1}
              carousel={true}
              slides={propertyType?.photographs as SanityKeyed<Media>[]}
              className="w-full h-full px-x md:pl-0 overflow-hidden"
              placement="unit images"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const PropertyType = memo(PropertyTypeComponent)

export default PropertyType
