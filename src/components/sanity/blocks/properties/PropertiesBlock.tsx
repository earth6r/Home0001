import { useRef, type FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import type {
  CitiesBlockProps,
  CityBlockPropertyType,
  KeyedProperty,
} from './types'
import { Block, RichText, SanityMedia } from '@components/sanity'
import Link from 'next/link'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { sendGoogleEvent } from '@lib/util'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import SCREENS from '@globals/screens'
import { Swiper, SwiperSlide } from 'swiper/react'
import { type SwiperOptions } from 'swiper/types'
import { Navigation } from 'swiper/modules'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'

const PropertySummary: FC<CityBlockPropertyType> = ({
  image,
  longTitle,
  slug,
  index,
}) => {
  const { asPath } = useRouter()
  const scrollRef = useRef(null)
  const isInView = useInView(scrollRef, { once: true, amount: 0.1 })

  return (
    <AnimatePresence>
      <motion.div
        key={`${slug.current}-${index}`}
        ref={scrollRef}
        custom={index}
        style={{
          transform: isInView ? 'scale(1)' : 'scale(0.99)',
          opacity: isInView ? 1 : 0,
          transition: `all 800ms ease-in-out ${(index + 1) * 0.2}s`,
        }}
        className="flex w-full opacity-0"
      >
        <Link
          href={`/property/${slug.current}`}
          onClick={() =>
            posthog.capture('property_click', {
              slug: slug.current,
              route: asPath,
            })
          }
          className="relative text-white md:scale-100 md:hover:scale-[0.96] transition-transform duration-500"
        >
          <button
            onClick={() =>
              sendGoogleEvent('Click home property tile', {
                tileProperty: slug.current,
              })
            }
          >
            {image && (
              <div className="block relative w-full h-0 pb-[120%] xl:pb-[115%] 2xl:pb-[110%] z-base overflow-hidden select-none">
                <SanityMedia
                  imageProps={{
                    alt: image.alt || 'Building image',
                    quality: 90,
                    priority: false,
                    sizes: '(max-width: 768px) 100vw, 50vw',
                    lqip: (image?.image as any)?.asset?.metadata?.lqip,
                  }}
                  className="relative w-full h-auto object-contain"
                  {...(image as any)}
                />
              </div>
            )}
            {longTitle && (
              <div
                className={classNames(
                  'inline-flex justify-between items-start gap-[32px] w-full relative p-[16px] bg-black text-card font-bold text-left uppercase'
                )}
              >
                <RichText
                  blocks={longTitle}
                  className="card max-w-[200px] md:max-w-none"
                />

                <IconRightArrowBold
                  className="relative w-[1em] mt-[0.1em]"
                  fill="white"
                />
              </div>
            )}
          </button>
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

export const PropertiesBlock: FC<CitiesBlockProps> = ({
  header,
  cities,
  className,
}) => {
  const slidesRef = useRef(null)
  const breakpoints: SwiperOptions['breakpoints'] = {
    0: {
      slidesPerView: 1.185,
    },
    [SCREENS.md]: {
      slidesPerView: 2,
    },
  }
  const [activeNav, setActiveNav] = useState(false)

  return (
    <Block className={classNames(className, 'mt-0 py-[32px] bg-lightgray')}>
      <div className="xl:max-w-[65%] mx-auto px-x md:px-[calc(var(--space-menu)+12px)] xl:px-0 overflow-hidden">
        <h2 className="mb-ydouble text-h2 pr-menu md:pr-0">
          {header || `Now available in:`}
        </h2>

        {cities &&
          cities.map(({ header, properties }) => (
            <div
              key={`city-${header}`}
              className="mb-ydouble last-of-type:mb-0"
              onMouseOver={() => setActiveNav(true)}
              onMouseOut={() => setActiveNav(false)}
            >
              {header && (
                <h2 className="mb-y text-h2 pr-menu md:pr-0">{header}</h2>
              )}
              <Swiper
                ref={slidesRef}
                loop={false}
                spaceBetween={16}
                breakpoints={breakpoints}
                modules={[Navigation]}
                speed={600}
                navigation={{
                  nextEl: '.swiper-next',
                  prevEl: '.swiper-prev',
                }}
                className={classNames('relative overflow-visible cursor-grab')}
              >
                {properties &&
                  (properties as KeyedProperty[])?.map(
                    ({ cardImage, longTitle, slug }, index) => (
                      <SwiperSlide key={slug.current}>
                        <PropertySummary
                          image={cardImage}
                          longTitle={longTitle}
                          slug={slug}
                          index={index}
                        />
                      </SwiperSlide>
                    )
                  )}
                <div
                  className={classNames(
                    activeNav ? 'opacity-100' : 'opacity-0',
                    'hidden md:flex md:justify-between absolute w-full h-[60px] top-1/2 transform -translate-y-1/2 transition-opacity duration-200 pointer-events-none z-above'
                  )}
                >
                  <IconRightArrowBold
                    width="80"
                    fill="black"
                    className={classNames(
                      'pr-xhalf rotate-180 swiper-prev pointer-events-auto cursor-pointer hover:scale-95'
                    )}
                  />
                  <IconRightArrowBold
                    width="80"
                    fill="black"
                    className={classNames(
                      'pr-xhalf relative swiper-next pointer-events-auto cursor-pointer hover:scale-95'
                    )}
                  />
                </div>
              </Swiper>
            </div>
          ))}
      </div>
    </Block>
  )
}

export default PropertiesBlock
