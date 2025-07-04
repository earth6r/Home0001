import { type FC, memo, useEffect, useState } from 'react'
import { ImageCarousel } from '@components/carousel'
import { BlockContent, RichText } from '@components/sanity'
import { PropertyTypeElProps } from './types'
import classNames from 'classnames'
import { IconSmallArrow } from '@components/icons/IconSmallArrow'
import { useCryptoMode } from '@contexts/header'
import {
  convertUsdToEthPrice,
  convertUsdToBtcPrice,
} from '@lib/util/crypto-pricing'
import { SanityInventoryModal } from '@components/sanity/table-modal'
import Link from 'next/link'
import { SanityKeyed } from 'sanity-codegen'
import { Media, Property } from '@studio/gen/sanity-schema'
import { sendGoogleEvent } from '@lib/util'
import PropertyTypesList from './PropertyTypesList'
import IconChevron from '@components/icons/IconChevron'
import { PropertyContentProps } from '@components/property/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { IconWaitlist } from '@components/icons'
import { ArrowBtn } from '@components/btns'

const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const PropertyTypeComponent: FC<PropertyTypeElProps> = ({
  propertyType,
  className,
}) => {
  const [cryptoMode, setCryptoMode] = useCryptoMode()
  const [cryptoPrice, setCryptoPrice] = useState<number[]>([])
  const [navOpen, setNavOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const fade = useTransform(scrollYProgress, [0.58, 0.6], [1, 0])

  const propertyTypesList = (
    propertyType?.property as unknown as Property
  ).propertyTypesList?.filter(
    type => (type as PropertyTypeElProps).typeTitle !== propertyType?.typeTitle
  )

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
      <motion.div
        style={{ opacity: fade }}
        className={classNames(
          navOpen
            ? 'right-[-16px] lg:right-[calc(-66.666vw+72px)] pb-x bg-white overflow-scroll'
            : 'right-[calc(-100vw+44px)] lg:right-[calc(-100vw+44px)]',
          'flex flex-col justify-end gap-8 fixed w-[100svh] h-[calc(100vw+32px)] top-0 pl-header transform translate-x-[calc(100%+16px)] rotate-90 origin-top-left transition-all duration-500 border-none z-above'
        )}
      >
        {propertyTypesList?.map((type: PropertyTypeElProps | any, index) => {
          if (type.typeTitle === propertyType?.typeTitle) return
          return (
            <Link
              onClick={() => setNavOpen(!navOpen)}
              href={`/property-type/${type.slug?.current}`}
              key={`${index}-${type.typeTitle}`}
            >
              <h4 className="inline border-bottom border-[6px] text-side">
                {type.typeTitle}
              </h4>
            </Link>
          )
        })}

        {propertyTypesList && propertyTypesList.length > 0 ? (
          <button
            onClick={() => setNavOpen(!navOpen)}
            className={classNames('flex items-end gap-2 ')}
          >
            <h2 className="text-side">{propertyType?.typeTitle}</h2>

            <div
              className={classNames(
                navOpen ? 'rotate-180' : '',
                'flex items-center justify-center relative w-[21px] h-[21px] bottom-[3px] bg-black transition-transform duration-500'
              )}
            >
              <IconChevron width="12" fill="white" className="rotate-270" />
            </div>
          </button>
        ) : (
          <div className={classNames('flex items-end gap-2 ')}>
            <h2 className="text-side">{propertyType?.typeTitle}</h2>
          </div>
        )}
      </motion.div>

      <div
        className={classNames(
          navOpen
            ? 'opacity-0 lg:opacity-100 duration-100 delay-300'
            : 'opacity-100 duration-100',
          'grid grid-cols-1 lg:grid-cols-3 pr-x md:pr-0 transition-opacity'
        )}
      >
        <div className="col-span-1 pl-0 lg:px-x lg:mb-yd xl:mb-0 bg-white lg:z-modal">
          {propertyType?.photographs && (
            <ImageCarousel
              pagination={false}
              perView={1}
              perViewMobile={1}
              carousel={true}
              slides={propertyType?.photographs as SanityKeyed<Media>[]}
              className="w-full h-auto lg:overflow-hidden leading-none pr-menu lg:pr-0 mb-ydouble lg:mb-y"
              placement="unit images"
            />
          )}
          <div className="rich-text pl-x lg:px-0">
            <ul className="!mb-y dash">
              <li>{`${propertyType?.typeTitle}`}</li>
              <li>{`0001 ${
                (propertyType?.property as unknown as Property).title
              }`}</li>
              {propertyType?.area && <li>{`${propertyType?.area}`}</li>}
              <li>
                {cryptoMode
                  ? `${propertyType?.price?.substring(0)} / ${
                      cryptoPrice[1]
                    } BTC / ${cryptoPrice[0]} ETH`
                  : `${propertyType?.price}`}
              </li>
            </ul>
          </div>

          <div className="hidden lg:block relative w-full mb-y cursor-pointer z-above">
            <Link href="/apply">
              <IconWaitlist className="w-[77px]" />
            </Link>
          </div>

          <div className="hidden lg:block relative w-full cursor-pointer z-above">
            <Link href="/how-it-works">
              <ArrowBtn
                text={`How it works`}
                className={classNames(
                  'border-black hover:border-white bg-black text-white hover:invert transition-all duration-200'
                )}
              />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 md:mr-menu lg:mr-menu mt-y lg:mt-0">
          {propertyType?.moreInfo && (
            <div className="pl-x lg:pl-0 pr-menu md:pr-0 mb-ytrio">
              <RichText blocks={propertyType?.moreInfo} />
            </div>
          )}

          {propertyType?.summary && propertyType?.summary.length > 0 && (
            <div className="pl-x lg:pl-0 pr-menu md:pr-0">
              <p className="text-h4 mb-y lg:mb-yhalf">Overview:</p>
              <RichText blocks={propertyType.summary} className="font-medium" />
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
              <p className="lg:hidden xl:block text-h4 px-x lg:px-0 mt-ytrio mb-y lg:mb-yhalf">
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
              className="pl-x lg:pl-0 mt-ydouble overflow-visible"
            />
          )}

          {propertyType &&
            (propertyType.property as PropertyContentProps)?.propertyImages && (
              <div className="relative">
                <ImageCarousel
                  pagination={false}
                  perView={2}
                  carousel={true}
                  slides={
                    (propertyType.property as PropertyContentProps)
                      .propertyImages
                  }
                  className="pt-ydouble pr-menu md:px-0 overflow-visible"
                  placement="unit layouts"
                />
              </div>
            )}
        </div>

        <div className="md:col-span-1 lg:col-span-3 pl-x pr-menu md:pr-0 lg:pr-x mt-yquad overflow-hidden">
          {propertyTypesList && propertyTypesList.length > 0 && (
            <>
              <h2 className="text-h2">Other available homes:</h2>
              <PropertyTypesList
                className="grid lg:grid-cols-4 md:w-1/2 lg:w-full gap-x animate-in mt-y"
                propertyTypesList={propertyTypesList}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export const PropertyType = memo(PropertyTypeComponent)

export default PropertyType
