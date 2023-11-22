import type { FC } from 'react'
import classNames from 'classnames'
import type { CarouselBlock as CarouselBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement } from '@components/sanity'
import { Block } from '@components/sanity'
import { ImageCarousel } from '@components/carousel'

type CarouselBlockProps = Omit<SanityBlockElement, keyof CarouselBlockType> &
  CarouselBlockType

export const CarouselBlock: FC<CarouselBlockProps> = ({
  images,
  grid,
  className,
}) => {
  return (
    <Block
      className={classNames(
        className,
        grid ? 'md:grid md:grid-cols-3 pr-menu' : ''
      )}
    >
      {images && images.length > 0 && (
        <ImageCarousel
          index="0"
          slides={images}
          carousel={true}
          arrows={false}
          className="w-full md:max-w-[346px]"
        />
      )}
    </Block>
  )
}

export default CarouselBlock
