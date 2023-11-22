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
  className,
}) => {
  return (
    <Block className={classNames(className)}>
      {images && images.length > 0 && (
        <ImageCarousel
          index="0"
          slides={images}
          carousel={true}
          arrows={false}
          className="w-full"
        />
      )}
    </Block>
  )
}

export default CarouselBlock
