import type { SanityMediaProps } from '../media'
import type { FigureProps } from '@components/figure'

export interface SanityFigureProps
  extends Omit<FigureProps, keyof SanityMediaProps>,
    SanityMediaProps {}
