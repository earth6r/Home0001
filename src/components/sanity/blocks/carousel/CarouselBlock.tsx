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
        grid
          ? 'md:grid md:grid-cols-3 pr-menu'
          : 'w-[calc(100%+var(--space-menu)-var(--space-x))] md:w-full'
      )}
    >
      {images && images.length > 0 && (
        <ImageCarousel
          slides={images}
          carousel={false}
          perView={2}
          className="w-full"
          placement="property details"
        />
      )}
    </Block>
  )
}

export default CarouselBlock
