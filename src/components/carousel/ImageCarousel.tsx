import { type FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { SanityMedia, SanityMediaProps } from '@components/sanity'
import { Media } from '@studio/gen/sanity-schema'
import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation } from 'swiper'
import { Navigation, type SwiperOptions } from 'swiper'
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
const ICON_CLOSE = `<svg width="34" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10"><path fill='white' fillRule="evenodd" d="M3.761 5 0 1.239 1.239 0 5 3.761 8.761 0 10 1.239 6.239 5 10 8.761 8.761 10 5 6.239 1.239 10 0 8.761 3.761 5Z" clipRule="evenodd" /></svg>`

const ImageSlide: FC<ImageSlideProps> = ({ image, alt, index }) => {
  return (
    <div className="block relative w-full md:max-w-[346px] h-full overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <SanityMedia
        image={image}
        imageProps={{
          alt,
          quality: 30,
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
      slidesPerView: 1,
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
          modules={[Navigation]}
          loop={false}
          spaceBetween={16}
          breakpoints={breakpoints}
          speed={600}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          className="w-[calc(100%-60px)] md:w-auto max-w-[620px] md:max-w-[unset] ml-0 md:mx-auto overflow-visible"
        >
          {slides.map(({ _key, image, alt }, index) => (
            <SwiperSlide key={`${_key}-${alt}`} className="w-auto">
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
                        className="max-w-[620px] md:max-w-[unset] px-4 h-full w-full object-cover"
                        image={image as any}
                        index={index}
                        alt={alt}
                      />
                    </a>
                  ) : (
                    <ImageSlide
                      className="max-w-[620px] md:max-w-[unset] px-4 h-full w-full object-cover"
                      image={image as any}
                      index={index}
                      alt={alt}
                    />
                  )}
                </>
              )}
            </SwiperSlide>
          ))}
          <nav className="hidden md:flex gap-[7px] my-yhalf">
            <IconLeftArrow
              width="24"
              className={classNames(
                'rotate-180 swiper-prev pointer-events-auto cursor-pointer'
              )}
            />
            <IconRightArrow
              width="24"
              className={classNames(
                'swiper-next pointer-events-auto cursor-pointer'
              )}
            />
          </nav>
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
