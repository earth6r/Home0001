import { type FC, HTMLAttributes, useRef } from 'react'
import { SanityMedia, SanityMediaProps } from '@components/sanity'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { IconLeftArrow, IconRightArrow } from '@components/icons'
import classNames from 'classnames'
import { SanityKeyed } from 'sanity-codegen'
import { Media } from '@studio/gen/sanity-schema'

export interface ImageSlideProps extends SanityMediaProps {
  _key?: string
  alt: string
}

export interface ImageCarouselProps extends HTMLAttributes<HTMLElement> {
  slides?: SanityKeyed<Media>[]
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
  return (
    <div className={classNames(className, 'relative')}>
      {slides && slides.length > 1 ? (
        <Swiper
          loop={true}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          mousewheel={{ forceToAxis: true }}
          modules={[Navigation]}
          className="max-w-[560px] md:max-w-[unset] w-full"
        >
          <div className="swiper-prev hidden md:block cursor-pointer w-1/2 h-full absolute top-0 left-0 z-10" />
          <div className="swiper-next hidden md:block cursor-pointer w-1/2 h-full absolute top-0 right-0 z-10" />
          {slides.map(({ _key, image, alt }) => (
            <SwiperSlide key={_key}>
              {image && alt && (
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
          {slides && slides[0].alt && (
            <ImageSlide image={slides[0].image} alt={slides[0].alt} />
          )}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
