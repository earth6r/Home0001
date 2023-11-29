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

const PropertySummary: FC<CityBlockPropertyType> = ({
  image,
  longTitle,
  slug,
}) => (
  <div className="hidden md:flex md:sticky md:top-[126px] md:left-0 md:self-start">
    <Link href={`/property/${slug.current}`}>
      {image && (
        <div className="block relative w-full mb-yhalf z-base">
          <SanityMedia
            imageProps={{
              alt: image.alt || 'Building image',
              quality: 8,
              priority: true,
              sizes: '(max-width: 768px) 0, 33vw',
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
            'flex gap-1 items-start mobile-landing text-left uppercase'
          )}
        >
          <IconRightArrowBold className="mt-1 home-svg" />
          <span
            className={classNames(
              'inline-block w-[calc(100%-49px)] underline underline-offset-[0.2em]'
            )}
          >
            {longTitle}
          </span>
        </div>
      )}
    </Link>
  </div>
)

export const CitiesBlock: FC<CitiesBlockProps> = ({
  properties,
  className,
}) => {
  return (
    <Block className={classNames(className, 'md:mb-page', '-ml-[2px]')}>
      <div className="grid md:grid-cols-3 gap-12 md:gap-16">
        <div className="flex flex-col gap-12 md:gap-16">
          {properties &&
            (properties as KeyedProperty[])?.map(
              ({ image, longTitle, slug }) => (
                <div key={slug.current} className="md:hidden mt-12">
                  <Link href={`/property/${slug.current}`}>
                    {image && (
                      <div className="block relative w-full mb-yhalf z-base">
                        <SanityMedia
                          imageProps={{
                            alt: image.alt || 'Building image',
                            quality: 8,
                            priority: true,
                            sizes: '(max-width: 768px) 100vw, 0px',
                            lqip: (image?.image as any)?.asset?.metadata?.lqip,
                          }}
                          {...(image as any)}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    )}
                    {longTitle && (
                      <div
                        className={classNames(
                          'flex gap-1 items-start mobile-landing font-bold text-left uppercase px-x'
                        )}
                      >
                        <IconRightArrowBold
                          fill="black"
                          className="mt-[4px] home-svg"
                        />
                        <span
                          className={classNames(
                            'pr-menu inline-block w-[calc(100%-49px)] text-under underline underline-offset-[0.2em]'
                          )}
                        >
                          {longTitle}
                        </span>
                      </div>
                    )}
                  </Link>
                </div>
              )
            )}

          <Waitlist />
        </div>

        {properties &&
          (properties as KeyedProperty[])?.map(({ image, longTitle, slug }) => (
            <PropertySummary
              key={slug.current}
              image={image}
              longTitle={longTitle}
              slug={slug}
            />
          ))}
      </div>
    </Block>
  )
}

export default CitiesBlock
