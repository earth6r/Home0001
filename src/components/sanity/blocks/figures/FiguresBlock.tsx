import type * as CSS from 'csstype'
import React from 'react'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import type { Swiper as SwiperType, SwiperOptions } from 'swiper'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import classNames from 'classnames'
import type { SanityMediaProps } from '@components/sanity'
import { SanityFigure } from '@components/sanity'
import { Block } from '@components/sanity'
import styles from './figures.module.css'
import { SwiperNavigation } from '@components/swiper'
import type {
  BlockFigureProps,
  FiguresBlockProps,
  FiguresBlockCSSProps,
} from './types'
import { SCREENS } from '@globals/screens'

const BlockFigure: FC<BlockFigureProps> = ({ media, className }) => (
  <SanityFigure
    {...media}
    captionClass="mx-auto"
    className={classNames(styles.figure, className, 'w-full text-left')}
  />
)

export const FiguresBlock: FC<FiguresBlockProps> = ({
  figures,
  columns,
  carousel,
  slug,
}) => {
  const [mediaHeight, setMediaHeight] = useState(0)
  const [arrowStyle, setArrowStyle] = useState<CSS.Properties>({})
  const breakpoints: SwiperOptions['breakpoints'] = {
    0: {
      slidesPerView: 'auto',
      centeredSlides: true,
      centerInsufficientSlides: true,
    },
    [SCREENS.sm]: {
      slidesPerView: columns && columns > 1 ? 2 : 1,
    },
    [SCREENS.lg]: {
      slidesPerView: columns || 1,
      centeredSlides: false,
      centerInsufficientSlides: false,
    },
  }
  const swiperUpdate = (swiper: SwiperType) => {
    if (mediaHeight !== 0) setMediaHeight(0)
    const media = swiper.el.querySelector('img')
    if (media) setMediaHeight(media.clientHeight)
  }
  useEffect(() => {
    if (mediaHeight) {
      setArrowStyle({ top: `${mediaHeight / 2}px` })
    } else {
      setArrowStyle({})
    }
  }, [mediaHeight])
  return (
    <Block
      slug={slug}
      className={classNames(
        styles.figures,
        styles[`col-${columns || 1}`],
        'figures'
      )}
      style={{ ['--figure-columns']: columns || 1 } as FiguresBlockCSSProps}
    >
      {carousel ? (
        <div className={classNames(styles.wrap, 'w-full overflow-hidden')}>
          <div className={classNames('container relative')}>
            <Swiper
              modules={[Navigation]}
              breakpoints={breakpoints}
              spaceBetween={0}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              autoHeight
              observer
              observeParents
              onSwiper={swpr => swiperUpdate(swpr)}
              onResize={swpr => swiperUpdate(swpr)}
              className={styles.swiper}
            >
              <SwiperNavigation arrowStyle={arrowStyle} />
              {figures && figures.length > 0
                ? figures.map(({ _key, media }) => (
                    <SwiperSlide
                      key={_key}
                      className={classNames(styles.slide)}
                    >
                      <div className="flex flex-col items-center justify-start">
                        <BlockFigure media={media as SanityMediaProps} />
                      </div>
                    </SwiperSlide>
                  ))
                : null}
            </Swiper>
          </div>
        </div>
      ) : (
        <div
          className={classNames(
            styles.grid,
            'container flex flex-wrap justify-center'
          )}
        >
          {figures && figures.length > 0
            ? figures.map(({ _key, media }) => (
                <div
                  key={_key}
                  className={classNames(
                    styles.column,
                    'flex flex-col items-center justify-start flex-auto'
                  )}
                >
                  <BlockFigure media={media as SanityMediaProps} />
                </div>
              ))
            : null}
        </div>
      )}
    </Block>
  )
}

export default FiguresBlock
