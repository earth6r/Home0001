import { type FC } from 'react'
import classNames from 'classnames'
import type {
  CitiesBlockProps,
  CityBlockPropertyType,
  KeyedProperty,
} from './types'
import { Block, SanityMedia } from '@components/sanity'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
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
          className="w-full mx-x card-shadow"
        >
          {image && (
            <div className="block relative w-full p-x z-base">
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
                'w-[200px] px-x pb-x text-lg md:text-xl font-bold leading-tight text-left uppercase'
              )}
            >
              <span
                className={classNames(
                  'leading-none inline-block underline decoration-[0.1rem]'
                )}
              >
                {longTitle}
              </span>
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
        <div className="grid md:grid-cols-2 gap-14 md:px-fullmenu">
          {properties &&
            (properties as KeyedProperty[])?.map(
              ({ image, longTitle, slug }, index) => (
                <PropertySummary
                  key={slug.current}
                  image={image}
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
