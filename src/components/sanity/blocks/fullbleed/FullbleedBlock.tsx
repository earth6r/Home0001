import { type FC } from 'react'
import classNames from 'classnames'
import type { FullbleedBlock as FullbleedBlockType } from '@gen/sanity-schema'
import type { SanityBlockElement, SanityMediaProps } from '@components/sanity'
import { Block, SanityMedia } from '@components/sanity'
import { motion, useScroll, useTransform } from 'framer-motion'

type FullbleedBlockProps = Omit<SanityBlockElement, keyof FullbleedBlockType> &
  FullbleedBlockType

export const FullbleedBlock: FC<FullbleedBlockProps> = ({
  image,
  minWidth,
  animate,
  columns = 1,
  className,
}) => {
  const { scrollYProgress } = useScroll()

  // Transform scrollYProgress (0 to 1) to rotation (0 to 360 degrees)
  const rotate = useTransform(
    scrollYProgress,
    animate ? [0, 0.2] : [0, 0],
    animate ? [0, 360] : [0, 0]
  )

  return image ? (
    <Block
      className={classNames(
        className,
        columns === 1 ? '' : 'grid md:grid-cols-2',
        'overflow-scroll'
      )}
    >
      <motion.div
        style={{ rotate }}
        transition={{ type: 'spring' }}
        className={classNames(
          animate ? 'max-w-[304px] mx-auto' : '',
          'flex-inline w-auto origin-center'
        )}
      >
        <SanityMedia
          imageProps={{
            alt: image?.alt || 'Full bleed image',
            quality: 80,
            sizes: '99vw',
            style: { minWidth: minWidth ? `${minWidth}px` : '' },
            lqip: (image?.image as any)?.asset?.metadata?.lqip,
          }}
          className="relative w-full h-auto object-contain"
          {...(image as SanityMediaProps)}
        />
      </motion.div>
    </Block>
  ) : null
}

export default FullbleedBlock
