import type { ReactNode, HTMLAttributes } from 'react'

export interface FigureProps extends HTMLAttributes<HTMLElement> {
  media?: ReactNode
  contentClass?: string
  caption?: ReactNode
  captionClass?: string
  mediaClass?: string
}
