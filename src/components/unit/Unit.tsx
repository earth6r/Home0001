import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText, SanityLink } from '@components/sanity'
import { UnitElProps } from './types'
import classNames from 'classnames'
import SanityTableModal from '@components/sanity/table-modal/SanityTableModal'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import { SanityInventoryModal } from '@components/sanity/table-modal'
import Link from 'next/link'
import { SanityKeyed } from 'sanity-codegen'
import { Media } from '@studio/gen/sanity-schema'
import { MapDialog } from '@components/map'
import { SanityLinkType } from '@studio/lib'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const UnitComponent: FC<UnitElProps> = ({ unit, className }) => {
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

    if (unit?.price != 'Inquire' && ENV === 'production') {
      const usdPrice = unit?.price

      fetchCryptoPrice(usdPrice).then((cryptoPrices: number[]) => {
        setCryptoPrice(cryptoPrices)
      })
    }
  }, [unit])

  return (
    <div className={classNames(className)}>
      <h2 className="md:hidden text-h2 px-x mb-ydouble md:max-w-[50%] xl:max-w-[35%]">
        {unit?.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-10 md:gap-x md:px-x md:pr-0">
        <div className="col-span-1 xl:col-span-3 order-2 md:order-1 flex flex-col gap-y xl:sticky xl:top-[var(--header-height)] xl:left-0 xl:aspect-[0.797] pl-x md:pl-0 pr-x md:pr-0 mt-y md:mt-0 md:mb-y xl:mb-0 md:z-modal">
          <h2 className="hidden md:block text-h2 mb-y">{unit?.title}</h2>
          {unit?.address && <RichText blocks={unit?.address} />}

          {unit?.coordinates && (
            <MapDialog
              text="View Map"
              coordinates={unit?.coordinates}
              className=" text-md font-bold mb-y"
            />
          )}

          <div className="rich-text">
            {unit?.bedrooms && (
              <p className="font-sansText uppercase m-0">{`Bedrooms: ${unit?.bedrooms}`}</p>
            )}
            {unit?.bathrooms && (
              <p className="font-sansText uppercase m-0">{`Bathrooms: ${unit?.bathrooms}`}</p>
            )}
            {unit?.area && (
              <p className="font-sansText uppercase m-0">{`Size: ${unit?.area}`}</p>
            )}
            <p className="font-sansText uppercase m-0">
              {unit?.hidePrice
                ? 'Price upon request'
                : cryptoMode
                ? `${unit?.price?.substring(1)} / ${cryptoPrice[1]} BTC / ${
                    cryptoPrice[0]
                  } ETH`
                : `${unit?.price}`}
            </p>
          </div>

          {unit?.factSheet?.rows && (
            <SanityTableModal
              title="Fact Sheet"
              table={unit.factSheet}
              modalType="fact sheet"
              buttonLabel="View Fact Sheet"
              className="flex my-y"
              unit={unit.title}
            />
          )}

          <div className="flex flex-col gap-y mb-y">
            {unit?.ctas &&
              unit?.ctas.map((cta, index) => (
                <div
                  key={`${cta.link}-${index}`}
                  className="flex w-full relative"
                >
                  <SanityLink
                    {...(cta.link as SanityLinkType)}
                    className={classNames(
                      cta.color === 'Black'
                        ? 'bg-black text-white'
                        : 'bg-white',
                      'w-[var(--btn-width)] border-1 border-black hover:border-white border-solid flex flex-row justify-between items-center hover:invert text-button z-above px-4 py-3.5'
                    )}
                  >
                    <span className="text-left uppercase leading-none">
                      {cta.text || 'Learn more'}
                    </span>
                    <IconSmallArrow
                      width="16"
                      height="10"
                      fill={cta.color === 'Black' ? 'white' : 'black'}
                    />
                  </SanityLink>
                </div>
              ))}
          </div>
        </div>

        <div className="order-2 md:order-2 xl:order-1 md:col-start-1 xl:col-start-4 xl:col-span-3 flex flex-col gap-y mt-y md:mt-0 md:z-modal">
          {unit?.summary && unit?.summary.length > 0 && (
            <div className="px-x md:px-0">
              <RichText
                blocks={unit.summary}
                className="font-medium max-w-[500px]"
              />
            </div>
          )}

          {unit?.inventory && unit.inventory.items && (
            <SanityInventoryModal
              title="Inventory"
              inventory={unit.inventory}
              buttonLabel="View Inventory"
              className="flex px-x my-y md:px-0"
              unit={unit.title}
            />
          )}

          {unit?.unitDetails && (
            <RichText
              blocks={unit?.unitDetails}
              className="hidden md:block xl:hidden pr-0"
            />
          )}

          {unit?.unitDetails && (
            <RichText
              blocks={unit?.unitDetails}
              className="md:hidden xl:block pl-x pr-menu md:px-0"
            />
          )}

          {unit?.layoutImages && (
            <ImageCarousel
              pagination={true}
              perView={1}
              carousel={true}
              slides={unit?.layoutImages}
              className="w-full px-x md:px-0 overflow-hidden"
              placement="unit layouts"
            />
          )}
        </div>

        <div className="order-1 xl:col-start-7 xl:col-span-4 self-start md:sticky md:top-[var(--header-height)] md:right-0 xl:left-0">
          {unit?.photographs && (
            <ImageCarousel
              pagination={true}
              perView={1}
              carousel={true}
              slides={unit?.photographs as SanityKeyed<Media>[]}
              className="w-full h-full px-x md:pl-0 overflow-hidden"
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
