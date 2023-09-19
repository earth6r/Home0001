import type { FC } from 'react'
import type { SanityFigureProps } from './types'
import { RichText } from '@components/sanity'

export const SanityFigureCaption: FC<SanityFigureProps> = ({
  caption,
  captionClass,
}) => (caption ? <RichText blocks={caption} className={captionClass} /> : null)

export default SanityFigureCaption
