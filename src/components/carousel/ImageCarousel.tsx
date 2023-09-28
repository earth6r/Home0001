import { type FC, HTMLAttributes, useRef } from 'react'
import { SanityMedia, SanityMediaProps } from '@components/sanity'
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react'
import type { SwiperOptions } from 'swiper'
import { Navigation, Zoom } from 'swiper'
import { IconLeftArrow, IconRightArrow } from '@components/icons'
import classNames from 'classnames'

export interface ImageSlideProps extends SanityMediaProps {
  alt: string
}

export interface ImageCarouselProps extends HTMLAttributes<HTMLElement> {
  slides?: any[]
}

const ImageSlide: FC<ImageSlideProps> = ({ image, alt }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <SanityMedia
        image={image}
        imageProps={{
          alt,
          style: { maxWidth: '100%', height: 'auto' },
        }}
      />
    </div>
  )
}

export const ImageCarousel: FC<ImageCarouselProps> = ({
  slides,
  className,
}) => {
  const swiperRef = useRef()

  return (
    slides && (
      <div className={classNames(className, 'relative')}>
        {slides.length > 1 ? (
          <Swiper
            zoom={true}
            loop={true}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            mousewheel={{ forceToAxis: true }}
            modules={[Zoom, Navigation]}
            className="max-w-[560px] md:max-w-[unset] w-full"
          >
            <div className="swiper-prev hidden md:block cursor-pointer w-1/2 h-full absolute top-0 left-0 z-10" />
            <div className="swiper-next hidden md:block cursor-pointer w-1/2 h-full absolute top-0 right-0 z-10" />
            {slides.map(({ _key, image, alt }) => (
              <SwiperSlide key={_key}>
                {image && (
                  <ImageSlide
                    className="max-w-[560px] md:max-w-[unset] px-4 h-full w-full object-cover"
                    image={image}
                    alt={alt}
                  />
                )}
              </SwiperSlide>
            ))}

            <div className="mt-4">
              <div className="flex justify-center items-center max-w-[560px] md:max-w-[unset]">
                <button className="swiper-prev review-swiper-button-prev disabled:shadow-none disabled:bg-transparent disabled:opacity-40 mr-2">
                  <IconLeftArrow width="22" height="10" />
                </button>
                <button className="swiper-next disabled:shadow-none disabled:bg-transparent disabled:opacity-40">
                  <IconRightArrow width="22" height="10" />
                </button>
              </div>
            </div>
          </Swiper>
        ) : (
          <div className="flex items-center overflow-hidden">
            {slides[0] && (
              <ImageSlide image={slides[0].image} alt={slides[0].alt} />
            )}
          </div>
        )}
      </div>
    )
  )
}

export default ImageCarousel
