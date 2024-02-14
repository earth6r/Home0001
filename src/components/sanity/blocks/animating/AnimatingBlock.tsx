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
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useCryptoMode, useHeaderLinks } from '@contexts/header'
import _ from 'lodash'
import { useLenis } from '@studio-freight/react-lenis'

type AnimatingBlockProps = Omit<SanityBlockElement, keyof AnimatingBlockType> &
  AnimatingBlockType

interface AnimatingImageProps extends HTMLAttributes<HTMLDivElement> {
  media: Media
  aspect?: 'square' | 'tall' | 'short'
  firstIndex?: boolean
  lastIndex?: boolean
}

const CitiesList: FC<CitiesListProps> = ({ citiesList }) => {
  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()

  return (
    <ul>
      {citiesList &&
        citiesList.map(({ _id, title, active, propertyLink }, index) => {
          return (
            <li key={_id} className="text-left">
              {propertyLink ? (
                <SanityLink
                  {...(propertyLink as SanityLinkType)}
                  className={classNames('text-2xl font-bold uppercase')}
                >
                  <div
                    onClick={() => {
                      sendGoogleEvent(`clicked city button`, { city: title })
                      setHeaderLinksShown(true)
                    }}
                  >
                    <span>{`${title},`}</span>
                  </div>
                </SanityLink>
              ) : (
                <div
                  className={classNames(
                    'text-2xl font-bold uppercase bg-transparent text-lightgray shadow-none'
                  )}
                >
                  <span
                    className={classNames(
                      active && propertyLink ? 'leading-none' : ''
                    )}
                  >
                    {index + 1 === citiesList.length
                      ? `${title}.`
                      : `${title},`}
                  </span>
                </div>
              )}
            </li>
          )
        })}
    </ul>
  )
}

const AnimatingImage: FC<AnimatingImageProps> = ({
  media,
  aspect,
  firstIndex,
  lastIndex,
}) => {
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
  const lenis = useLenis()

  return (
    <div
      ref={ref}
      className={classNames(
        aspect === 'short'
          ? 'aspect-[1.4]'
          : aspect === 'tall'
          ? 'aspect-[0.835]'
          : 'aspect-square',
        'relative overflow-hidden my-3 md:my-5 z-above'
      )}
    >
      <div
        className={classNames(
          aspect === 'short'
            ? 'aspect-[1.4] h-auto'
            : aspect === 'tall'
            ? 'aspect-[0.835] h-auto'
            : 'aspect-square',
          'relative w-full'
        )}
      >
        <motion.div
          style={{ transform, transformOrigin: 'center bottom' }}
          className="flex items-end absolute w-full h-full will-change-transform transition-transform ease-linear"
        >
          <SanityMedia
            imageProps={{
              alt: media?.alt || 'Building image',
              quality: 6,
              priority: firstIndex ? true : false,
              sizes: '(max-width: 768px) 150vw, 1200px',
              lqip: (media?.image as any)?.asset?.metadata?.lqip,
            }}
            onLoadingComplete={() => lastIndex && lenis.resize()}
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
  const [animateActive, setAnimateActive] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const [headerLinksShown, setHeaderLinksShown] = useHeaderLinks()
  const [cryptoMode, setCryptoMode] = useCryptoMode()

  const lenis = useLenis()

  // account for header ~ JLM
  const citiesPos = header && citiesPosition && citiesPosition - 1

  const headerVariants = {
    initial: {
      marginTop: '30vh',
    },
    active: {
      marginTop: 0,
      transition: {
        delay: 2.2,
        duration: 0.6,
        ease: 'easeInOut',
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
        delay: i * 0.2,
        duration: 0,
      },
    }),
  }

  const blockVariants = {
    initial: {
      scale: 0.79,
      opacity: 0.4,
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.8,
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  }

  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem('firstTime')
    if (isFirstVisit) {
      setAnimateActive(true)
      setShowContent(true)
      sessionStorage.setItem('firstTime', 'false')
    } else {
      setShowContent(true)
    }
  }, [])

  return (
    <Block
      className={classNames(
        className,
        'md:max-w-[768px] lg:max-w-[1000px] min-h-[100vh] md:mx-auto px-x md:px-fullmenu mt-0 mb-[32px] md:mb-[56px]'
      )}
    >
      {showContent && (
        <AnimatePresence>
          {header && (
            <motion.h1
              key={`${animateActive}-1`}
              initial={animateActive ? 'initial' : 'active'}
              animate="active"
              onAnimationStart={() => {
                if (animateActive) {
                  lenis.stop()
                } else {
                  setHeaderLinksShown(true)
                }
              }}
              onAnimationComplete={() => {
                lenis.start()
                setTimeout(() => setHeaderLinksShown(true), 500)
              }}
              variants={headerVariants}
              className="flex flex-wrap items-center relative text-2xl font-bold tracking-header uppercase"
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
                    {`${item}`}
                  </motion.span>
                ))}
              </div>
            </motion.h1>
          )}

          <motion.div
            key={`${animateActive}-2`}
            ref={scrollRef}
            initial={animateActive ? 'initial' : 'active'}
            animate="active"
            variants={blockVariants}
            className="relative opacity-0"
          >
            {textAndImages &&
              textAndImages.map(
                ({ _key, aspect, media, text, altCryptoText }, index) => (
                  <div key={_key}>
                    {media && (
                      <AnimatingImage
                        media={media}
                        aspect={aspect}
                        firstIndex={index === 0}
                        lastIndex={index === textAndImages.length - 1}
                      />
                    )}

                    {text && (
                      <RichText
                        blocks={
                          cryptoMode && altCryptoText ? altCryptoText : text
                        }
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
                )
              )}
          </motion.div>
        </AnimatePresence>
      )}
    </Block>
  )
}

export default AnimatingBlock
