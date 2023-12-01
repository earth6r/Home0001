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
import { Waitlist } from '@components/waitlist'
import { motion } from 'framer-motion'

const PropertySummary: FC<CityBlockPropertyType> = ({
  image,
  longTitle,
  slug,
  index,
}) => (
  <div className="flex w-full">
    <Link href={`/property/${slug.current}`} className="w-full">
      {image && (
        <div className="block relative w-full mb-yhalf z-base">
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
            index === 0 ? 'lg:max-w-[330px]' : '',
            'flex gap-1 items-start px-x md:px-0 text-xl font-bold leading-tight text-left uppercase'
          )}
        >
          <IconRightArrowBold fill="black" className="mt-3 lg:mt-2 w-[41px]" />
          <span
            className={classNames(
              'leading-none inline-block w-[calc(100%-49px)] underline underline-offset-[0.1em]'
            )}
          >
            {longTitle}
          </span>
        </div>
      )}
    </Link>
  </div>
)

export const PropertiesBlock: FC<CitiesBlockProps> = ({
  properties,
  className,
}) => {
  return (
    <Block className={classNames(className, 'md:mb-page', '-ml-[2px]')}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ amount: 'some' }}
        className="opacity-0"
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 md:px-fullmenu">
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

        <div className="md:grid md:grid-cols-3 mt-16">
          <Waitlist className="md:col-span-2 md:col-start-2" />
        </div>
      </motion.div>
    </Block>
  )
}

export default PropertiesBlock
