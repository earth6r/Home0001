import { useRef, type FC, type HTMLAttributes, useEffect } from 'react'
import classNames from 'classnames'
import type {
  AnimatingBlock as AnimatingBlockType,
  Media,
} from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block, RichText, SanityLink, SanityMedia } from '@components/sanity'
import { sendGoogleEvent } from '@lib/util'
import { CitiesListProps } from '../properties/types'
import { SanityLinkType } from '@studio/lib'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useHeaderLinks } from '@contexts/header'

type AnimatingBlockProps = Omit<SanityBlockElement, keyof AnimatingBlockType> &
  AnimatingBlockType

interface AnimatingImageProps extends HTMLAttributes<HTMLDivElement> {
  media: Media
  aspect?: 'square' | 'tall' | 'short'
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
                className={classNames('text-lg font-bold uppercase underline')}
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
                    {`${title},`}
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

const AnimatingImage: FC<AnimatingImageProps> = ({ media, aspect }) => {
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
    <div
      ref={ref}
      className={classNames(
        aspect === 'short'
          ? 'aspect-[1.4]'
          : aspect === 'tall'
          ? 'aspect-[0.8]'
          : 'aspect-square',
        'relative overflow-hidden mt-3 md:mt-5 z-above'
      )}
    >
      <div
        className={classNames(
          aspect === 'short'
            ? 'aspect-[1.4] h-auto'
            : aspect === 'tall'
            ? 'aspect-[0.8] h-auto'
            : 'aspect-square',
          'relative w-full'
        )}
      >
        <motion.div
          style={{ transform, transformOrigin: 'center bottom' }}
          className="absolute w-full h-full will-change-transform"
        >
          <SanityMedia
            imageProps={{
              alt: media?.alt || 'Building image',
              quality: 8,
              priority: true,
              sizes: '(max-width: 768px) 100vw, 33vw',
              lqip: (media?.image as any)?.asset?.metadata?.lqip,
            }}
            className="relative w-full h-auto object-contain mt-0"
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
}) => {
  const scrollRef = useRef(null)
  const isInView = useInView(scrollRef)

  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()

  useEffect(() => {
    if (isInView) {
      setHeaderLinksShown(false)
    } else {
      setHeaderLinksShown(true)
    }
  }, [isInView, setHeaderLinksShown])

  return (
    <Block
      className={classNames(className, 'px-x md:px-fullmenu mt-0 mb-[50vh]')}
    >
      <div ref={scrollRef} className="md:col-start-2 md:col-span-1">
        {textAndImages &&
          textAndImages.map(({ _key, aspect, media, text }, index) => (
            <div key={_key}>
              {media && <AnimatingImage media={media} aspect={aspect} />}

              {text && (
                <RichText
                  blocks={text}
                  className={classNames(
                    index !== 0 ? 'mt-3 md:mt-5' : '',
                    'relative'
                  )}
                />
              )}

              {index === citiesPosition && (
                <div className="mt-3 md:mt-5">
                  <CitiesList citiesList={citiesList} />
                </div>
              )}
            </div>
          ))}
      </div>
    </Block>
  )
}

export default AnimatingBlock
