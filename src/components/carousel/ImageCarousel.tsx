import { type FC, HTMLAttributes } from 'react'
import { SanityMedia, SanityMediaProps } from '@components/sanity'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { IconLeftArrow, IconRightArrow } from '@components/icons'
import classNames from 'classnames'
import { Media } from '@studio/gen/sanity-schema'

export interface ImageSlideProps extends SanityMediaProps {
  _key?: string
  alt: string
  index?: number
}

export interface ImageCarouselProps extends HTMLAttributes<HTMLElement> {
  index?: string
  slides?: (Media & { _key: string })[]
}

const ImageSlide: FC<ImageSlideProps> = ({ image, alt, index }) => {
  return (
    <div className="block relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <SanityMedia
        image={image}
        imageProps={{
          alt,
          quality: 1,
          priority: index && index <= 2 ? true : false,
          style: { width: '100%', height: 'auto' },
          lqip: image?.asset?.metadata?.lqip,
        }}
      />
    </div>
  )
}

export const ImageCarousel: FC<ImageCarouselProps> = ({
  index = '0',
  slides,
  className,
}) => {
  return (
    <div className={classNames(className, 'relative')}>
      {slides && slides.length > 1 ? (
        <Swiper
          loop={false}
          slidesPerView={1}
          spaceBetween={16}
          navigation={{
            nextEl: `.swiper-next-${index}`,
            prevEl: `.swiper-prev-${index}`,
          }}
          // mousewheel={{ forceToAxis: true }}
          modules={[Navigation]}
          speed={600}
          className="max-w-[560px] md:max-w-[unset] w-full overflow-visible"
        >
          {slides.map(({ _key, image, alt }, index) => (
            <SwiperSlide key={`${_key}-${alt}`}>
              {image && alt && (
                <ImageSlide
                  className="max-w-[560px] md:max-w-[unset] px-4 h-full w-full object-cover"
                  image={image as any}
                  index={index}
                  alt={alt}
                />
              )}
            </SwiperSlide>
          ))}

          <div className="mt-4">
            <div className="flex justify-start items-center max-w-[560px] md:max-w-[unset]">
              <button
                className={classNames(
                  `swiper-prev-${index} review-swiper-button-prev disabled:shadow-none disabled:bg-transparent disabled:opacity-40 mr-2`
                )}
              >
                <IconLeftArrow width="22" height="10" />
              </button>
              <button
                className={classNames(
                  `swiper-next-${index} disabled:shadow-none disabled:bg-transparent disabled:opacity-40`
                )}
              >
                <IconRightArrow width="22" height="10" />
              </button>
            </div>
          </div>
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
