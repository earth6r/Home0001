import { useRef, type FC } from 'react'
import classNames from 'classnames'
import { KeyedUnitProps, UnitListProps } from './types'
import UnitSummary from './UnitSummary'

import { Swiper, SwiperSlide } from 'swiper/react'
import { type SwiperOptions } from 'swiper'
import { SCREENS } from '@/globals'

export const UnitsList: FC<UnitListProps> = ({ unitList, className }) => {
  const slidesRef = useRef(null)
  const breakpoints: SwiperOptions['breakpoints'] = {
    0: {
      slidesPerView: 1.185,
    },
    [SCREENS.md]: {
      slidesPerView: 'auto',
    },
  }

  return (
    <ul className={classNames(className, 'relative')}>
      <Swiper
        ref={slidesRef}
        loop={false}
        spaceBetween={16}
        breakpoints={breakpoints}
        speed={600}
        centerInsufficientSlides={true}
        className={classNames(
          'relative w-full max-w-full overflow-visible cursor-grab'
        )}
      >
        {unitList &&
          unitList.map((unit: KeyedUnitProps) => {
            return (
              <SwiperSlide key={unit._id} className="w-full md:max-w-[500px]">
                <UnitSummary unit={unit} className="w-full" />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </ul>
  )
}

export default UnitsList
