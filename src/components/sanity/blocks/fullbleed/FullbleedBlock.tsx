import { type FC } from 'react'
import classNames from 'classnames'
import type { FullbleedBlock as FullbleedBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement, SanityMediaProps } from '@components/sanity'
import { Block, SanityMedia } from '@components/sanity'

type FullbleedBlockProps = Omit<SanityBlockElement, keyof FullbleedBlockType> &
  FullbleedBlockType

export const FullbleedBlock: FC<FullbleedBlockProps> = ({
  image,
  minWidth,
  className,
}) => {
  return (
    <Block className={classNames(className, 'overflow-scroll')}>
      {image && (
        <SanityMedia
          imageProps={{
            alt: image?.alt || 'Full bleed image',
            quality: 80,
            sizes: '99vw',
            style: { minWidth: minWidth ? `${minWidth}px` : '' },
            lqip: (image?.image as any)?.asset?.metadata?.lqip,
          }}
          className="relative w-full h-auto object-contain mt-0 p-40 md:py-0 md:px-80"
          {...(image as SanityMediaProps)}
        />
      )}
    </Block>
  )
}

export default FullbleedBlock
