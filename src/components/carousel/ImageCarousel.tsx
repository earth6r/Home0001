import { type FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { SanityMedia, SanityMediaProps } from '@components/sanity'
import { Media } from '@studio/gen/sanity-schema'
import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation } from 'swiper'
import type { SwiperOptions } from 'swiper'
import { IconLeftArrow, IconRightArrow, IconX } from '@components/icons'
import classNames from 'classnames'
import { SCREENS } from '@/globals'

// eslint-disable-next-line import/no-unresolved
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export interface ImageSlideProps extends SanityMediaProps {
  _key?: string
  alt: string
  index?: number
}

export interface ImageCarouselProps extends HTMLAttributes<HTMLElement> {
  index?: string
  carousel?: boolean
  arrows?: boolean
  slides?: (Media & { _key: string })[]
}

const ICON_LEFT = `<svg width="30" style="transform: rotate(180deg); position: relative; left: -15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 10" > <path fill="#FFF" d="m15.52 0 5.98 5-5.98 5-1.029-.848 4.232-3.538H.5V4.386h18.223L14.491.86 15.52 0Z" /> </svg>`
const ICON_RIGHT = `<svg width="30" style="position: relative; right: -15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 10" > <path fill="#FFF" d="m15.52 0 5.98 5-5.98 5-1.029-.848 4.232-3.538H.5V4.386h18.223L14.491.86 15.52 0Z" /> </svg>`
const ICON_CLOSE = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40"> <path stroke="#FFF" d="m8 8 24 24m0-24L8 32" /> </svg>`

const ImageSlide: FC<ImageSlideProps> = ({ image, alt, index }) => {
  return (
    <div className="block relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <SanityMedia
        image={image}
        imageProps={{
          alt,
          quality: 1,
          priority: index && index <= 2 ? true : false,
          sizes: '(max-width: 768px) 100vw, 1038px',
          style: { width: '100%', height: 'auto' },
          lqip: image?.asset?.metadata?.lqip,
        }}
      />
    </div>
  )
}

export const ImageCarousel: FC<ImageCarouselProps> = ({
  carousel,
  slides,
  className,
}) => {
  const slidesRef = useRef(null)
  const breakpoints: SwiperOptions['breakpoints'] = {
    0: {
      slidesPerView: 1.18,
    },
    [SCREENS.md]: {
      slidesPerView: 'auto',
    },
  }

  useEffect(() => {
    if (!slidesRef?.current || typeof window === 'undefined' || !carousel)
      return
    const lightbox = new PhotoSwipeLightbox({
      gallery: slidesRef.current,
      children: '.swiper-slide',
      arrowPrevSVG: ICON_LEFT,
      arrowNextSVG: ICON_RIGHT,
      closeSVG: ICON_CLOSE,

      showHideAnimationType: 'none',
      zoomAnimationDuration: false,

      counter: false,

      initialZoomLevel: 'fit',
      secondaryZoomLevel: 2.0,
      maxZoomLevel: 2.0,

      pswpModule: () => import('photoswipe'),
    })
    lightbox.init()

    return () => {
      lightbox.destroy()
    }
  }, [])

  return (
    <div className={classNames(className, 'relative')}>
      {slides && slides.length > 1 ? (
        <Swiper
          ref={slidesRef}
          loop={false}
          spaceBetween={16}
          breakpoints={breakpoints}
          speed={600}
          className="max-w-[560px] md:max-w-[unset] w-full overflow-visible"
        >
          {slides.map(({ _key, image, alt }, index) => (
            <SwiperSlide key={`${_key}-${alt}`}>
              {image && alt && (
                <>
                  {carousel ? (
                    <a
                      href={`https://cdn.sanity.io/${
                        (image.asset as any).path
                      }`}
                      data-pswp-width={1000}
                      data-pswp-height={1100}
                    >
                      <ImageSlide
                        className="max-w-[560px] md:max-w-[unset] px-4 h-full w-full object-cover"
                        image={image as any}
                        index={index}
                        alt={alt}
                      />
                    </a>
                  ) : (
                    <ImageSlide
                      className="max-w-[560px] md:max-w-[unset] px-4 h-full w-full object-cover"
                      image={image as any}
                      index={index}
                      alt={alt}
                    />
                  )}
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex items-center overflow-hidden">
          {slides && slides[0].alt && (
            <ImageSlide image={slides[0].image as any} alt={slides[0].alt} />
          )}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
