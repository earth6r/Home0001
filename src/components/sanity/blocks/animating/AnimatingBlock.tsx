import {
  useRef,
  type FC,
  type HTMLAttributes,
  useEffect,
  useState,
} from 'react'
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
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useHeaderLinks } from '@contexts/header'

type AnimatingBlockProps = Omit<SanityBlockElement, keyof AnimatingBlockType> &
  AnimatingBlockType

interface AnimatingImageProps extends HTMLAttributes<HTMLDivElement> {
  media: Media
  aspect?: 'square' | 'tall' | 'short'
}

const CitiesList: FC<CitiesListProps> = ({ citiesList }) => {
  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()

  return (
    <ul>
      {citiesList &&
        citiesList.map(({ _id, title, active, propertyLink }) => {
          return (
            <li key={_id} className="text-left">
              {propertyLink ? (
                <SanityLink
                  {...(propertyLink as SanityLinkType)}
                  className={classNames(
                    'text-lg font-bold uppercase underline'
                  )}
                >
                  <div
                    onClick={() => {
                      sendGoogleEvent(`clicked city button`, { city: title })
                      setHeaderLinksShown(true)
                    }}
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
}

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
        'relative overflow-hidden mt-3 mb-3 md:mt-5 z-above'
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
              sizes: '(max-width: 768px) 100vw, 90vw',
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
  header,
  textAndImages,
  citiesPosition,
  citiesList,
  className,
}) => {
  const scrollRef = useRef(null)
  const isInView = useInView(scrollRef)
  const [animateActive, setAnimateActive] = useState(
    (typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('firstTime')
      : false) || true
  )

  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()

  // account for header ~ JLM
  const citiesPos = header && citiesPosition && citiesPosition - 1

  const headerVariants = {
    initial: {
      height: '70vh',
    },
    active: {
      height: 'auto',
      transition: {
        delay: 2,
        duration: 1.2,
      },
    },
  }

  const spanVariants = {
    initial: {
      opacity: 0,
    },
    active: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.25,
        duration: 0,
      },
    }),
  }

  const blockVariants = {
    initial: {
      scale: 0.85,
      opacity: 0,
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 2.2,
        duration: 1.4,
      },
    },
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !isInView && window.scrollY > 200) {
      setHeaderLinksShown(true)
    }
  }, [isInView])

  useEffect(() => {
    if (!sessionStorage.getItem('firstTime')) {
      sessionStorage.setItem('firstTime', 'false')
    }
  }, [])

  return (
    <Block
      className={classNames(className, 'px-x md:px-fullmenu mt-0 mb-[50vh]')}
    >
      <AnimatePresence>
        {header && (
          <motion.h1
            key="animate-1"
            initial={animateActive ? 'initial' : 'active'}
            animate="active"
            variants={headerVariants}
            className="flex flex-wrap items-center relative text-lg font-bold tracking-header uppercase"
          >
            <div>
              {header.map((item, index) => (
                <motion.span
                  key={`${item}-${index}`}
                  custom={index}
                  initial={animateActive ? 'initial' : 'active'}
                  animate="active"
                  variants={spanVariants}
                  className="opacity-0"
                >
                  {`${item} `}
                </motion.span>
              ))}
            </div>
          </motion.h1>
        )}

        <motion.div
          key="animate-2"
          ref={scrollRef}
          initial={animateActive ? 'initial' : 'active'}
          animate="active"
          variants={blockVariants}
          className="relative opacity-0"
        >
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

                {index === citiesPos && (
                  <div className="mt-3 md:mt-5">
                    <CitiesList citiesList={citiesList} />
                  </div>
                )}
              </div>
            ))}
        </motion.div>
      </AnimatePresence>
    </Block>
  )
}

export default AnimatingBlock
