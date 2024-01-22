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

const PropertySummary: FC<CityBlockPropertyType> = ({
  image,
  longTitle,
  slug,
  index,
}) => {
  const scrollRef = useRef(null)
  const isInView = useInView(scrollRef, { once: true, amount: 0.4 })
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        key={`${slug.current}-${index}`}
        ref={scrollRef}
        custom={index}
        style={{
          transform: isInView ? 'scale(1)' : 'scale(0.99)',
          opacity: isInView ? 1 : 0,
          transition: `all 800ms ease-in-out ${index && isMobile ? 0.2 : 0}s`,
        }}
        className="flex w-full opacity-0"
      >
        <Link
          href={`/property/${slug.current}`}
          className="relative text-white"
          onClick={() =>
            sendGoogleEvent('Click home property tile', {
              tileProperty: slug.current,
            })
          }
        >
          {image && (
            <div className="block relative w-full h-0 pb-[120%] xl:pb-[115%] 2xl:pb-[110%] z-base overflow-hidden">
              <SanityMedia
                imageProps={{
                  alt: image.alt || 'Building image',
                  quality: 12,
                  priority: true,
                  sizes: '(max-width: 768px) 100vw, 50vw',
                  lqip: (image?.image as any)?.asset?.metadata?.lqip,
                }}
                className="relative w-full h-auto transform -translate-y-[5%] object-contain"
                {...(image as any)}
              />
            </div>
          )}
          {longTitle && (
            <div
              className={classNames(
                'inline-flex justify-start items-start gap-[32px] relative p-[16px] bg-black text-card font-bold leading-tight text-left uppercase'
              )}
            >
              <RichText blocks={longTitle} className="card" />

              <IconRightArrowBold
                className="relative w-[1.2em] md:w-[1em]"
                fill="white"
              />
            </div>
          )}
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

export const PropertiesBlock: FC<CitiesBlockProps> = ({
  properties,
  className,
}) => {
  return (
    <Block className={classNames(className, 'mt-0 py-[32px] bg-lightgray')}>
      <div className="px-x md:px-[calc(var(--space-menu)+12px)]">
        <h2 className="mb-[32px] md:mb-[12px] text-xl font-bold uppercase tracking-tight pr-menu md:pr-0">
          Now available in:
        </h2>
        <div className="grid md:grid-cols-2 gap-[32px] md:gap-4">
          {properties &&
            (properties as KeyedProperty[])?.map(
              ({ cardImage, longTitle, slug }, index) => (
                <PropertySummary
                  key={slug.current}
                  image={cardImage}
                  longTitle={longTitle}
                  slug={slug}
                  index={index}
                />
              )
            )}
        </div>
      </div>
    </Block>
  )
}

export default PropertiesBlock
