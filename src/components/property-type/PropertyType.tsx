import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { BlockContent, RichText } from '@components/sanity'
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
        navOpen ? 'right-[calc(100vw-60px)] lg:right-[33.33vw]' : 'right-0',
        'relative transition-all duration-500'
      )}
    >
      <div
        className={classNames(
          navOpen
            ? 'right-[-16px] lg:right-[calc(-66.666vw+72px)] pb-x bg-white overflow-scroll'
            : 'right-[calc(-100vw+41px)] lg:right-[calc(-100vw+41px)]',
          'flex flex-col justify-end gap-8 fixed w-[100svh] lg:w-auto h-[calc(100vw+32px)] top-0 pl-header transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left transition-all duration-500 border-none z-above'
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
              <h4 className="inline border-bottom border-2 text-side">
                {type.typeTitle}
              </h4>
            </Link>
          )
        })}

        <button
          onClick={() => setNavOpen(!navOpen)}
          className={classNames('flex items-end gap-2 ')}
        >
          <h2 className="text-side">{propertyType?.typeTitle}</h2>

          <div
            className={classNames(
              navOpen ? 'rotate-180' : '',
              'flex items-center justify-center relative w-[21px] h-[21px] bottom-0 bg-black transition-transform duration-500'
            )}
          >
            <IconChevron width="12" fill="white" className="rotate-270" />
          </div>
        </button>
      </div>

      <div
        className={classNames(
          navOpen
            ? 'opacity-0 lg:opacity-100 duration-100 delay-300'
            : 'opacity-100 duration-100',
          'grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 pr-x md:pr-0 transition-opacity'
        )}
      >
        <div className="col-span-1 pl-0 lg:px-x lg:mb-y xl:mb-0 bg-white lg:z-modal">
          {propertyType?.photographs && (
            <ImageCarousel
              pagination={false}
              perView={1}
              perViewMobile={1}
              carousel={true}
              slides={propertyType?.photographs as SanityKeyed<Media>[]}
              className="w-full h-auto lg:overflow-hidden leading-none pr-menu lg:pr-0 mb-y"
              placement="unit images"
            />
          )}
          <div className="rich-text pl-x lg:px-0 lg:mb-y">
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

          <div className="hidden lg:block relative w-full mb-y cursor-pointer z-above">
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

          <div className="hidden lg:block relative w-full cursor-pointer z-above">
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

        <div className="lg:col-span-2 md:mr-menu mt-header lg:mt-0">
          {propertyType?.summary && propertyType?.summary.length > 0 && (
            <div className="pl-x lg:pl-0 pr-menu md:pr-0">
              <p className="text-h4 mb-y lg:mb-yhalf">Overview:</p>
              <RichText
                blocks={propertyType.summary}
                className="font-medium max-w-[360px]"
              />
            </div>
          )}

          {propertyType?.unitDetails && (
            <>
              <p className="hidden lg:block xl:hidden text-h4 pl-x lg:pl-0 mt-ydouble mb-yhalf">
                Details:
              </p>
              <RichText
                blocks={propertyType?.unitDetails}
                className="hidden lg:block xl:hidden pr-menu md:pr-0"
              />
            </>
          )}

          {propertyType?.inventory && (
            <SanityInventoryModal
              title="Inventory"
              inventory={propertyType.inventory}
              buttonLabel="View Inventory"
              className="hidden lg:flex xl:hidden mt-y"
              unit={propertyType.title}
            />
          )}

          {propertyType?.unitDetails && (
            <>
              <p className="lg:hidden xl:block text-h4 px-x lg:px-0 mt-ydouble mb-y lg:mb-yhalf">
                Details:
              </p>
              <RichText
                blocks={propertyType?.unitDetails}
                className="lg:hidden xl:block pl-x lg:pl-0 pr-menu md:pr-0"
              />
            </>
          )}

          {propertyType?.inventory && (
            <SanityInventoryModal
              title="Inventory"
              inventory={propertyType.inventory}
              buttonLabel="View Inventory"
              className="inline-block lg:hidden xl:flex px-x lg:px-0 mt-y"
              unit={propertyType.title}
            />
          )}

          {propertyType?.layoutImages && (
            <div className="relative">
              <ImageCarousel
                pagination={false}
                perView={2}
                carousel={true}
                slides={propertyType?.layoutImages}
                className="pt-xdouble pr-menu md:px-0 overflow-visible"
                placement="unit layouts"
              />
              <div className="hidden md:block absolute w-xdouble h-full -left-[calc(33vw+var(--space-x-double))] top-0 bg-white z-above"></div>
            </div>
          )}

          {propertyType?.body && (
            <BlockContent
              blocks={propertyType.body}
              grid={false}
              className="pl-x pr-menu lg:px-0 mt-ydouble overflow-visible"
            />
          )}

          {propertyType?.moreInfo && (
            <div className="px-x lg:px-0 mt-y">
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
                className="px-x lg:px-0 mt-y mb-ydouble border-x-0 border-t-0"
              />
            ))}

          <div className="pl-x lg:pl-0 pt-ydouble pr-menu md:pr-0 mt-ydouble overflow-hidden">
            {(propertyType?.property as unknown as Property)
              ?.propertyTypesList && (
              <>
                <h2 className="text-h2">Other available homes:</h2>
                <PropertyTypesList
                  className="grid lg:grid-cols-2 md:w-[calc(50%+(var(--space-menu)/2))] lg:w-full gap-x animate-in mt-y"
                  propertyTypesList={(
                    propertyType?.property as unknown as Property
                  ).propertyTypesList?.filter(
                    type =>
                      (type as PropertyTypeElProps).typeTitle !==
                      propertyType?.typeTitle
                  )}
                />
              </>
            )}
          </div>

          <div className="hidden relative w-full md:max-w-btnWidth mt-header mb-y pl-x pr-menu md:pr-0 cursor-pointer z-above">
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

          <div className="hidden relative w-full md:max-w-btnWidth pl-x pr-menu md:pr-0 cursor-pointer z-above">
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
