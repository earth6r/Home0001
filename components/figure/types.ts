import type { ReactNode, HTMLAttributes } from 'react'

export interface FigureProps extends HTMLAttributes<HTMLElement> {
  content?: ReactNode
  contentClass?: string
  caption?: ReactNode
  captionClass?: string
  mediaClass?: string
}
