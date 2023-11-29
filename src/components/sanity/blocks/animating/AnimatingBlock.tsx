import { useRef, type FC, type HTMLAttributes } from 'react'
import classNames from 'classnames'
import type {
  AnimatingBlock as AnimatingBlockType,
  Media,
} from '@gen/sanity-schema'
import type { SanityBlockElement, SanityMediaProps } from '@components/sanity'
import { Block, RichText, SanityLink, SanityMedia } from '@components/sanity'
import { sendGoogleEvent } from '@lib/util'
import { CitiesListProps } from '../cities/types'
import { SanityLinkType } from '@studio/lib'
import { motion, useScroll, useTransform } from 'framer-motion'

type AnimatingBlockProps = Omit<SanityBlockElement, keyof AnimatingBlockType> &
  AnimatingBlockType

interface AnimatingImageProps extends HTMLAttributes<HTMLDivElement> {
  media: Media
}

const CitiesList: FC<CitiesListProps> = ({ citiesList }) => (
  <ul>
    {citiesList &&
      citiesList.map(({ _id, title, active, propertyLink }) => {
        return (
          <li key={_id} className="text-left">
            {propertyLink ? (
              <SanityLink
                {...(propertyLink as SanityLinkType)}
                className={classNames('text-lg font-bold uppercase')}
              >
                <div
                  onClick={() =>
                    sendGoogleEvent(`clicked city button`, { city: title })
                  }
                >
                  <span
                    className={classNames(
                      active && propertyLink ? 'leading-none' : ''
                    )}
                  >
                    {title}
                  </span>
                </div>
              </SanityLink>
            ) : (
              <div
                className={classNames(
                  'text-lg font-bold uppercase bg-transparent opacity-30 shadow-none'
                )}
              >
                <span
                  className={classNames(
                    active && propertyLink ? 'leading-none' : ''
                  )}
                >
                  {title}
                </span>
              </div>
            )}
          </li>
        )
      })}
  </ul>
)

const AnimatingImage: FC<AnimatingImageProps> = ({ media }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const transform = useTransform(
    scrollYProgress,
    [1, 0],
    ['scale(0)', 'scale(1)']
  )

  return (
    <div ref={ref} className="relative aspect-[1.3] overflow-hidden z-above">
      <div className="aspect-[1.3] relative w-full h-[284px]">
        <motion.div
          style={{ transform, transformOrigin: 'center bottom' }}
          className="absolute w-full h-full will-change-transform"
        >
          <SanityMedia
            imageProps={{
              alt: media.alt || 'Building image',
              quality: 8,
              priority: true,
              sizes: '(max-width: 768px) 100vw, 33vw',
              lqip: (media?.image as any)?.asset?.metadata?.lqip,
            }}
            className="relative w-full h-auto object-contain mt-3"
            {...(media as any)}
          />
        </motion.div>
      </div>
    </div>
  )
}

export const AnimatingBlock: FC<AnimatingBlockProps> = ({
  textAndImages,
  citiesPosition,
  citiesList,
  className,
}) => (
  <Block className={classNames(className, 'px-x m-0')}>
    <div className="md:col-start-2 md:col-span-1">
      {textAndImages &&
        textAndImages.map(({ _key, media, text }, index) => (
          <div key={_key}>
            {media && <AnimatingImage media={media} />}

            {text && <RichText blocks={text} className="relative mt-3" />}

            {index === citiesPosition && (
              <div className="mt-3">
                <CitiesList citiesList={citiesList} />
              </div>
            )}
          </div>
        ))}
    </div>
  </Block>
)

export default AnimatingBlock
