import { type FC } from 'react'
import classNames from 'classnames'
import type {
  CitiesBlockProps,
  CityBlockPropertyType,
  KeyedProperty,
} from './types'
import { Block, RichText, SanityMedia } from '@components/sanity'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const PropertySummary: FC<CityBlockPropertyType> = ({
  image,
  longTitle,
  slug,
  index,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={`${slug.current}-${index}`}
        custom={index}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: index ? index * 0.2 : 0 }}
        viewport={{ amount: 'some', once: true }}
        className="flex w-full opacity-0"
      >
        <Link
          href={`/property/${slug.current}`}
          className="w-full mx-x md:mx-0 card-shadow"
        >
          {image && (
            <div className="block relative w-full h-0 pb-[100%] lg:pb-[110%] xl:max-h-[635px] pt-x px-x mb-x md:mb-xhalf z-base overflow-hidden">
              <SanityMedia
                imageProps={{
                  alt: image.alt || 'Building image',
                  quality: 12,
                  priority: true,
                  sizes: '(max-width: 768px) 100vw, 50vw',
                  lqip: (image?.image as any)?.asset?.metadata?.lqip,
                }}
                className="w-full h-auto object-contain"
                {...(image as any)}
              />
            </div>
          )}
          {longTitle && (
            <div
              className={classNames(
                'w-full px-x pb-x text-card font-bold leading-tight text-left uppercase'
              )}
            >
              <RichText blocks={longTitle} className="card underline" />
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
    <Block className={classNames(className, 'md:mb-page', '-ml-[2px]')}>
      <div>
        <div className="grid md:grid-cols-2 gap-14 xl:gap-[150px] md:px-menu">
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
