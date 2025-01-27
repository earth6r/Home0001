import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { RichText } from '@components/sanity'
import { PropertyTypeElProps } from './types'
import classNames from 'classnames'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { Accordion } from '@components/accordion'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import { SanityInventoryModal } from '@components/sanity/table-modal'
import Link from 'next/link'
import { SanityKeyed } from 'sanity-codegen'
import { Media, Property } from '@studio/gen/sanity-schema'
import { useWaitlisModal } from '@contexts/modals'
import { sendGoogleEvent } from '@lib/util'
import PropertyTypesList from './PropertyTypesList'
import IconChevron from '@components/icons/IconChevron'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const PropertyTypeComponent: FC<PropertyTypeElProps> = ({
  propertyType,
  className,
}) => {
  const [cryptoMode, setCryptoMode] = useCryptoMode()
  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])
  const [waitlistOpen, setWaitlistOpen] = useWaitlisModal()
  const [navOpen, setNavOpen] = useState(false)

  const openWaitlist = () => {
    setWaitlistOpen(true)
    const options = { location: window.location.pathname }
    sendGoogleEvent('opened waitlist modal', options)
  }

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpen])

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
    <div
      className={classNames(
        className,
        navOpen ? 'right-[calc(100vw-60px)] md:right-[33.33vw]' : 'right-0',
        'relative transition-all duration-500'
      )}
    >
      <div
        className={classNames(
          'flex flex-col justify-end gap-2 absolute w-[100svh] md:w-auto h-[100vw] right-[calc(-100vw+60px)] md:right-[calc(-100vw+75px)] transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left bg-white border-none z-above'
        )}
      >
        {(
          propertyType?.property as unknown as Property
        )?.propertyTypesList?.map((type: PropertyTypeElProps | any, index) => {
          if (type.typeTitle === propertyType?.typeTitle) return
          return (
            <Link
              onClick={() => setNavOpen(!navOpen)}
              href={`/property-type/${type.slug?.current}`}
              key={`${index}-${type.typeTitle}`}
            >
              <h2 className="text-h2">{type.typeTitle}</h2>
            </Link>
          )
        })}

        <button
          onClick={() => setNavOpen(!navOpen)}
          className="flex items-end gap-2"
        >
          <h2 className="text-h2">{propertyType?.typeTitle}</h2>

          <div className="flex items-center justify-center relative w-[21px] h-[21px] bottom-1 bg-black">
            <IconChevron width="12" fill="white" className="rotate-90" />
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 md:gap-x pr-x md:px-x md:pr-0">
        <div className="col-span-1 pr-menu md:pr-0 md:mb-y xl:mb-0 md:z-modal">
          {propertyType?.photographs && (
            <ImageCarousel
              pagination={true}
              perView={1}
              carousel={true}
              slides={propertyType?.photographs as SanityKeyed<Media>[]}
              className="w-full h-auto pl-x md:pl-0 overflow-hidden"
              placement="unit images"
            />
          )}
          <div className="rich-text pl-x md:px-0 md:mb-y">
            <p className="m-1">{`${propertyType?.typeTitle}`}</p>
            <p className="m-1">{`0001 ${
              (propertyType?.property as unknown as Property).title
            }`}</p>
            {propertyType?.area && (
              <p className="m-1">{`${propertyType?.area}`}</p>
            )}
            <p className="m-1">
              {cryptoMode
                ? `${propertyType?.price?.substring(0)} / ${
                    cryptoPrice[1]
                  } BTC / ${cryptoPrice[0]} ETH`
                : `${propertyType?.price}`}
            </p>
          </div>

          <div className="hidden md:block relative w-full mb-y cursor-pointer z-above">
            <button
              onClick={openWaitlist}
              className={classNames(
                'w-full relative flex flex-row justify-between items-center h-12 max-h-12 p-x border-black hover:border-white bg-black text-white hover:invert transition-all duration-200 text-button'
              )}
            >
              {`Apply`}
              <IconSmallArrow width="16" height="10" fill="white" />
            </button>
          </div>

          <div className="hidden md:block relative w-full cursor-pointer z-above">
            <Link href="/how-it-works">
              <button
                className={classNames(
                  'w-full relative flex flex-row justify-between items-center h-12 max-h-12 p-x border-black hover:border-white bg-black text-white hover:invert transition-all duration-200 text-button'
                )}
              >
                {`How it works`}
                <IconSmallArrow width="16" height="10" fill="white" />
              </button>
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 mr-menu mt-header md:mt-0 md:z-modal">
          {propertyType?.summary && propertyType?.summary.length > 0 && (
            <div className="pl-x md:pl-0">
              <p className="text-h4 mb-y md:mb-yhalf">Overview:</p>
              <RichText
                blocks={propertyType.summary}
                className="font-medium max-w-[360px]"
              />
            </div>
          )}

          {propertyType?.unitDetails && (
            <>
              <p className="hidden md:block xl:hidden text-h4 pl-x md:pl-0 mt-ydouble mb-yhalf">
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

          {propertyType?.unitDetails && (
            <>
              <p className="md:hidden xl:block text-h4 px-x md:px-0 mt-ydouble mb-y md:mb-yhalf">
                Details:
              </p>
              <RichText
                blocks={propertyType?.unitDetails}
                className="md:hidden xl:block pl-x md:pl-0"
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

          {propertyType?.layoutImages && (
            <>
              <p className="text-h4 px-x md:px-0 mt-ydouble mb-y xl:mt-ydouble">
                Plans:
              </p>
              <ImageCarousel
                pagination={true}
                perView={1}
                carousel={true}
                slides={propertyType?.layoutImages}
                className="w-full px-x md:px-0 overflow-visible md:overflow-hidden"
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

          <div className="pl-x md:pl-0 pt-ydouble mt-ydouble overflow-hidden">
            {(propertyType?.property as unknown as Property)
              ?.propertyTypesList && (
              <>
                <h2 className="text-h2">Apartments</h2>
                <PropertyTypesList
                  className="animate-in flex flex-col mt-ydouble"
                  propertyTypesList={
                    (propertyType?.property as unknown as Property)
                      .propertyTypesList
                  }
                />
              </>
            )}
          </div>

          <div className="md:hidden relative w-full mt-header mb-y pl-x cursor-pointer z-above">
            <button
              onClick={openWaitlist}
              className={classNames(
                'w-full relative flex flex-row justify-between items-center h-12 max-h-12 p-x border-black hover:border-white bg-black text-white hover:invert transition-all duration-200 text-button'
              )}
            >
              {`Apply`}
              <IconSmallArrow width="16" height="10" fill="white" />
            </button>
          </div>

          <div className="md:hidden relative w-full pl-x cursor-pointer z-above">
            <Link href="/how-it-works">
              <button
                className={classNames(
                  'w-full relative flex flex-row justify-between items-center h-12 max-h-12 p-x border-black hover:border-white bg-black text-white hover:invert transition-all duration-200 text-button'
                )}
              >
                {`How it works`}
                <IconSmallArrow width="16" height="10" fill="white" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const PropertyType = memo(PropertyTypeComponent)

export default PropertyType
