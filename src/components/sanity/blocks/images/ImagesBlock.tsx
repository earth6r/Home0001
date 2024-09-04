import { type FC } from 'react'
import classNames from 'classnames'
import type { ImagesBlock as ImagesBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement, SanityMediaProps } from '@components/sanity'
import { Block, SanityMedia } from '@components/sanity'

type ImagesBlockProps = Omit<SanityBlockElement, keyof ImagesBlockType> &
  ImagesBlockType

export const ImagesBlock: FC<ImagesBlockProps> = ({ images, className }) => {
  return (
    <Block className={classNames(className, 'relative w-full')}>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        {images &&
          images.length > 1 &&
          images.map(image => (
            <SanityMedia
              key={image._key}
              imageProps={{
                alt: image?.alt || 'Image row image',
                quality: 80,
                sizes: '(max-width: 768px) 100vw, 800px',
                lqip: (image?.image as any)?.asset?.metadata?.lqip,
              }}
              className="relative flex-shrink-1 w-full h-auto object-contain p-[64px]"
              {...(image as SanityMediaProps)}
            />
          ))}
      </div>
    </Block>
  )
}

export default ImagesBlock
