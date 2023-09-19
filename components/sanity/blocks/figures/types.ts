import type * as CSS from 'csstype'
import type { FiguresBlock as FiguresBlockType, Cta } from '@gen/sanity-schema'
import type { SanityBlockElement, SanityMediaProps } from '@components/sanity'

export interface BlockFigureProps extends Partial<FiguresBlockProps> {
  media?: SanityMediaProps
  cta?: Cta
}

export interface FiguresBlockProps
  extends Omit<SanityBlockElement, keyof FiguresBlockType>,
    FiguresBlockType {}

export interface FiguresBlockCSSProps extends CSS.Properties {
  '--figure-columns'?: number
}
