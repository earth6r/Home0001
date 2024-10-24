import { useRef, useState, type FC } from 'react'
import classNames from 'classnames'
import { KeyedPropertyTypeProps, PropertyTypeListProps } from './types'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SCREENS } from '@/globals'
import IconRightArrowBold from '@components/icons/IconRightArrowBold'
import PropertyTypeSummary from './PropertyTypeSummary'
import { type SwiperOptions } from 'swiper/types'
import { Navigation } from 'swiper/modules'

export const PropertyTypesList: FC<PropertyTypeListProps> = ({
  propertyTypesList,
  showCity = false,
  className,
}) => {
  const slidesRef = useRef(null)
  const breakpoints: SwiperOptions['breakpoints'] = {
    0: {
      slidesPerView: 1.185,
      centerInsufficientSlides: false,
    },
    [SCREENS.md]: {
      slidesPerView: 'auto',
      centerInsufficientSlides: true,
    },
  }
  const [activeNav, setActiveNav] = useState(false)

  return (
    <ul
      className={classNames(className, 'relative')}
      onMouseOver={() => setActiveNav(true)}
      onMouseOut={() => setActiveNav(false)}
    >
      <Swiper
        ref={slidesRef}
        loop={false}
        spaceBetween={16}
        breakpoints={breakpoints}
        modules={[Navigation]}
        speed={600}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        className={classNames(
          'relative w-full max-w-full overflow-visible cursor-grab'
        )}
      >
        {propertyTypesList &&
          propertyTypesList.map((propertyType: KeyedPropertyTypeProps) => {
            return (
              <SwiperSlide
                key={propertyType._id}
                className="w-full md:max-w-[360px]"
              >
                <PropertyTypeSummary
                  propertyType={propertyType}
                  showCity={showCity}
                  className="w-full"
                />
              </SwiperSlide>
            )
          })}
        <div
          className={classNames(
            activeNav ? 'opacity-100' : 'opacity-0',
            'hidden md:flex md:justify-between absolute w-full top-1/2 transform -translate-y-1/2 transition-opacity duration-200 pointer-events-none z-above'
          )}
        >
          <IconRightArrowBold
            width="80"
            fill="black"
            className={classNames(
              'pr-xhalf rotate-180 swiper-prev pointer-events-auto cursor-pointer hover:scale-95'
            )}
          />
          <IconRightArrowBold
            width="80"
            fill="black"
            className={classNames(
              'pr-xhalf relative swiper-next pointer-events-auto cursor-pointer hover:scale-95'
            )}
          />
        </div>
      </Swiper>
    </ul>
  )
}

export default PropertyTypesList
